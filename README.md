> **Phiên bản hiện tại:** Landing page quảng cáo và đăng ký tư vấn, không có đăng nhập, portal thí sinh/quản trị hay thanh toán. Form đang chờ kết nối Google Sheets. Xem [GOOGLE-SHEETS-SETUP.md](GOOGLE-SHEETS-SETUP.md) và [DEPLOY-GITHUB-PAGES.md](DEPLOY-GITHUB-PAGES.md). Các mô tả portal/Supabase bên dưới là tài liệu của bản demo cũ.
# RIVA GLOBAL — VIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO
> **Hệ Sinh Thái Số Toàn Diện V1**: Kết nối tài năng Việt Nam với đấu trường khoa học & sáng tạo quốc tế.  
> Được thiết kế chuẩn hóa theo **ảnh `8.png`** và tài liệu **`HƯỚNG DẪN CHUNG VỀ THIẾT KẾ.docx`**.

---

## 🌟 1. CÁC MÀN HÌNH CHÍNH (THEO ẢNH 8.PNG)

Hệ thống tích hợp thanh điều hướng nhanh **RIVA DEMO NAVIGATOR** ở trên cùng, cho phép chuyển đổi 1-click giữa tất cả các màn hình:

1. **Trang Chủ (Landing Page)** *(Ảnh 8.png - Trái)*:
   - **Hero Section**: Tiêu đề *"ĐƯA TÀI NĂNG VIỆT NAM RA ĐẤU TRƯỜNG QUỐC TẾ"*, bản đồ số phát sáng (Digital World Map) với các tuyến kết nối thời gian thực từ Việt Nam tới Hoa Kỳ, Đức, Thụy Sĩ, Thái Lan.
   - **Trust Section**: Mạng lưới đối tác quốc tế bảo trợ (IFIA, WIIPA, SVIIF, IPITEX, iENA, Geneva, WIPO).
   - **Smart UX Finder**: Bộ lọc thông minh *"Bạn đang tìm cơ hội nào?"* (Đối tượng, Lĩnh vực, Quốc gia mong muốn).
   - **Competitions Section (CMS-Driven)**: Card các cuộc thi đang mở (SVIIF 🇺🇸, IPITEX 🇹🇭, iENA 🇩🇪, Geneva 🇨🇭) với trạng thái 🟢 ĐANG MỞ, 🟡 SẮP MỞ.
   - **Về RIVA (About RIVA)**: Phim tư liệu đoàn Việt Nam tại Silicon Valley, sứ mệnh & chương trình ươm mầm *RIVA Innovation Mentoring*.
   - **Global Network & Stories**: Dấu ấn các đoàn học sinh Việt Nam trên các đấu trường thế giới.
   - **Thành Tựu & Quy Trình 7 Bước**: Infographic số liệu lớn (18+ Quốc gia, 350+ Huy chương) & Timeline 7 bước từ ý tưởng đến nhận bằng khen quốc tế.
   - **Bảng Vàng Thành Tích (Student Stories)**: Chân dung và đề tài của các thủ khoa đoạt Huy chương Vàng.
   - **Tin tức & Sự kiện**: Cập nhật từ đấu trường quốc tế.
   - **Final CTA & Lead Form**: Biểu mẫu đăng ký tư vấn trực tiếp lưu vào bảng `leads` của Supabase.

2. **Chi Tiết Cuộc Thi — SVIIF 2027** *(Ảnh 8.png - Giữa trên)*:
   - Quốc kỳ Hoa Kỳ 🇺🇸, địa điểm Thung lũng Silicon (Santa Clara, California), thời hạn nộp hồ sơ.
   - Hệ thống tab chi tiết: **TỔNG QUAN**, **ĐIỀU KIỆN**, **LĨNH VỰC**, **HỒ SƠ**, **TIMELINE**, **CHI PHÍ**, **FAQ**.
   - Nút nộp đơn trực tiếp.

3. **Cổng Đăng Ký - Đăng Nhập** *(Ảnh 8.png - Phải trên)*:
   - Modal xác thực mô phỏng `portal.riva.global`.
   - Hỗ trợ Supabase Auth và tích hợp sẵn 2 nút tài khoản Demo 1-click (Thí sinh Demo / Admin Demo).

4. **Dashboard Thí Sinh** *(Ảnh 8.png - Giữa dưới)*:
   - Lời chào: *Xin chào, Nguyễn Văn A (THPT Chuyên Hà Nội - Amsterdam)*.
   - Thống kê: 01 Cuộc thi, 02 Dự án, 01 Thông báo.
   - Thẻ hồ sơ mới nhất SVIIF 2027 với tiến trình 4 giai đoạn xét duyệt.
   - Biểu mẫu nộp thông tin thí sinh & đề tài nghiên cứu lưu trực tiếp vào bảng `applications` của Supabase.

