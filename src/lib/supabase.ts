import { createClient } from '@supabase/supabase-js';
import { Competition, Lead, Application, Achievement, ApplicationStatus } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('your-project-id')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial Seed Data for local testing and fallback
const INITIAL_COMPETITIONS: Competition[] = [
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

const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-001',
    full_name: 'Nguyễn Văn A',
    dob: '2008-04-12',
    nationality: 'Việt Nam',
    email: 'nguyenvana@gmail.com',
    phone: '0912345678',
    school: 'THPT Chuyên Hà Nội - Amsterdam',
    city: 'Hà Nội',
    competition_code: 'SVIIF',
    competition_title: 'SVIIF 2027 - Silicon Valley USA',
    project_title: 'Hệ thống IoT và AI giám sát phát hiện dịch bệnh lúa sớm',
    project_field: 'Trí tuệ nhân tạo (AI) & Nông nghiệp thông minh',
    project_summary: 'Mô hình phân tích hình ảnh đa phổ kết hợp camera gắn trên drone siêu nhẹ, giúp phát hiện đốm nâu và rầy nâu trước 5 ngày so với mắt thường.',
    status: 'under_review',
    created_at: '2026-10-05T09:30:00Z'
  },
  {
    id: 'app-002',
    full_name: 'Trần Hoàng Bách',
    dob: '2007-09-25',
    nationality: 'Việt Nam',
    email: 'bach.tran@gmail.com',
    phone: '0988776655',
    school: 'THPT Chuyên Khoa Học Tự Nhiên',
    city: 'Hà Nội',
    competition_code: 'IPITEX',
    competition_title: 'IPITEX 2027 - Bangkok Thái Lan',
    project_title: 'Pin nhiên liệu sinh học quang hợp từ vi tảo biển',
    project_field: 'Năng lượng xanh & Công nghệ sinh học',
    project_summary: 'Sử dụng tế bào quang điện sinh học (BPV) từ vi tảo ven bờ để cung cấp điện áp thấp cho các phao cứu hộ quan trắc biển xa bờ.',
    status: 'approved',
    created_at: '2026-10-02T14:15:00Z'
  },
  {
    id: 'app-003',
    full_name: 'Lê Minh Khôi',
    dob: '2008-11-03',
    nationality: 'Việt Nam',
    email: 'minhkhoi.le@gmail.com',
    phone: '0903334455',
    school: 'THPT Chuyên Lê Hồng Phong TP.HCM',
    city: 'TP. Hồ Chí Minh',
    competition_code: 'IENA',
    competition_title: 'iENA 2027 - Nuremberg Đức',
    project_title: 'Vật liệu Aerogel siêu nhẹ cách nhiệt từ bã mía tái chế',
    project_field: 'Vật liệu mới & Kinh tế tuần hoàn',
    project_summary: 'Chế tạo aerogel sinh học từ cellulose bã mía có hệ số dẫn nhiệt cực thấp, ứng dụng bọc đường ống công nghiệp và vật liệu xây dựng xanh.',
    status: 'submitted',
    created_at: '2026-10-07T11:20:00Z'
  }
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
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

// Local Storage Helper
function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('Failed to save to localStorage:', err);
  }
}

// Data Service API
export const api = {
  // 1. Competitions
  async getCompetitions(): Promise<Competition[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('competitions').select('*').order('deadline', { ascending: true });
        if (!error && data && data.length > 0) return data as Competition[];
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local:', err);
      }
    }
    return getStorageItem<Competition[]>('riva_competitions', INITIAL_COMPETITIONS);
  },

  async saveCompetition(comp: Competition): Promise<Competition[]> {
    let list = await this.getCompetitions();
    const index = list.findIndex(c => c.id === comp.id || c.code === comp.code);
    if (index >= 0) {
      list[index] = comp;
    } else {
      list.push({ ...comp, id: comp.id || `comp-${Date.now()}` });
    }
    setStorageItem('riva_competitions', list);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('competitions').upsert(comp);
      } catch (e) {
        console.error('Supabase upsert error:', e);
      }
    }
    return list;
  },

  async deleteCompetition(id: string): Promise<Competition[]> {
    let list = await this.getCompetitions();
    list = list.filter(c => c.id !== id);
    setStorageItem('riva_competitions', list);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('competitions').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase delete error:', e);
      }
    }
    return list;
  },

  // 2. Leads (Consultation Form)
  async submitLead(lead: Lead): Promise<{ success: boolean; message: string }> {
    const newLead = { ...lead, id: `lead-${Date.now()}`, created_at: new Date().toISOString() };
    const leads = getStorageItem<Lead[]>('riva_leads', []);
    leads.unshift(newLead);
    setStorageItem('riva_leads', leads);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('leads').insert([lead]);
        if (error) throw error;
      } catch (err) {
        console.warn('Supabase lead insert error:', err);
      }
    }
    return { success: true, message: 'Đăng ký tư vấn thành công! Chuyên viên RIVA sẽ liên hệ trong 24h.' };
  },

  // 3. Applications
  async getApplications(): Promise<Application[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('applications').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data as Application[];
      } catch (err) {
        console.warn('Supabase applications fetch failed:', err);
      }
    }
    return getStorageItem<Application[]>('riva_applications', INITIAL_APPLICATIONS);
  },

  async submitApplication(app: Omit<Application, 'id' | 'created_at' | 'status'>): Promise<Application> {
    const newApp: Application = {
      ...app,
      id: `app-${Date.now().toString().slice(-4)}`,
      status: 'under_review',
      created_at: new Date().toISOString()
    };
    const list = await this.getApplications();
    list.unshift(newApp);
    setStorageItem('riva_applications', list);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('applications').insert([newApp]);
      } catch (err) {
        console.warn('Supabase submit app error:', err);
      }
    }
    return newApp;
  },

  async updateApplicationStatus(id: string, status: ApplicationStatus, notes?: string): Promise<Application[]> {
    const list = await this.getApplications();
    const target = list.find(a => a.id === id);
    if (target) {
      target.status = status;
      if (notes) target.admin_notes = notes;
    }
    setStorageItem('riva_applications', list);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('applications').update({ status, admin_notes: notes }).eq('id', id);
      } catch (err) {
        console.warn('Supabase status update error:', err);
      }
    }
    return list;
  },

  // 4. Achievements
  async getAchievements(): Promise<Achievement[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('achievements').select('*');
        if (!error && data && data.length > 0) return data as Achievement[];
      } catch (err) {
        console.warn('Supabase achievements fetch failed:', err);
      }
    }
    return INITIAL_ACHIEVEMENTS;
  }
};
