-- ====================================================================
-- RIVA INNOVATION RESEARCH INSTITUTE (HỆ SINH THÁI SỐ TOÀN DIỆN V1)
-- SUPABASE DATABASE SCHEMA & SEED DATA
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE: COMPETITIONS (Danh sách các cuộc thi)
CREATE TABLE IF NOT EXISTS public.competitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    country_code VARCHAR(10) NOT NULL,
    flag_emoji VARCHAR(10) DEFAULT '🌐',
    location VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'open', -- 'open' (Đang mở), 'upcoming' (Sắp mở), 'closed' (Đã đóng)
    deadline DATE NOT NULL,
    event_date VARCHAR(100) NOT NULL,
    fee VARCHAR(100),
    organizer VARCHAR(255),
    description TEXT,
    requirements JSONB DEFAULT '[]'::jsonb,
    timeline JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLE: LEADS (Hồ sơ tư vấn từ Landing Page)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    role VARCHAR(50) DEFAULT 'student', -- 'student', 'parent', 'teacher'
    school VARCHAR(255),
    interest_competition VARCHAR(100),
    interest_field VARCHAR(100),
    message TEXT,
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'consulted', 'registered'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLE: APPLICATIONS (Hồ sơ đăng ký dự thi của thí sinh)
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- Liên kết với auth.users nếu dùng Supabase Auth
    full_name VARCHAR(150) NOT NULL,
    dob DATE,
    nationality VARCHAR(100) DEFAULT 'Việt Nam',
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    school VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    competition_code VARCHAR(50) NOT NULL,
    competition_title VARCHAR(255),
    project_title VARCHAR(255) NOT NULL,
    project_field VARCHAR(100) NOT NULL,
    project_summary TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'under_review', -- 'submitted', 'under_review', 'approved', 'revision_requested', 'rejected'
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLE: ACHIEVEMENTS (Bảng vàng thành tích học sinh tiêu biểu)
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name VARCHAR(150) NOT NULL,
    school VARCHAR(255) NOT NULL,
    award VARCHAR(150) NOT NULL,
    medal_type VARCHAR(50) NOT NULL, -- 'gold', 'silver', 'bronze', 'special'
    competition VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    project_title VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Competitions: Ai cũng có thể xem
CREATE POLICY "Public read competitions" ON public.competitions
    FOR SELECT USING (true);

-- Leads: Ai cũng có thể gửi form tư vấn
CREATE POLICY "Public insert leads" ON public.leads
    FOR INSERT WITH CHECK (true);

-- Leads: Quản trị viên có thể xem
CREATE POLICY "Admin read leads" ON public.leads
    FOR SELECT USING (true);

-- Applications: Ai cũng có thể nộp hồ sơ
CREATE POLICY "Public insert applications" ON public.applications
    FOR INSERT WITH CHECK (true);

-- Applications: Cho phép đọc hồ sơ
CREATE POLICY "Public read applications" ON public.applications
    FOR SELECT USING (true);

-- Applications: Cho phép cập nhật trạng thái (cho admin)
CREATE POLICY "Public update applications" ON public.applications
    FOR UPDATE USING (true);

-- Achievements: Ai cũng có thể xem
CREATE POLICY "Public read achievements" ON public.achievements
    FOR SELECT USING (true);

-- ====================================================================
-- SEED DATA (DỮ LIỆU MẪU CHUẨN XÁC THEO SLIDE & THIẾT KẾ)
-- ====================================================================

