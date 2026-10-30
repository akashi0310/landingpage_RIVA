import type { Competition, Achievement, SiteSettings, AboutArticleData, NewsArticle, ShowcaseSectionData, ShowcasePhoto, HeroBannerData } from '../types';

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
    student_name: 'Đoàn SVIIF đoạt giải',
    school: 'Đoàn đại biểu học sinh THPT Chuyên toàn quốc',
    award: '🥇 Huy chương Vàng (Gold Medal)',
    medal_type: 'gold',
    competition: 'SVIIF Silicon Valley 2026',
    year: 2026,
    project_title: 'Hệ thống AI giám sát và cảnh báo sớm vi nhựa trong nguồn nước mặt đô thị',
    avatar_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'ach-2',
    student_name: 'Đoàn iENA đoạt giải',
    school: 'Đoàn đại biểu học sinh & sinh viên Việt Nam',
    award: '🥇 Huy chương Vàng & Best International Award',
    medal_type: 'gold',
    competition: 'iENA Nuremberg Đức 2026',
    year: 2026,
    project_title: 'Vật liệu nano sinh học tự phân hủy từ vỏ tôm ứng dụng trong nông nghiệp thông minh',
    avatar_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'ach-3',
    student_name: 'Đoàn IPITEX đoạt giải',
    school: 'Đoàn nghiên cứu trẻ RIVA Việt Nam',
    award: '🥈 Huy chương Bạc (Silver Medal)',
    medal_type: 'silver',
    competition: 'IPITEX Bangkok 2026',
    year: 2026,
    project_title: 'Thiết bị bay không người lái (UAV) lập bản đồ cứu hộ địa hình sạt lở tự động',
    avatar_url: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'ach-4',
    student_name: 'Đoàn Geneva Inventions đoạt giải',
    school: 'Đoàn đại biểu sáng chế quốc gia RIVA',
    award: '🏆 04 Huy chương Vàng & 02 Giải Đặc Biệt WIPO',
    medal_type: 'special',
    competition: 'Geneva Inventions 2026',
    year: 2026,
    project_title: 'Chuỗi 04 đề tài giải pháp xanh và chuyển đổi số y tế cho người cao tuổi',
    avatar_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=80'
  }
];

export const defaultSiteSettings: SiteSettings = {
  hotline: '0988.234.567',
  hotline_secondary: '024.3856.9999',
  email: 'contact@riva.info.vn',
  email_admissions: 'admissions@riva.info.vn',
  address_hn: 'Tòa nhà RIVA Innovation, Cầu Giấy, Hà Nội',
  address_hcm: 'Văn phòng đại diện: Quận 1, TP. Hồ Chí Minh',
  org_name: 'VIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO VÀ KIỂM ĐỊNH CHẤT LƯỢNG RIVA',
  slogan: 'Kết nối tài năng Việt Nam với đấu trường khoa học & sáng tạo quốc tế'
};

