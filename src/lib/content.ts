import type { Competition, Achievement } from '../types';

export const competitions: Competition[] = [
  {
    id: 'comp-1',
    code: 'SVIIF',
    title: 'SVIIF 2027 - Silicon Valley International Invention Festival',
    country: 'Hoa Kỳ (United States)',
    country_code: 'US',
    flag_emoji: '🇺🇸',
    location: 'Santa Clara Convention Center, Silicon Valley, CA, USA',
    category: 'STEM, AI & Sáng chế Đổi mới',
    status: 'open',
    deadline: '2027-06-15',
    event_date: 'Tháng 8/2027',
    fee: 'Hỗ trợ trọn gói đoàn RIVA',
    organizer: 'IFIA (Hiệp hội Quốc tế các Nhà Phát minh) & WIIPA',
    description: 'Cuộc thi sáng chế hàng đầu tại thủ phủ công nghệ thế giới Thung lũng Silicon. Nơi học sinh, sinh viên và nhà nghiên cứu kết nối với các quỹ đầu tư mạo hiểm và đại học danh tiếng.',
    requirements: [
      'Đề tài nghiên cứu khoa học hoặc sáng chế kỹ thuật có mô hình/nguyên mẫu',
      'Bản tóm tắt (Abstract) bằng tiếng Anh từ 300 - 500 từ',
      'Poster giới thiệu kích thước A0 tiêu chuẩn quốc tế',
      'Video thuyết trình bằng tiếng Anh thời lượng tối đa 3 phút'
    ],
    timeline: [
      { step: '01', title: 'Mở đơn sơ tuyển tại RIVA', desc: 'Thí sinh nộp đề tài và tóm tắt nghiên cứu', date: '01/01/2027' },
      { step: '02', title: 'Thẩm định & Cố vấn hoàn thiện', desc: 'Hội đồng chuyên gia RIVA đánh giá và hướng dẫn nâng cấp poster/bài thuyết trình', date: '15/04/2027' },
      { step: '03', title: 'Nộp hồ sơ chính thức cho BTC Hoa Kỳ', desc: 'Đăng ký bản quyền sở hữu trí tuệ và danh sách đoàn', date: '15/06/2027' },
      { step: '04', title: 'Tranh tài tại Silicon Valley', desc: 'Thuyết trình trước ban giám khảo quốc tế tại California', date: '12/08/2027' }
    ]
  },
  {
    id: 'comp-2',
    code: 'IPITEX',
    title: 'IPITEX 2027 - Bangkok International Intellectual Property & Technology',
    country: 'Thái Lan (Thailand)',
    country_code: 'TH',
    flag_emoji: '🇹🇭',
    location: 'BITEC Bangna, Bangkok, Thái Lan',
    category: 'Sáng chế Trẻ Quốc tế & Đổi mới sáng tạo',
    status: 'open',
    deadline: '2026-11-20',
    event_date: 'Tháng 02/2027 (Ngày Nhà Phát minh Thái Lan)',
    fee: 'Miễn phí gian hàng triển lãm',
    organizer: 'Hội đồng Nghiên cứu Quốc gia Thái Lan (NRCT)',
    description: 'Một trong những sân chơi sáng chế và nghiên cứu khoa học lớn nhất khu vực Châu Á với hơn 1,000 sáng chế quốc tế mỗi năm.',
    requirements: [
      'Dự án thuộc các lĩnh vực: Khoa học môi trường, Y sinh, Robot, Ứng dụng số',
      'Bản poster thiết kế chuẩn triển lãm quốc tế',
      'Khả năng giao tiếp tiếng Anh cơ bản'
    ]
  },
  {
    id: 'comp-3',
    code: 'IENA',
    title: 'iENA 2027 - International Trade Fair Ideas Inventions New Products',
    country: 'Cộng hòa Liên bang Đức (Germany)',
    country_code: 'DE',
    flag_emoji: '🇩🇪',
    location: 'Nuremberg Exhibition Centre, Nuremberg, Đức',
    category: 'Thương mại hóa & Bằng độc quyền sáng chế',
    status: 'upcoming',
    deadline: '2027-08-10',
    event_date: 'Tháng 10/2027',
    fee: 'Tài trợ chi phí theo đề tài xuất sắc',
    organizer: 'AFAG Messen und Ausstellungen & IFIA',
    description: 'Triển lãm sáng chế và giải pháp công nghệ lâu đời và danh giá nhất Châu Âu với hơn 70 năm lịch sử, cầu nối thương mại trực tiếp tới thị trường EU.',
    requirements: [
      'Sáng chế có tính ứng dụng công nghiệp cao hoặc giải pháp kinh tế tuần hoàn',
      'Đã hoàn thiện sản phẩm thử nghiệm hoặc bằng sáng chế cơ sở'
    ]
  },
  {
    id: 'comp-4',
    code: 'GENEVA',
    title: 'Geneva Inventions 2027 - Salon International des Inventions de Genève',
    country: 'Thụy Sĩ (Switzerland)',
    country_code: 'CH',
    flag_emoji: '🇨🇭',
    location: 'Palexpo, Geneva, Thụy Sĩ',
    category: 'Sáng chế Đỉnh cao Toàn cầu',
    status: 'open',
    deadline: '2027-01-15',
    event_date: 'Tháng 04/2027',
    fee: 'Theo quy chế Ban tổ chức Geneva & WIPO',
    organizer: 'Tổ chức Sở hữu Trí tuệ Thế giới (WIPO) & Chính phủ Thụy Sĩ',
    description: 'Sự kiện thường niên lớn nhất thế giới dành riêng cho các sáng chế, quy tụ hơn 800 nhà phát minh từ 45 quốc gia trên toàn cầu.',
    requirements: [
      'Đề tài nghiên cứu chuyên sâu, có tính đột phá',
      'Đội thi đại diện cho trường học hoặc viện nghiên cứu'
    ]
  }
];

