#!/usr/bin/env node
/**
 * Re-encrypt edited plain HTML back into an existing staticrypt-protected page,
 * preserving the gate UI shell (background image, custom CSS, back button).
 *
 * Works by swapping ONLY the hex ciphertext blob in staticryptConfig — never
 * touching the gate scaffolding. So custom UI tweaks made outside the
 * encrypted payload survive the round trip.
 *
 * Salt is auto-loaded from .staticrypt.json at the repo root.
 *
 * Usage:
 *   node scripts/staticrypt-encrypt.js <plain-source.html> <target-encrypted.html> <password>
 *
 * Example workflow:
 *   node scripts/staticrypt-decrypt.js case-studies/thread-tracing.html gooddesign /tmp/src.html
 *   $EDITOR /tmp/src.html                                       # make your changes
 *   node scripts/staticrypt-encrypt.js /tmp/src.html case-studies/thread-tracing.html gooddesign
 *   # → live file rewritten in place, gate UI intact, HMAC round-trip verified
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function usage(code = 1) {
  console.error('Usage: node scripts/staticrypt-encrypt.js <plain-source.html> <target-encrypted.html> <password>');
  process.exit(code);
}

const [plainPath, targetPath, password] = process.argv.slice(2);
if (!plainPath || !targetPath || !password) usage();

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

const salt = findSalt(path.resolve(path.dirname(targetPath)));
const plain = fs.readFileSync(plainPath, 'utf-8');
const targetHtml = fs.readFileSync(targetPath, 'utf-8');

const oldBlobMatch = targetHtml.match(/staticryptEncryptedMsgUniqueVariableName":"([a-f0-9]+)"/);
if (!oldBlobMatch) {
  console.error('No existing staticrypt blob found in target — cannot determine where to swap.');
  process.exit(2);
}
const oldBlob = oldBlobMatch[1];

function pbkdf2Hex(input, saltStr, iters, hash) {
  return crypto.pbkdf2Sync(Buffer.from(input, 'utf-8'), Buffer.from(saltStr, 'utf-8'), iters, 32, hash).toString('hex');
}

let hashed = pbkdf2Hex(password, salt, 1000, 'sha1');
hashed = pbkdf2Hex(hashed, salt, 14000, 'sha256');
hashed = pbkdf2Hex(hashed, salt, 585000, 'sha256');

const key = Buffer.from(hashed, 'hex');
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
const encrypted = Buffer.concat([cipher.update(Buffer.from(plain, 'utf-8')), cipher.final()]);
const encryptedMsg = iv.toString('hex') + encrypted.toString('hex');
const hmac = crypto.createHmac('sha256', key).update(Buffer.from(encryptedMsg, 'utf-8')).digest('hex');
const newBlob = hmac + encryptedMsg;

// Round-trip verify before touching the live file.
const checkHMAC = crypto.createHmac('sha256', key).update(Buffer.from(encryptedMsg, 'utf-8')).digest('hex');
if (checkHMAC !== hmac) {
  console.error('Internal HMAC mismatch — refusing to write.');
  process.exit(3);
}
const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
const roundtrip = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf-8');
if (roundtrip !== plain) {
  console.error('Decrypted roundtrip differs from plain input — refusing to write.');
  process.exit(4);
}

const newHtml = targetHtml.replace(oldBlob, newBlob);
if (newHtml === targetHtml) {
  console.error('Blob replacement made no change — old blob not found in target.');
  process.exit(5);
}

fs.writeFileSync(targetPath, newHtml);
console.error('Re-encrypted ' + plainPath + ' → ' + targetPath);
console.error('  old blob: ' + oldBlob.length + ' chars');
console.error('  new blob: ' + newBlob.length + ' chars (Δ ' + (newBlob.length - oldBlob.length) + ')');
console.error('  gate UI preserved; HMAC + AES-CBC round-trip verified');
