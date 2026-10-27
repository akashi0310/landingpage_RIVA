# Hướng Dẫn Kích Hoạt Form Đăng Ký Vào Google Sheets (3 Phút)

Website RIVA sử dụng **Google Sheets** làm cơ sở dữ liệu nhận thông tin đăng ký tư vấn từ Phụ huynh và Học sinh. Khi người dùng bấm **Gửi đăng ký**, toàn bộ dữ liệu sẽ tự động nhảy vào file Google Sheet online của bạn theo thời gian thực.

---

## ⚡ Các Bước Thực Hiện Nhanh (Chỉ mất 2 - 3 phút)

### Bước 1: Tạo file Google Sheet mới
1. Mở trình duyệt và truy cập: **https://sheets.new** (hoặc tạo một Google Sheet mới trên Google Drive của bạn).
2. Đặt tên cho file trang tính, ví dụ: `RIVA – Hồ Sơ Đăng Ký Tuyển Sinh`.

---

### Bước 2: Dán mã Google Apps Script
1. Trên thanh menu của Google Sheet, chọn: **Tiện ích mở rộng** (Extensions) → **Apps Script**.
2. Một tab mới sẽ mở ra với trình soạn thảo mã `Code.gs`.
3. Xóa hết code mẫu hiện có, mở file [google-apps-script/Code.gs](google-apps-script/Code.gs) trong thư mục dự án và copy toàn bộ nội dung dán vào.
4. Bấm biểu tượng **Lưu dự án** (Save / hình đĩa mềm 💾 hoặc nhấn `Ctrl + S`).

---

### Bước 3: Triển khai Ứng dụng web (Web App)
1. Ở góc trên bên phải màn hình Apps Script, bấm nút **Triển khai** (Deploy) → chọn **Tùy chọn triển khai mới** (New deployment).
2. Bấm vào biểu tượng bánh răng ⚙️ bên cạnh "Chọn loại" (Select type) → chọn **Ứng dụng web** (Web app).
3. Điền cấu hình như sau:
   - **Mô tả** (Description): `RIVA Web Registration v1`
   - **Thực thi dưới dạng** (Execute as): Chọn **Tôi** (Me - email của bạn).
   - **Ai có quyền truy cập** (Who has access): Chọn **Bất kỳ ai** (Anyone) *(⚠️ Rất quan trọng: Phải chọn "Bất kỳ ai" để Phụ huynh vào web gửi thông tin không bị yêu cầu đăng nhập Google).*
4. Bấm **Triển khai** (Deploy).
5. Nếu Google hiển thị cửa sổ yêu cầu cấp quyền:
   - Chọn tài khoản Google của bạn.
   - Bấm **Nâng cao** (Advanced) → Bấm tiếp **Đi tới... (không an toàn)** (Go to... unsafe).
   - Bấm **Cho phép** (Allow).
6. Google sẽ cung cấp cho bạn một **URL ứng dụng web** (Web app URL), có dạng:
   ```text
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
   *(Lưu ý: URL phải kết thúc bằng `/exec`, không dùng URL kết thúc bằng `/dev`).*
7. Bấm **Sao chép** (Copy) đường link này.

---

### Bước 4: Dán URL vào Website RIVA
Bạn có thể kết nối bằng **1 trong 2 cách** sau:

#### Cách A: Dán trực tiếp trên giao diện website (Nhanh nhất)
1. Mở website RIVA trên trình duyệt.
2. Cuộn xuống phần **Cổng đăng ký** (hoặc bấm nút "Đăng ký tư vấn").
3. Bấm vào nút **⚙️ Cài đặt** ở góc dưới form đăng ký.
4. Dán URL đã sao chép ở Bước 3 vào ô và bấm **Lưu kết nối**.
5. Hệ thống sẽ lưu và kích hoạt ngay lập tức mà không cần khởi động lại website!

#### Cách B: Lưu vào file cấu hình `.env`
1. Mở file `.env` trong thư mục gốc của dự án.
2. Dán link vào dòng `VITE_GOOGLE_SHEETS_URL`:
   ```env
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycbx.../exec
   ```
3. Khởi động lại dự án hoặc chạy `npm run build`.

---

## 📊 Dữ Liệu Sẽ Được Tự Động Lưu Vào Google Sheet

Khi có Phụ huynh đăng ký, Google Apps Script sẽ tự động tạo tab trang tính **`Dang ky tu van`** với giao diện chuẩn RIVA (tiêu đề màu xanh Navy, chữ màu Vàng Gold):

| Cột | Tiêu đề | Mô tả |
| :--- | :--- | :--- |
| **A** | Thời gian đăng ký | Múi giờ Việt Nam (dd/MM/yyyy HH:mm:ss) |
| **B** | Mã hồ sơ | Mã định danh UUID chống trùng lặp |
| **C** | Họ và tên người đăng ký | Họ tên Phụ huynh hoặc Thí sinh |
| **D** | Số điện thoại / Zalo | Giữ nguyên số 0 ở đầu (dạng văn bản) |
| **E** | Email | Email liên hệ nhận thông báo |
| **F** | Vai trò | Phụ huynh / Học sinh / Giáo viên hướng dẫn |
| **G** | Học sinh & Trường / Lớp | Thông tin tên con, trường học và lớp |
| **H** | Cuộc thi quan tâm | SVIIF Mỹ, IPITEX Thái Lan, iENA Đức, Geneva Thụy Sĩ... |
| **I** | Lĩnh vực đề tài | AI, Y tế, Môi trường, Robotics... |
| **J** | Nội dung tư vấn / Lời nhắn | Tóm tắt đề tài hoặc nguyện vọng của gia đình |
| **K** | Nguồn đăng ký | URL trang web phát sinh lượt gửi |

---

## 💡 Lưu Ý Quan Trọng
- **Bảo mật:** Trang tính Google Sheet vẫn hoàn toàn riêng tư trong Google Drive của bạn. Người ngoài chỉ có thể ghi đơn mới vào chứ không thể đọc danh sách hay xem thông tin của các phụ huynh khác.
- **Cập nhật script:** Nếu bạn chỉnh sửa mã trong `Code.gs` sau này, hãy nhớ bấm **Triển khai → Quản lý bản triển khai (Manage deployments)** → Sửa (hình bút chì) → Chọn **Phiên bản mới (New version)** → Bấm **Triển khai** để thay đổi có hiệu lực.
