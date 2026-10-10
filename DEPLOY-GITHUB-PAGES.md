# Deploy demo RIVA bằng GitHub Pages

1. Push các thay đổi cấu hình lên nhánh `main`.
2. Mở https://github.com/akashi0310/landingpage_RIVA/settings/pages.
3. Trong **Build and deployment → Source**, chọn **GitHub Actions**.
4. Mở tab **Actions**, chọn **Deploy demo to GitHub Pages** → **Run workflow** nếu lần chạy trước chưa thành công.
5. Khi workflow thành công, mở https://akashi0310.github.io/landingpage_RIVA/.

Các lần push tiếp theo vào `main` tự động cập nhật demo.

Workflow chạy `npm ci`, sau đó `npm run build -- --mode github-pages`, và xuất bản thư mục `dist`.
Chế độ này dùng base `/landingpage_RIVA/`; chạy local và build thông thường vẫn dùng `/`.

Demo mặc định dùng dữ liệu mẫu và localStorage của từng trình duyệt, không dùng chung dữ liệu giữa người xem. Không cần cấu hình Supabase để xem demo.

Kiểm tra build trên Windows:

```powershell
npm.cmd run build -- --mode github-pages
```