export const defaultAboutArticle: AboutArticleData = {
  headline: 'KHÔNG CHỈ LÀ TỔ CHỨC THI, MÀ LÀ CẦU NỐI QUỐC TẾ',
  subheadline: 'HÀNH TRÌNH ĐƯA TRÍ TUỆ VIỆT NAM RA ĐẤU TRƯỜNG KHOA HỌC & SÁNG CHẾ TOÀN CẦU',
  press_source: 'Phóng sự Chuyên đề • Tạp chí Đổi Mới Sáng Tạo & Khoa Học Trẻ',
  author: 'Ban Biên Tập RIVA Media & Hội Đồng Cố Vấn',
  date: 'Tháng 10/2026',
  lead_paragraph: 'Viện Nghiên cứu Đổi mới Sáng tạo và Kiểm định Chất lượng (RIVA) kết nối học sinh, sinh viên và nhà nghiên cứu trẻ Việt Nam với các cuộc thi sáng chế quốc tế, hướng đến phát triển năng lực nghiên cứu, thúc đẩy trao đổi tri thức và chuyển hóa ý tưởng thành giải pháp có giá trị thực tiễn.',
  hero_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
  hero_caption: 'Đoàn thí sinh Việt Nam tự hào giương cao cờ Tổ quốc tại Lễ trao giải quốc tế SVIIF Silicon Valley, Hoa Kỳ.',
  video_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80',
  video_title: 'Phim tư liệu: Hành trình đoàn Việt Nam tại SVIIF Thung Lũng Silicon',
  metrics: [
    { val: '100%', label: 'Visa bảo lãnh đoàn', desc: 'Hỗ trợ thủ tục ngoại giao' },
    { val: '1-on-1', label: 'Cố vấn chuyên gia', desc: 'Huấn luyện chuẩn quốc tế' },
    { val: 'Top 1', label: 'Mạng lưới NCKH trẻ VN', desc: 'Đại diện tổ chức IFIA & WIIPA' }
  ],
  blocks: [
    {
      id: 'ab-1',
      type: 'subheading',
      text: '1. Sứ mệnh: Tự tin vươn ra biển lớn khoa học thế giới'
    },
    {
      id: 'ab-2',
      type: 'paragraph',
      text: 'Nghiên cứu khoa học không chỉ dành cho các giáo sư trong phòng lab kín, mà bắt đầu từ những trăn trở rất đời thường của học sinh cấp 3, sinh viên đại học. RIVA đồng hành cùng các em từ việc phát hiện vấn đề thực tiễn, định hình phương pháp nghiên cứu, chế tạo mô hình thử nghiệm đến đăng ký bảo hộ sở hữu trí tuệ.'
    },
    {
      id: 'ab-3',
      type: 'quote',
      text: 'Chúng tôi không chỉ đưa học sinh đi thi để lấy một tấm huy chương, mà xây dựng cho các em tư duy phản biện, kỹ năng thuyết trình học thuật quốc tế và bản lĩnh của những nhà khoa học tương lai.',
      authorQuote: 'GS.TS Nguyễn Văn Minh - Hội đồng Cố vấn Khoa học RIVA'
    },
    {
      id: 'ab-4',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=80',
      imageCaption: 'Buổi tập huấn thuyết trình poster và phản biện đề tài bằng tiếng Anh cùng chuyên gia quốc tế tại Hà Nội.'
    },
    {
      id: 'ab-5',
      type: 'subheading',
      text: '2. Hệ sinh thái ươm mầm toàn diện từ A đến Z'
    },
    {
      id: 'ab-6',
      type: 'paragraph',
      text: 'Mỗi dự án tham dự cùng RIVA đều được bảo trợ bởi mạng lưới đối tác chính thức gồm IFIA (Hiệp hội Quốc tế các Nhà Phát minh), WIIPA và các trường đại học hàng đầu tại Mỹ và Châu Âu. Nhờ đó, hồ sơ NCKH của thí sinh trở thành điểm tựa vàng khi săn học bổng du học Ivy League và top đại học thế giới.'
    }
  ]
};

export const defaultNewsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Đoàn học sinh Việt Nam xuất sắc lập kỷ lục tại SVIIF Thung Lũng Silicon 2026',
    date: '28/09/2026',
    category: 'KẾT QUẢ THI ĐẤU',
    author: 'Ban Tin Tức RIVA Media',
    cover_image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop&q=80',
    desc: 'Với 04 đề tài sáng tạo trong lĩnh vực AI và vật liệu mới, đoàn RIVA đã xuất sắc giành trọn 04 Huy chương Vàng và 01 Giải Đặc biệt từ WIPO.',
    published: true,
    blocks: [
      {
        id: 'n1-1',
        type: 'subheading',
        text: 'Cú đúp ngoạn mục tại thánh địa công nghệ Silicon Valley'
      },
      {
        id: 'n1-2',
        type: 'paragraph',
        text: 'Vừa qua, tại Trung tâm Hội nghị Santa Clara (California, Hoa Kỳ), Triển lãm Sáng chế Quốc tế Thung lũng Silicon (SVIIF 2026) đã chính thức khép lại. Đoàn học sinh NCKH RIVA đại diện Việt Nam đã tạo nên bất ngờ lớn khi toàn bộ 4 đề tài dự thi đều được Hội đồng Giám khảo Quốc tế trao Huy chương Vàng.'
      },
      {
        id: 'n1-3',
        type: 'quote',
        text: 'Chất lượng nghiên cứu và khả năng thuyết trình tiếng Anh tự tin của học sinh Việt Nam thực sự vượt xa kỳ vọng của ban giám khảo quốc tế năm nay.',
        authorQuote: 'Đại diện Ban Giám Khảo Quốc tế SVIIF 2026'
      },
      {
        id: 'n1-4',
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80',
        imageCaption: 'Khoảnh khắc trao giải Đặc biệt từ Tổ chức Sở hữu Trí tuệ Thế giới (WIPO) cho đề tài NCKH Việt Nam.'
      },
      {
        id: 'n1-5',
        type: 'paragraph',
        text: 'Thành tích này một lần nữa khẳng định vị thế và uy tín đào tạo cố vấn của Viện RIVA trong việc dẫn dắt các tài năng trẻ tiếp cận đấu trường học thuật thế giới.'
      }
    ]
  },
  {
    id: 'news-2',
    title: 'Khởi động chương trình ươm mầm tài năng NCKH mùa giải 2027 cùng chuyên gia quốc tế',
    date: '02/10/2026',
    category: 'ĐÀO TẠO & TẬP HUẤN',
    author: 'Phòng Tuyển sinh & Cố vấn RIVA',
    cover_image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=80',
    desc: 'Hội đồng chuyên môn RIVA chính thức mở đợt tuyển chọn học sinh, sinh viên có đam mê nghiên cứu để đồng hành huấn luyện từ tháng 10.',
    published: true,
    blocks: [
      {
        id: 'n2-1',
        type: 'paragraph',
        text: 'Để chuẩn bị cho chuỗi sự kiện khoa học quốc tế diễn ra trong năm 2027, Viện RIVA chính thức khởi động chu kỳ ươm mầm tài năng NCKH. Học sinh từ lớp 8 đến lớp 12 trên toàn quốc đều có thể đăng ký nộp ý tưởng để được hội đồng cố vấn 1-on-1.'
      },
      {
        id: 'n2-2',
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80',
        imageCaption: 'Các học viên khóa trước trao đổi trực tiếp đề tài cùng các tiến sĩ nghiên cứu tại Viện.'
      }
    ]
  },
  {
    id: 'news-3',
    title: 'Bí quyết xây dựng đề tài NCKH chuẩn quốc tế và kỹ năng trả lời ban giám khảo nước ngoài',
    date: '05/10/2026',
    category: 'CẨM NANG NGHIÊN CỨU',
    author: 'Hội Đồng Chuyên Môn RIVA',
    cover_image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&auto=format&fit=crop&q=80',
    desc: 'Chia sẻ từ các quán quân giải Vàng: Làm thế nào để trình bày ý tưởng phức tạp một cách rõ ràng, thuyết phục ban giám khảo quốc tế trong 3 phút.',
    published: true,
    blocks: [
      {
        id: 'n3-1',
        type: 'paragraph',
        text: 'Tranh tài tại các kỳ thi quốc tế đòi hỏi không chỉ đề tài xuất sắc mà còn là nghệ thuật truyền tải thông điệp. Poster chuẩn A0, slide tóm tắt súc tích và phong thái thuyết trình tự tin là chìa khóa để chinh phục giám khảo.'
      }
    ]
  }
];