export const achievements: Achievement[] = [
  {
    id: 'ach-1',
    student_name: 'Nguyễn Minh Quân & Trần Gia Bảo',
    school: 'THPT Chuyên Hà Nội - Amsterdam',
    award: '🥇 Huy chương Vàng (Gold Medal)',
    medal_type: 'gold',
    competition: 'SVIIF Silicon Valley 2026',
    year: 2026,
    project_title: 'Hệ thống AI giám sát và cảnh báo sớm vi nhựa trong nguồn nước mặt đô thị',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'ach-2',
    student_name: 'Lê Thùy Dung & Phạm Quốc Anh',
    school: 'THPT Chuyên Lê Hồng Phong TP.HCM',
    award: '🥇 Huy chương Vàng & Best International Award',
    medal_type: 'gold',
    competition: 'iENA Nuremberg Đức 2026',
    year: 2026,
    project_title: 'Vật liệu nano sinh học tự phân hủy từ vỏ tôm ứng dụng trong nông nghiệp thông minh',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'ach-3',
    student_name: 'Vũ Hoàng Long',
    school: 'Đại học Bách Khoa Hà Nội',
    award: '🥈 Huy chương Bạc (Silver Medal)',
    medal_type: 'silver',
    competition: 'IPITEX Bangkok 2026',
    year: 2026,
    project_title: 'Thiết bị bay không người lái (UAV) lập bản đồ cứu hộ địa hình sạt lở tự động',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'ach-4',
    student_name: 'Đoàn Học Sinh NCKH RIVA Vietnam',
    school: 'Liên trường THPT Chuyên toàn quốc',
    award: '🏆 04 Huy chương Vàng & 02 Giải Đặc Biệt WIPO',
    medal_type: 'special',
    competition: 'Geneva Inventions 2026',
    year: 2026,
    project_title: 'Chuỗi 04 đề tài giải pháp xanh và chuyển đổi số y tế cho người cao tuổi',
    avatar_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80'
  }
];
