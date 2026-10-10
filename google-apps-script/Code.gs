// Paste into Extensions > Apps Script from the destination Google Sheet.
// Run setup() once, then deploy as a Web app: Execute as Me; access Anyone.
const TAB_NAME = 'Dang ky tu van';
const HEADERS = ['Thời gian', 'Mã đăng ký', 'Họ tên', 'Điện thoại / Zalo', 'Email', 'Vai trò', 'Trường / Lớp', 'Cuộc thi quan tâm', 'Lĩnh vực', 'Lời nhắn', 'Nguồn'];

function setup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Open Apps Script from the destination Google Sheet.');
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', spreadsheet.getId());
  const sheet = spreadsheet.getSheetByName(TAB_NAME) || spreadsheet.insertSheet(TAB_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  sheet.setFrozenRows(1);
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function text_(value, max) {
  const text = String(value || '').trim();
  if (text.length > max) throw new Error('Invalid field length');
  return text;
}

function cell_(value) {
  // Store untrusted values as text, including phone numbers and formula-like input.
  return value ? "'" + value : '';
}

function doPost(e) {
  let lock;
  try {
    if (!e || e.contentLength > 16000) throw new Error('Invalid request');
    const p = e.parameter || {};
    if (p.website) throw new Error('Invalid request');
    const id = text_(p.request_id, 64);
    const name = text_(p.full_name, 120);
    const phone = text_(p.phone, 30);
    const email = text_(p.email, 254);
    const role = text_(p.role, 20);
    if (!/^[a-f0-9-]{36}$/i.test(id) || name.length < 2 || !/^[+0-9() .-]{8,30}$/.test(phone) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !['student', 'parent', 'teacher', 'other'].includes(role)) {
      throw new Error('Invalid fields');
    }
    const values = [name, phone, email, role, text_(p.school, 200), text_(p.interest_competition, 150), text_(p.interest_field, 150), text_(p.message, 3000), text_(p.source, 500)];
    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    if (!spreadsheetId) throw new Error('Setup required');
    lock = LockService.getScriptLock();
    lock.waitLock(15000);
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(TAB_NAME);
    if (!sheet) throw new Error('Setup required');
    // Retrying the same request after a timeout must not create another lead.
    if (sheet.getLastRow() > 1 && sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).createTextFinder(id).matchEntireCell(true).findNext()) {
      return json_({ ok: true, request_id: id });
    }
    sheet.appendRow([new Date(), id].concat(values.map(cell_)));
    SpreadsheetApp.flush();
    return json_({ ok: true, request_id: id });
  } catch (_) {
    // Never return lead data or internal details to the public endpoint.
    return json_({ ok: false });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function doGet() {
  return json_({ service: 'RIVA consultation form', ok: true });
}
