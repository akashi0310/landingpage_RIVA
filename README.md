# Landing Page RIVA Du Học

Landing page giới thiệu chương trình du học của Viện RIVA.

**Live URL:** https://akashi0310.github.io/landingpage_RIVA/
**GitHub Repo:** https://github.com/akashi0310/landingpage_RIVA

---

## Cấu trúc thư mục

```
Landing_page_RIVA/
├── index.html       # Toàn bộ landing page (HTML + CSS + JS trong 1 file)
├── LOGO RIVA.png    # Logo chính thức của RIVA (dùng trong navbar, hero, footer)
└── README.md        # File hướng dẫn này
```

> Tất cả CSS và JavaScript đều nằm trong `index.html` — không cần cài thêm thư viện hay build tool nào.

---

## Các section trong landing page

| Section | Mô tả | Tìm trong file bằng từ khóa |
|---|---|---|
| Navbar | Menu điều hướng + logo | `<nav class="navbar"` |
| Hero | Banner đầu trang + stats | `<section class="hero"` |
| Giới thiệu | 2 cột giới thiệu RIVA | `id="gioi-thieu"` |
| Điểm nổi bật | 6 thẻ USP | `id="diem-noi-bat"` |
| Chương trình | 4 thẻ chương trình + bộ lọc | `id="chuong-trinh"` |
| Đối tượng | 3 thẻ glassmorphism | `id="doi-tuong"` |
| Lịch trình | Timeline 7 bước | `id="lich-trinh"` |
| Chi phí | 5 thẻ theo quốc gia | `id="chi-phi"` |
| FAQ | 8 câu hỏi accordion | `id="faq"` |
| Form đăng ký | Form liên hệ + validation | `id="dang-ky"` |
| CTA cuối | Kêu gọi hành động | `class="final-cta"` |
| Footer | Thông tin liên hệ | `<footer` |

---

## Cách chỉnh sửa nội dung

Mở `index.html` bằng VS Code (hoặc Notepad++), dùng **Ctrl+F** để tìm từ khóa bên dưới và thay thế nội dung thực tế.

### Danh sách placeholder cần điền

| Placeholder | Ý nghĩa | Tìm bằng |
|---|---|---|
| `(+84) xxx xxx xxx` | Số điện thoại RIVA | `(+84)` |
| `info@riva.edu.vn` | Email liên hệ | `info@riva` |
| `123 Đường ABC, Quận X, TP.HCM` | Địa chỉ văn phòng | `123 Đường ABC` |
| `RIVA Education` | Tên đầy đủ (footer) | `RIVA Education` |
| Nội dung giới thiệu | Đoạn văn giới thiệu RIVA | `id="gioi-thieu"` |
| Nội dung chương trình | Tên & mô tả 4 chương trình | `id="chuong-trinh"` |
| Chi phí cụ thể | Số tiền từng quốc gia | `id="chi-phi"` |
| Câu hỏi FAQ | 8 Q&A thực tế | `id="faq"` |
| Link mạng xã hội | Facebook, Zalo, Instagram | `fa-facebook`, `fa-tiktok` |

### Thay số điện thoại trong form validation

Tìm dòng sau trong `<script>`:
```js
const phoneRegex = /^(0|\+84)[0-9]{9}$/;
```
Regex này chấp nhận số VN 10 chữ số bắt đầu bằng `0` hoặc `+84`. Không cần sửa trừ khi muốn thay đổi format.

---

## Cách thay đổi logo

1. Thay file `LOGO RIVA.png` bằng logo mới (giữ nguyên tên file)
2. Hoặc sửa đường dẫn trong HTML — tìm tất cả `LOGO RIVA.png`:
   ```
   Ctrl+F → "LOGO RIVA.png"
   ```
   Có 3 chỗ: navbar, hero, footer.

**Lưu ý logo trên nền tối:** Footer và một số nơi dùng CSS filter để logo hiển thị màu trắng:
```css
filter: brightness(0) invert(1);
```
Nếu logo mới đã có màu trắng sẵn, xóa dòng filter đó đi.

---

## Cách thay đổi màu sắc

Mở `index.html`, tìm phần `:root` ở đầu `<style>`:

```css
:root {
  --primary: #4f46e5;    /* Tím indigo — màu chính */
  --accent: #10b981;     /* Xanh lá — màu nhấn */
  --dark-bg: #0f172a;    /* Nền tối */
  --card-bg: #1e293b;    /* Nền card */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
}
```

Chỉ cần đổi giá trị hex là toàn bộ trang thay đổi theo.

---

## Cách cập nhật và push lên GitHub

### Lần đầu (đã làm)

Repo đã được tạo và push. Không cần lặp lại bước này.

### Khi cần cập nhật nội dung

Mỗi khi sửa `index.html` hoặc thêm file mới, chạy các lệnh sau trong terminal (Git Bash hoặc PowerShell):