5. **Portal Quản Trị - Dashboard** *(Ảnh 8.png - Phải giữa)*:
   - 4 Thẻ chỉ số: 12 Cuộc thi, 486 Tổng hồ sơ, 321 Đã duyệt, 87 Chờ xử lý.
   - Biểu đồ xu hướng đăng ký hồ sơ theo tháng (Interactive Trend Chart).

6. **Quản Lý Cuộc Thi & Xét Duyệt Hồ Sơ** *(Ảnh 8.png - Phải dưới)*:
   - Bảng quản lý danh mục cuộc thi (Thêm mới, Xem, Xóa, Cập nhật trạng thái).
   - Hàng chờ thẩm định hồ sơ thí sinh: Nút **[Duyệt 🟢]**, **[Từ chối 🔴]**.
   - Chức năng **[Xuất Excel / CSV]** tải về danh sách hồ sơ thực tế.

---

## 🚀 2. CHẠY VÀ KIỂM THỬ LOCAL

Máy chủ phát triển hiện đang khởi chạy tại:
```
http://localhost:3000/
```

Nếu muốn chạy thủ công:
```bash
# Cài đặt thư viện
npm install

# Khởi chạy dev server
npm run dev

# Kiểm tra build sản phẩm
npm run build
```

---

## 🗄️ 3. KẾT NỐI SUPABASE

Toàn bộ cấu trúc cơ sở dữ liệu đã được viết sẵn trong file [`supabase/schema.sql`](file:///c:/Users/lapla/Desktop/Đi%20làm/Những%20công%20việc%20phải%20làm/Việc%20phụ/cô%20Hà/2026-10-8/Landing%20page%20NCKH/supabase/schema.sql):

### Các bảng dữ liệu:
- `competitions`: Danh sách và thông số các cuộc thi quốc tế.
- `leads`: Hồ sơ tư vấn từ form Landing Page.
- `applications`: Hồ sơ dự thi và đề tài của thí sinh nộp qua Portal.
- `achievements`: Bảng vàng thành tích học sinh tiêu biểu.

### Các bước kích hoạt Supabase thật:
1. Đăng nhập vào [Supabase Console](https://app.supabase.com) và tạo một Project mới.
2. Mở mục **SQL Editor** trong dự án Supabase, copy toàn bộ nội dung từ file `supabase/schema.sql` và bấm **Run**.
3. Lấy thông tin **Project URL** và **Anon Public Key** từ mục *Project Settings > API*.
4. Mở file `.env` (hoặc copy từ `.env.example`) và điền:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
   ```
5. Khi không có file `.env` hoặc đang kiểm thử nội bộ, ứng dụng tự động chạy ở chế độ **Local Storage Reactive Fallback**, bảo đảm kiểm thử 100% tính năng mà không bị lỗi.

---

## ☁️ 4. DEPLOY LÊN VERCEL

Dự án đã có sẵn file [`vercel.json`](file:///c:/Users/lapla/Desktop/Đi%20làm/Những%20công%20việc%20phải%20làm/Việc%20phụ/cô%20Hà/2026-10-8/Landing%20page%20NCKH/vercel.json) với cấu hình tiêu chuẩn:

1. Đẩy mã nguồn lên kho chứa GitHub / GitLab.
2. Truy cập [Vercel Dashboard](https://vercel.com) > **Add New Project** > Chọn kho chứa.
3. Framework Preset: **Vite** (Build Command: `npm run build`, Output Directory: `dist`).
4. Trong phần **Environment Variables**, thêm 2 biến:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Bấm **Deploy**. Vercel sẽ tự động build và xuất bản trang web với tên miền toàn cầu.

---

## 🎨 5. DESIGN SYSTEM SPECIFICATIONS
- **Phong cách**: Institutional (Trang trọng, uy tín), International (Quốc tế), Technology (Công nghệ hiện đại).
- **Màu chủ đạo**:
  - Deep Space / Navy đậm: `#030A17`, `#071A3A`, `#0C234B`
  - Vàng Gold (CTA, Huy chương, Số liệu): `#C9A227`, `#EEC94D`
  - Xanh Công nghệ: `#146EF5`, `#60A5FA`
- **Typography**: Google Fonts `Plus Jakarta Sans` & `Inter`.