-- Chèn Cuộc thi
INSERT INTO public.competitions (code, title, country, country_code, flag_emoji, location, category, status, deadline, event_date, fee, organizer, description)
VALUES 
(
    'SVIIF', 
    'SVIIF 2027 - Silicon Valley International Invention Festival', 
    'Hoa Kỳ (United States)', 
    'US', 
    '🇺🇸', 
    'Santa Clara Convention Center, Silicon Valley, California, USA', 
    'STEM, AI & Sáng chế Đổi mới', 
    'open', 
    '2027-06-15', 
    'Tháng 8/2027', 
    'Hỗ trợ theo đoàn RIVA',
    'IFIA (Hiệp hội Quốc tế các Nhà Phát minh) & WIIPA',
    'Cuộc thi sáng chế hàng đầu tại trung tâm công nghệ thế giới Thung lũng Silicon, quy tụ hơn 30 quốc gia và hàng trăm tập đoàn công nghệ toàn cầu tham quan, chấm điểm.'
),
(
    'IPITEX', 
    'IPITEX 2027 - Bangkok International Intellectual Property, Invention & Technology', 
    'Thái Lan (Thailand)', 
    'TH', 
    '🇹🇭', 
    'BITEC Bangna, Bangkok, Thái Lan', 
    'Phát minh & Sáng chế Trẻ Quốc tế', 
    'open', 
    '2026-11-20', 
    'Tháng 02/2027 (Ngày Nhà Phát minh Thái Lan)', 
    'Miễn phí vé vào cổng triển lãm',
    'Hội đồng Nghiên cứu Quốc gia Thái Lan (NRCT)',
    'Một trong những sân chơi sáng chế và nghiên cứu khoa học lớn nhất khu vực Châu Á với hơn 1,000 sáng chế quốc tế mỗi năm.'
),
(
    'IENA', 
    'iENA 2027 - International Trade Fair Ideas Inventions New Products', 
    'Cộng hòa Liên bang Đức (Germany)', 
    'DE', 
    '🇩🇪', 
    'Nuremberg Exhibition Centre, Nuremberg, Đức', 
    'Thương mại hóa & Bằng độc quyền sáng chế', 
    'upcoming', 
    '2027-08-10', 
    'Tháng 10/2027', 
    'Tài trợ theo dự án xuất sắc',
    'AFAG Messen und Ausstellungen & IFIA',
    'Triển lãm sáng chế và giải pháp công nghệ lâu đời và danh giá nhất Châu Âu với hơn 70 năm lịch sử, cầu nối thương mại trực tiếp tới thị trường EU.'
),
(
    'GENEVA', 
    'Geneva Inventions 2027 - International Exhibition of Inventions of Geneva', 
    'Thụy Sĩ (Switzerland)', 
    'CH', 
    '🇨🇭', 
    'Palexpo, Geneva, Thụy Sĩ', 
    'Sáng chế Đỉnh cao Toàn cầu', 
    'open', 
    '2027-01-15', 
    'Tháng 04/2027', 
    'Theo quy chế WIPO',
    'Tổ chức Sở hữu Trí tuệ Thế giới (WIPO) & Chính phủ Thụy Sĩ',
    'Sự kiện thường niên lớn nhất thế giới dành riêng cho các phát minh, quy tụ các trường đại học, viện nghiên cứu hàng đầu hành tinh.'
)
ON CONFLICT (code) DO NOTHING;

-- Chèn Bảng vàng thành tích học sinh
INSERT INTO public.achievements (student_name, school, award, medal_type, competition, year, project_title, avatar_url)
VALUES 
('Nguyễn Minh Quân & Trần Gia Bảo', 'THPT Chuyên Hà Nội - Amsterdam', '🥇 Huy chương Vàng (Gold Medal)', 'gold', 'SVIIF Silicon Valley 2026', 2026, 'Hệ thống AI giám sát và cảnh báo sớm vi nhựa trong nguồn nước mặt', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'),
('Lê Thùy Dung & Phạm Quốc Anh', 'THPT Chuyên Lê Hồng Phong TP.HCM', '🥇 Huy chương Vàng & Best International Award', 'gold', 'iENA Nuremberg Đức 2026', 2026, 'Vật liệu nano sinh học tự phân hủy từ vỏ tôm ứng dụng trong nông nghiệp thông minh', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'),
('Vũ Hoàng Long', 'Đại học Bách Khoa Hà Nội', '🥈 Huy chương Bạc (Silver Medal)', 'silver', 'IPITEX Bangkok 2026', 2026, 'Thiết bị bay không người lái (UAV) lập bản đồ cứu hộ địa hình sạt lở', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80'),
('Đoàn NCKH Trẻ RIVA Vietnam', 'Liên trường THPT Chuyên', '🏆 04 Huy chương Vàng, 02 Giải Đặc Biệt', 'special', 'Geneva Inventions 2026', 2026, 'Chuỗi 04 đề tài giải pháp xanh và chuyển đổi số y tế', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&auto=format&fit=crop&q=80')
ON CONFLICT DO NOTHING;

-- Chèn Hồ sơ mẫu
INSERT INTO public.applications (full_name, dob, nationality, email, phone, school, city, competition_code, competition_title, project_title, project_field, project_summary, status)
VALUES 
('Nguyễn Văn A', '2008-04-12', 'Việt Nam', 'nguyenvana@gmail.com', '0912345678', 'THPT Chuyên Hà Nội - Amsterdam', 'Hà Nội', 'SVIIF', 'SVIIF 2027 - Silicon Valley USA', 'Ứng dụng IoT và AI nhận diện mầm bệnh cây lúa', 'Trí tuệ nhân tạo & Nông nghiệp', 'Giải pháp phân tích hình ảnh lá cây thời gian thực trên thiết bị drone giá rẻ, giúp nông dân phát hiện dịch hại trước 5 ngày.', 'under_review'),
('Trần Hoàng Bách', '2007-09-25', 'Việt Nam', 'bach.tran@gmail.com', '0988776655', 'THPT Chuyên Khoa Học Tự Nhiên', 'Hà Nội', 'IPITEX', 'IPITEX 2027 - Bangkok Thái Lan', 'Pin năng lượng sinh học từ vi tảo biển', 'Năng lượng xanh & Hóa học', 'Mô hình pin sinh học khai thác quang hợp của vi tảo để cấp nguồn cho cảm biến biển xa bờ.', 'approved')
ON CONFLICT DO NOTHING;