```bash
# 1. Vào thư mục dự án
cd "C:/Users/lapla/OneDrive/Desktop/Đi làm/Những công việc phải làm/10-8 till 17-8/Landing_page_RIVA"

# 2. Kiểm tra những file đã thay đổi
git status

# 3. Thêm file vào staging
git add index.html
# Hoặc thêm tất cả:
git add .

# 4. Commit với mô tả
git commit -m "cập nhật nội dung section chi phí"

# 5. Push lên GitHub
git push
```

### Nếu git push bị lỗi xác thực (authentication)

Tạo Personal Access Token mới trên GitHub:
1. Vào https://github.com/settings/tokens/new
2. Đặt tên token, chọn **No expiration**
3. Tích vào **repo** (Full control of private repositories)
4. Nhấn **Generate token** → copy token (chỉ hiện 1 lần)

Sau đó push với token trong URL:
```bash
git push https://akashi0310:TOKEN_CUA_BAN@github.com/akashi0310/landingpage_RIVA.git main
```
Thay `TOKEN_CUA_BAN` bằng token vừa copy.

---

## Bật/tắt GitHub Pages

GitHub Pages đã được bật. Sau mỗi lần push, trang sẽ tự cập nhật sau khoảng **1–2 phút**.

Nếu cần bật lại:
1. Vào https://github.com/akashi0310/landingpage_RIVA/settings/pages
2. **Source**: Deploy from a branch
3. **Branch**: main / (root)
4. Nhấn **Save**

---

## Troubleshooting

### Trang không cập nhật sau khi push

- Chờ 1–2 phút rồi hard refresh: **Ctrl+Shift+R**
- Kiểm tra tab **Actions** trên GitHub để xem deployment có lỗi không

### Logo không hiển thị

- Đảm bảo file `LOGO RIVA.png` nằm **cùng thư mục** với `index.html`
- Tên file phân biệt chữ hoa/thường — phải đúng là `LOGO RIVA.png`

### Form gửi không hoạt động

Form hiện tại chỉ có frontend validation và hiển thị toast "Đăng ký thành công". Để nhận email thực sự, cần tích hợp backend hoặc dùng dịch vụ như:
- [Formspree](https://formspree.io/) — miễn phí, chỉ cần thêm `action="https://formspree.io/f/YOUR_ID"` vào `<form>`
- [EmailJS](https://www.emailjs.com/) — gửi email từ JavaScript

### Lỗi UnicodeEncodeError khi chạy Python script

Nếu chạy `gen_word_v2.py` trên Windows và gặp lỗi encoding:
```
UnicodeEncodeError: 'cp1252' codec can't encode character
```
Thêm vào đầu script:
```python
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
```

---

## Checklist nội dung cần hoàn thiện

- [ ] Điền số điện thoại thực tế (tìm `(+84) xxx xxx xxx`)
- [ ] Điền email liên hệ (tìm `info@riva.edu.vn`)
- [ ] Điền địa chỉ văn phòng (tìm `123 Đường ABC`)
- [ ] Viết đoạn giới thiệu RIVA thực tế (section `id="gioi-thieu"`)
- [ ] Cập nhật tên và mô tả 4 chương trình du học
- [ ] Điền chi phí cụ thể cho từng quốc gia
- [ ] Viết 8 câu hỏi FAQ thực tế
- [ ] Thêm link Facebook, Zalo, Instagram của RIVA
- [ ] Kiểm tra và cập nhật stats ở Hero (số học sinh, đối tác, năm kinh nghiệm)
- [ ] Cân nhắc tích hợp form gửi email (Formspree hoặc EmailJS)

---

## Các file liên quan khác

| File | Mô tả | Vị trí |
|---|---|---|
| `landing_du_hoc.html` | Bản gốc landing page (trước khi copy vào repo) | `10-8 till 17-8/` |
| `DAN_Y_AN_PHAM_DU_HOC_RIVA.docx` | Dàn ý chi tiết các đầu việc ấn phẩm du học | `10-8 till 17-8/` |
| `gen_word_v2.py` | Script Python tạo file Word từ Excel | `C:/Users/lapla/` |
| `CHECKLIST ẤN PHẨM DU HỌC.xlsx` | File Excel gốc chứa danh sách đầu việc | `RIVA_theo_tuan/Excel_file/` |

---

## Links hữu ích

- **Live landing page:** https://akashi0310.github.io/landingpage_RIVA/
- **GitHub repo:** https://github.com/akashi0310/landingpage_RIVA
- **GitHub Pages settings:** https://github.com/akashi0310/landingpage_RIVA/settings/pages
- **Tạo Personal Access Token:** https://github.com/settings/tokens/new
- **Trang theo tuần (nguồn tham khảo):** https://akashi0310.github.io/RIVA_theo_tuan/
- **Font Plus Jakarta Sans:** https://fonts.google.com/specimen/Plus+Jakarta+Sans
- **Font Awesome icons:** https://fontawesome.com/icons
