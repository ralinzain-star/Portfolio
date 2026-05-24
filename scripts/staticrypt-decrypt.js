#!/usr/bin/env node
/**
 * Decrypt a staticrypt-encrypted HTML page back to its plain source.
 *
 * staticrypt's official CLI only encrypts; this is the missing decrypt half so
 * we can edit a published case study (e.g. update EN defaults, fix typos)
 * without losing the gate UI customisations baked into the encrypted shell.
 *
 * Salt is auto-loaded from .staticrypt.json at the repo root.
 *
 * Usage:
 *   node scripts/staticrypt-decrypt.js <encrypted-html> <password> [output-html]
 *
 * Examples:
 *   node scripts/staticrypt-decrypt.js case-studies/thread-tracing.html gooddesign > /tmp/source.html
 *   node scripts/staticrypt-decrypt.js case-studies/wren-agent.html mypw /tmp/wren-source.html
 *
 * Algorithm (mirrors staticrypt's in-browser JS so output is bit-identical to
 * what users see after typing the password):
 *   1. hashedPassword = PBKDF2-SHA1(pw, salt, 1000) →
 *                      PBKDF2-SHA256(prev, salt, 14000) →
 *                      PBKDF2-SHA256(prev, salt, 585000)
 *   2. signedMsg     = HMAC-SHA256(hashedPassword, encryptedMsg) || encryptedMsg
 *   3. encryptedMsg  = IV(16B) || AES-256-CBC(plain)
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function usage(code = 1) {
  console.error('Usage: node scripts/staticrypt-decrypt.js <encrypted-html> <password> [output-html]');
  process.exit(code);
}

const [encryptedHtmlPath, password, outputPath] = process.argv.slice(2);
if (!encryptedHtmlPath || !password) usage();

// Locate .staticrypt.json walking up from CWD.
function findSalt(startDir) {
  let dir = startDir;
  while (dir !== path.dirname(dir)) {
    const candidate = path.join(dir, '.staticrypt.json');
    if (fs.existsSync(candidate)) {
      return JSON.parse(fs.readFileSync(candidate, 'utf-8')).salt;
    }
    dir = path.dirname(dir);
  }
  throw new Error('.staticrypt.json not found walking up from ' + startDir);
}

const salt = findSalt(path.resolve(path.dirname(encryptedHtmlPath)));
const html = fs.readFileSync(encryptedHtmlPath, 'utf-8');

// Extract the hex blob from staticryptConfig.
const blobMatch = html.match(/staticryptEncryptedMsgUniqueVariableName":"([a-f0-9]+)"/);
if (!blobMatch) {
  console.error('No staticrypt blob found — is this an encrypted file?');
  process.exit(2);
}
const signedMsg = blobMatch[1];

function pbkdf2Hex(input, saltStr, iters, hash) {
  return crypto.pbkdf2Sync(Buffer.from(input, 'utf-8'), Buffer.from(saltStr, 'utf-8'), iters, 32, hash).toString('hex');
}

let hashed = pbkdf2Hex(password, salt, 1000, 'sha1');
hashed = pbkdf2Hex(hashed, salt, 14000, 'sha256');
hashed = pbkdf2Hex(hashed, salt, 585000, 'sha256');

const expectedHMAC = signedMsg.substring(0, 64);
const encryptedMsg = signedMsg.substring(64);
const key = Buffer.from(hashed, 'hex');
const computedHMAC = crypto.createHmac('sha256', key).update(Buffer.from(encryptedMsg, 'utf-8')).digest('hex');

if (computedHMAC !== expectedHMAC) {
  console.error('HMAC mismatch — wrong password.');
  process.exit(3);
}

const iv = Buffer.from(encryptedMsg.substring(0, 32), 'hex');
const ciphertext = Buffer.from(encryptedMsg.substring(32), 'hex');
const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
const plain = Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf-8');

if (outputPath) {
  fs.writeFileSync(outputPath, plain);
  console.error('Decrypted ' + encryptedHtmlPath + ' → ' + outputPath + ' (' + plain.length + ' chars)');
} else {
  process.stdout.write(plain);
}
