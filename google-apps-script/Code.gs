// ==========================================================================================
// RIVA GLOBAL PLATFORM - GOOGLE APPS SCRIPT ĐỒNG BỘ DỮ LIỆU ĐĂNG KÝ VÀO GOOGLE SHEETS
// ==========================================================================================
// Hướng dẫn nhanh:
// 1. Dán toàn bộ mã này vào: Tiện ích mở rộng > Apps Script (Extensions > Apps Script) trong Google Sheet của bạn.
// 2. Bấm "Triển khai" (Deploy) > "Tùy chọn triển khai mới" (New deployment).
// 3. Chọn loại: "Ứng dụng web" (Web app).
// 4. Cấu hình:
//    - Thực thi dưới dạng (Execute as): "Tôi" (Me)
//    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone)
// 5. Bấm "Triển khai" và sao chép URL Ứng dụng web (kết thúc bằng /exec) để dán vào website.
// ==========================================================================================

const TAB_NAME = 'Dang ky tu van';
const HEADERS = [
  'Thời gian đăng ký',
  'Mã hồ sơ',
  'Họ và tên người đăng ký',
  'Số điện thoại / Zalo',
  'Email',
  'Vai trò',
  'Học sinh & Trường / Lớp',
  'Cuộc thi quan tâm',
  'Lĩnh vực đề tài',
  'Nội dung tư vấn / Lời nhắn',
  'Nguồn đăng ký'
];

/**
 * Khởi tạo bảng tính và định dạng tiêu đề chuẩn nhận diện RIVA (Navy & Gold).
 * Hàm này có thể chạy thủ công một lần, hoặc hệ thống sẽ tự động kích hoạt khi có đơn đầu tiên.
 */
function setup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Vui lòng mở Apps Script từ trang tính Google Sheet đích.');
  PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', spreadsheet.getId());
  initSheet_(spreadsheet);
}

function initSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(TAB_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(TAB_NAME);
  }
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    
    // Định dạng giao diện tiêu đề chuyên nghiệp RIVA
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#071A3A'); // Navy RIVA
    headerRange.setFontColor('#FFDE43'); // Gold RIVA
    headerRange.setFontWeight('bold');
    headerRange.setFontFamily('Arial');
    headerRange.setFontSize(11);
    headerRange.setHorizontalAlignment('center');
    headerRange.setVerticalAlignment('middle');
    sheet.setRowHeight(1, 42);
    sheet.setFrozenRows(1);
    
    // Thiết lập độ rộng cột tối ưu
    sheet.setColumnWidth(1, 170); // Thời gian
    sheet.setColumnWidth(2, 130); // Mã hồ sơ
    sheet.setColumnWidth(3, 200); // Họ tên
    sheet.setColumnWidth(4, 150); // SĐT / Zalo
    sheet.setColumnWidth(5, 220); // Email
    sheet.setColumnWidth(6, 160); // Vai trò
    sheet.setColumnWidth(7, 260); // Học sinh / Trường / Lớp
    sheet.setColumnWidth(8, 200); // Cuộc thi
    sheet.setColumnWidth(9, 160); // Lĩnh vực
    sheet.setColumnWidth(10, 320); // Lời nhắn
    sheet.setColumnWidth(11, 220); // Nguồn
  }
  return sheet;
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function text_(value, max) {
  const text = String(value || '').trim();
  if (max && text.length > max) return text.substring(0, max);
  return text;
}

function cell_(value) {
  // Giữ số 0 đầu cho số điện thoại và ngăn chặn tiêm mã lệnh công thức
  return value ? "'" + value : '';
}

function getSpreadsheet_() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (spreadsheetId) {
    try {
      return SpreadsheetApp.openById(spreadsheetId);
    } catch (_) {}
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Tiếp nhận yêu cầu đăng ký từ Landing Page RIVA và lưu vào Google Sheets
 */
function doPost(e) {
  let lock;
  try {
    if (!e) throw new Error('Dữ liệu không hợp lệ');

    // Hỗ trợ cả dữ liệu dạng URLSearchParams và JSON body
    let p = {};
    if (e.parameter) {
      p = Object.assign({}, e.parameter);
    }
    if (e.postData && e.postData.contents) {
      try {
        const parsed = JSON.parse(e.postData.contents);
        p = Object.assign(p, parsed);
      } catch (_) {}
    }

    // Bộ lọc chống bot honeypot
    if (p.website) throw new Error('Yêu cầu bị từ chối');

    const id = text_(p.request_id || Utilities.getUuid(), 64);
    const name = text_(p.full_name, 120);
    const phone = text_(p.phone, 30);
    const email = text_(p.email, 254);
    const rawRole = text_(p.role, 30);

    // Chuyển đổi vai trò sang tiếng Việt thân thiện
    const roleMap = {
      'parent': 'Phụ huynh',
      'student': 'Học sinh / Sinh viên',
      'teacher': 'Giáo viên hướng dẫn',
      'other': 'Khác'
    };
    const displayRole = roleMap[rawRole] || rawRole || 'Phụ huynh';

    const values = [
      name,
      phone,
      email,
      displayRole,
      text_(p.school, 250),
      text_(p.interest_competition, 150),
      text_(p.interest_field, 150),
      text_(p.message, 3000),
      text_(p.source, 500)
    ];

    const spreadsheet = getSpreadsheet_();
    if (!spreadsheet) throw new Error('Không tìm thấy Google Sheet');

    // Khóa dữ liệu để tránh xung đột khi nhiều phụ huynh cùng đăng ký một lúc
    lock = LockService.getScriptLock();
    lock.waitLock(15000);

    const sheet = initSheet_(spreadsheet);

    // Chống ghi đè hoặc tạo 2 dòng trùng nhau khi gửi lại
    if (sheet.getLastRow() > 1) {
      const existing = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).createTextFinder(id).matchEntireCell(true).findNext();
      if (existing) {
        return json_({ ok: true, request_id: id });
      }
    }

    // Định dạng thời gian theo múi giờ Việt Nam
    const timeFormatted = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
    sheet.appendRow([timeFormatted, id].concat(values.map(cell_)));
    SpreadsheetApp.flush();

    return json_({ ok: true, request_id: id });
  } catch (err) {
    return json_({ ok: false, error: err.message });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

/**
 * Kiểm tra trạng thái hoạt động của Web App
 */
function doGet(e) {
  return json_({
    service: 'RIVA Global Platform - Consultation Registration Endpoint',
    ok: true,
    timestamp: new Date().toISOString()
  });
}
