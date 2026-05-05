#!/usr/bin/env node
/**
 * Post-build cache-busting for the deployed site.
 *
 * Walks every .html in the target directory and:
 *   1. Appends/replaces ?v=<SHA> on local <link href="*.css"> and <script src="*.js">
 *   2. Injects no-cache meta tags into <head> (so the HTML itself revalidates)
 *
 * Skips absolute URLs (http://, https://, //...) and existing ?v= params on remote assets.
 * Only touches local relative paths, so CDN-hosted resources stay untouched.
 *
 * Usage: node scripts/cache-bust.js <dir> [sha]
 *   dir: directory to walk (default: _site)
 *   sha: version string (default: $GITHUB_SHA or git rev-parse HEAD)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = process.argv[2] || '_site';
const SHA = (process.argv[3] || process.env.GITHUB_SHA || (() => {
  try { return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim(); }
  catch { return Date.now().toString(36); }
})()).slice(0, 12);

const NO_CACHE_META = [
  '<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />',
  '<meta http-equiv="Pragma" content="no-cache" />',
  '<meta http-equiv="Expires" content="0" />',
].join('\n  ');

const NO_CACHE_MARKER = 'data-cache-bust="injected"';

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function isRemote(url) {
  return /^(?:https?:)?\/\//i.test(url) || url.startsWith('data:');
}

function bustAttr(html, attr, ext) {
  const re = new RegExp(`(${attr}=["'])([^"']+\\.${ext})(\\?[^"']*)?(["'])`, 'gi');
  return html.replace(re, (m, pre, url, query, post) => {
    if (isRemote(url)) return m;
    return `${pre}${url}?v=${SHA}${post}`;
  });
}

function injectNoCacheMeta(html) {
  if (html.includes(NO_CACHE_MARKER)) return html;
  const block = `<meta ${NO_CACHE_MARKER} />\n  ${NO_CACHE_META}`;
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head[^>]*>/i, (m) => `${m}\n  ${block}`);
  }
  return html;
}

function processFile(file) {
  const original = fs.readFileSync(file, 'utf8');
  let updated = original;
  updated = bustAttr(updated, 'href', 'css');
  updated = bustAttr(updated, 'src', 'js');
  updated = injectNoCacheMeta(updated);
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    return true;
  }
  return false;
}

function main() {
  if (!fs.existsSync(ROOT)) {
    console.error(`cache-bust: directory not found: ${ROOT}`);
    process.exit(1);
  }
  const files = walk(ROOT);
  let changed = 0;
  for (const f of files) if (processFile(f)) changed++;
  console.log(`cache-bust: sha=${SHA} files=${files.length} changed=${changed}`);
}

main();
