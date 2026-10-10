import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { transformSync } from 'esbuild';

const id = '12345678-1234-4123-8123-123456789012';
const valid = { request_id: id, full_name: 'Test RIVA', phone: '0900000000', email: 'test@example.com', role: 'parent', message: '=1+1' };

function server({ failWrite = false } = {}) {
  const rows = [['headers']];
  let locked = false;
  const sheet = {
    getLastRow: () => rows.length,
    appendRow: row => { if (failWrite) throw new Error('Write failed'); rows.push(row); },
    getRange: () => ({ createTextFinder: query => ({ matchEntireCell: () => ({ findNext: () => rows.some(r => r[1] === query) }) }) }),
  };
  const context = vm.createContext({
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: value => ({ setMimeType: () => JSON.parse(value) }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => 'test-sheet' }) },
    SpreadsheetApp: { openById: () => ({ getSheetByName: () => sheet }), flush: () => {} },
    LockService: { getScriptLock: () => ({ waitLock: () => { locked = true; }, hasLock: () => locked, releaseLock: () => { locked = false; } }) },
  });
  vm.runInContext(readFileSync('google-apps-script/Code.gs', 'utf8'), context);
  return { rows, submit: parameter => context.doPost({ parameter, contentLength: 1000 }), locked: () => locked };
}

test('writes all submitted fields as text, retains phone zero and deduplicates retries', () => {
  const app = server();
  assert.equal(app.submit(valid).ok, true);
  assert.equal(app.rows[1][3], "'0900000000");
  assert.equal(app.rows[1][9], "'=1+1");
  assert.equal(app.submit(valid).request_id, id);
  assert.equal(app.rows.length, 2);
  assert.equal(app.locked(), false);
});

test('rejects missing fields, invalid email, overlong messages and honeypot', () => {
  const app = server();
  for (const change of [{ full_name: '' }, { email: 'invalid' }, { message: 'x'.repeat(3001) }, { website: 'spam' }]) {
    assert.equal(app.submit({ ...valid, ...change }).ok, false);
  }
  assert.equal(app.rows.length, 1);
});

test('failed sheet write is not reported as success and releases lock', () => {
  const app = server({ failWrite: true });
  assert.equal(app.submit(valid).ok, false);
  assert.equal(app.locked(), false);
});

function client(endpoint, fetch) {
  const { code } = transformSync(readFileSync('src/lib/leads.ts', 'utf8'), { loader: 'ts', format: 'cjs', define: { 'import.meta.env.VITE_GOOGLE_SHEETS_URL': JSON.stringify(endpoint) } });
  const context = vm.createContext({ module: { exports: {} }, URLSearchParams, AbortController, DOMException, TypeError, fetch, window: { setTimeout, clearTimeout, location: { origin: 'https://example.com', pathname: '/' } } });
  vm.runInContext(code, context);
  return context.module.exports;
}

test('frontend requires configuration and an explicit matching acknowledgment', async () => {
  await assert.rejects(client('', () => { throw new Error('Should not send'); }).submitLead(valid, id, ''));
  const endpoint = 'https://script.google.com/macros/s/example/exec';
  for (const result of [{ ok: false }, { ok: true, request_id: 'wrong' }]) {
    await assert.rejects(client(endpoint, async () => ({ ok: true, json: async () => result })).submitLead(valid, id, ''));
  }
  await client(endpoint, async (_, options) => {
    assert.equal(options.body.get('phone'), '0900000000');
    assert.equal(options.method, 'POST');
    assert.notEqual(options.mode, 'no-cors');
    return { ok: true, json: async () => ({ ok: true, request_id: id }) };
  }).submitLead(valid, id, '');
  await assert.rejects(client(endpoint, async () => { throw new TypeError('Network failure'); }).submitLead(valid, id, ''));
});
