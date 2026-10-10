# Kích hoạt form đăng ký vào Google Sheets

Website chỉ giới thiệu và nhận yêu cầu tư vấn, không có tài khoản thí sinh, quản trị hay thanh toán. Google Sheets là nơi quản lý thông tin đăng ký.

## 1. Tạo nơi nhận dữ liệu

1. Tạo một Google Sheet mới tại https://sheets.new và đặt tên **RIVA – Đăng ký tư vấn**.
2. Trong Sheet, mở **Tiện ích mở rộng → Apps Script**.
3. Thay nội dung `Code.gs` bằng file [google-apps-script/Code.gs](google-apps-script/Code.gs) của dự án và lưu.
4. Chọn hàm **setup**, bấm **Run / Chạy** và cấp quyền trong tài khoản của bạn. Hàm này tạo tab `Dang ky tu van` và lưu ID Sheet trong Script Properties.
5. Chọn **Deploy → New deployment → Web app**. Chọn **Execute as: Me** và **Who has access: Anyone** để người đăng ký không cần đăng nhập Google.
6. Copy **Web app URL** có dạng `https://script.google.com/macros/s/…/exec` rồi gửi lại cho người triển khai website. Không dùng URL `/dev`.

Sheet vẫn để riêng tư, chỉ chia sẻ với người phụ trách. Web app chỉ nhận thông tin mới; không có API đọc danh sách đăng ký. Không gửi mật khẩu Google hoặc token truy cập.

## 2. Kết nối GitHub Pages

Trong repository: **Settings → Secrets and variables → Actions → Variables → New repository variable**:

- Name: `VITE_GOOGLE_SHEETS_URL`
- Value: Web app URL ở trên.

Chạy lại workflow **Deploy demo to GitHub Pages** trong tab Actions. Chạy local thì đặt biến tương tự trong `.env.local` và khởi động lại Vite.

## 3. Kiểm tra trước khi nhận đăng ký thật

Gửi một đăng ký thử với dữ liệu giả từ chính link GitHub Pages, rồi mở Sheet xác nhận có đúng một hàng mới và form báo thành công. Thử trên điện thoại và cửa sổ ẩn danh để bảo đảm không cần đăng nhập Google. Thử lỗi mạng: form giữ dữ liệu và không báo thành công. Gửi lại cùng yêu cầu sử dụng cùng mã để tránh hàng trùng khi lần trước đã được ghi.

Các cột: thời gian, mã đăng ký, họ tên, điện thoại/Zalo, email, vai trò, trường/lớp, cuộc thi, lĩnh vực (để trống nếu form không hỏi), lời nhắn, URL nguồn. Số điện thoại lưu dạng văn bản để giữ số 0 đầu.

Nếu gặp lỗi gửi: kiểm tra quyền truy cập **Anyone**, URL `/exec`, hàm `setup`, và Apps Script **Executions**. Sau khi sửa script, cập nhật deployment bằng phiên bản mới. Frontend không dùng `no-cors` vì phản hồi opaque không chứng minh dữ liệu đã được lưu.

Hiện chưa có URL Apps Script nên nút gửi đang tắt và hiển thị thông báo đang thiết lập. Chưa có dữ liệu gửi tới Google Sheets; cần kiểm tra thực tế sau khi cấu hình. Bộ lọc honeypot hạn chế bot đơn giản; Apps Script có hạn mức, nên khi chạy chiến dịch lớn cần theo dõi và bổ sung chống spam phù hợp.

Tài liệu Google: https://developers.google.com/apps-script/guides/web và https://developers.google.com/apps-script/guides/content.