export const defaultShowcaseData: ShowcaseSectionData = {
  heading: 'A TRULY GLOBAL INNOVATION PLATFORM',
  subheading: 'ĐẤU TRƯỜNG KHOA HỌC & SÁNG CHẾ QUỐC TẾ HÀNG ĐẦU',
  description: 'RIVA quy tụ các nhà sáng chế trẻ, học sinh, sinh viên và các nhóm nghiên cứu khoa học xuất sắc của Việt Nam tự tin giới thiệu những giải pháp đột phá về Trí tuệ Nhân tạo (AI), Năng lượng xanh, Y sinh và STEM ra đấu trường toàn cầu: SVIIF Thung Lũng Silicon (Mỹ), Geneva Inventions (Thụy Sĩ), iENA Nuremberg (Đức) và IPITEX Bangkok (Thái Lan). RIVA bảo trợ toàn diện từ giai đoạn hoàn thiện hồ sơ, đăng ký sở hữu trí tuệ đến tập huấn thuyết trình tiếng Anh và trực tiếp dẫn đoàn thi đấu.',
  photos: [
    {
      id: 'showcase-1',
      title: 'Lễ Trao Giải & Vinh Danh Huy Chương Vàng Quốc Tế',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
      badgeType: 'gold',
      articleId: 'news-1'
    },
    {
      id: 'showcase-2',
      title: 'Thuyết Trình Đề Tài Trước Hội Đồng Giám Khảo Quốc Tế',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
      badgeType: 'sky',
      articleId: 'news-2'
    },
    {
      id: 'showcase-3',
      title: 'Đoàn Việt Nam Gặt Hái Thành Tích Vô Địch & Cúp Đặc Biệt',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      badgeType: 'success',
      articleId: 'news-3'
    }
  ]
};

export const defaultHeroData: HeroBannerData = {
  bg_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&auto=format&fit=crop&q=85',
  bg_video: 'https://assets.mixkit.co/videos/preview/mixkit-global-technological-network-animated-loop-41584-large.mp4',
  enable_video: true,
  bg_opacity: 0.35,
  enable_embers: true,
  enable_watermark: true,
  badge_text: 'HỆ THỐNG ĐẤU TRƯỜNG SÁNG CHẾ & NCKH QUỐC TẾ • RIVA GLOBAL',
  title: 'VIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO & KIỂM ĐỊNH CHẤT LƯỢNG RIVA',
  subtitle: 'ĐƯA TÀI NĂNG VIỆT NAM RA ĐẤU TRƯỜNG QUỐC TẾ',
  location_slogan: 'Kết nối tài năng Việt Nam với đấu trường khoa học & sáng tạo quốc tế',
  primary_btn_text: 'CỔNG ĐĂNG KÝ SƠ TUYỂN ĐANG MỞ →'
};

