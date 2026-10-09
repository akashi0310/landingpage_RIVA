import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  User, 
  FolderGit2, 
  Award, 
  HelpCircle, 
  CreditCard, 
  Bell, 
  Settings, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileText,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../lib/supabase';
import { Application, Competition } from '../types';

interface StudentDashboardProps {
  onBackToHome: () => void;
  competitions: Competition[];
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onBackToHome,
  competitions
}) => {
  const [activeMenu, setActiveMenu] = useState<'dashboard' | 'profile' | 'projects' | 'competitions'>('dashboard');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    full_name: 'Nguyễn Văn A',
    dob: '2008-04-12',
    nationality: 'Việt Nam',
    email: 'nguyenvana@gmail.com',
    phone: '0912345678',
    school: 'THPT Chuyên Hà Nội - Amsterdam',
    city: 'Hà Nội',
    competition_code: 'SVIIF',
    competition_title: 'SVIIF 2027 - Silicon Valley USA',
    project_title: '',
    project_field: 'Trí tuệ nhân tạo (AI) & Nông nghiệp thông minh',
    project_summary: ''
  });

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    const list = await api.getApplications();
    setApplications(list);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.project_title || !formData.project_summary) {
      alert('Vui lòng nhập tên đề tài và tóm tắt nghiên cứu!');
      return;
    }

    setLoading(true);
    try {
      const selectedComp = competitions.find(c => c.code === formData.competition_code);
      await api.submitApplication({
        ...formData,
        competition_title: selectedComp ? selectedComp.title : formData.competition_code
      });

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });

      setToastMsg('Nộp hồ sơ dự thi thành công! Hồ sơ đang ở trạng thái Chờ duyệt.');
      setTimeout(() => setToastMsg(''), 5000);

      // reset project inputs
      setFormData(prev => ({
        ...prev,
        project_title: '',
        project_summary: ''
      }));

      await loadApplications();
    } catch (err) {
      alert('Lỗi nộp hồ sơ. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const latestApp = applications[0];

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 100px)', background: '#040d1f' }}>
      {/* 1. Left Sidebar (Matching 8.png bottom middle) */}
      <aside style={{
        width: '260px',
        background: 'rgba(7, 26, 58, 0.95)',
        borderRight: '1px solid var(--color-border)',
        padding: '28px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 12px 24px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src="/logo-riva.png" 
                alt="Logo RIVA" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '0.08em', color: 'white' }}>RIVA PORTAL</div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-dim)' }}>CỔNG THÍ SINH</div>
            </div>
          </div>

          {/* Nav List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button 
              className={`btn btn-ghost ${activeMenu === 'dashboard' ? 'btn-primary' : ''}`}
              style={{ justifyContent: 'flex-start', width: '100%', padding: '12px 16px' }}
              onClick={() => setActiveMenu('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>

            <button 
              className={`btn btn-ghost ${activeMenu === 'profile' ? 'btn-primary' : ''}`}
              style={{ justifyContent: 'flex-start', width: '100%', padding: '12px 16px' }}
              onClick={() => setActiveMenu('profile')}
            >
              <User size={18} />
              <span>Hồ sơ cá nhân</span>
            </button>

            <button 
              className={`btn btn-ghost ${activeMenu === 'projects' ? 'btn-primary' : ''}`}
              style={{ justifyContent: 'flex-start', width: '100%', padding: '12px 16px' }}
              onClick={() => setActiveMenu('projects')}
            >
              <FolderGit2 size={18} />
              <span>Dự án của tôi</span>
            </button>

            <button 
              className={`btn btn-ghost ${activeMenu === 'competitions' ? 'btn-primary' : ''}`}
              style={{ justifyContent: 'flex-start', width: '100%', padding: '12px 16px' }}
              onClick={() => setActiveMenu('competitions')}
            >
              <Award size={18} />
              <span>Cuộc thi</span>
            </button>

            <button className="btn btn-ghost" style={{ justifyContent: 'flex-start', width: '100%', padding: '12px 16px' }}>
              <HelpCircle size={18} />
              <span>Tư vấn & Mentor</span>
            </button>

            <button className="btn btn-ghost" style={{ justifyContent: 'flex-start', width: '100%', padding: '12px 16px' }}>
              <CreditCard size={18} />
              <span>Thanh toán</span>
            </button>

            <button className="btn btn-ghost" style={{ justifyContent: 'flex-start', width: '100%', padding: '12px 16px' }}>
              <Bell size={18} />
              <span>Thông báo (01)</span>
            </button>

            <button className="btn btn-ghost" style={{ justifyContent: 'flex-start', width: '100%', padding: '12px 16px' }}>
              <Settings size={18} />
              <span>Cài đặt</span>
            </button>
          </div>
        </div>

        {/* Back to website button */}
        <button 
          className="btn btn-sm btn-outline" 
          onClick={onBackToHome}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          ← Quay về Trang chủ
        </button>
      </aside>

      {/* 2. Main Dashboard Area */}
      <main style={{ flex: 1, padding: '32px 36px', overflowY: 'auto' }}>
        {/* Top greeting bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: 800 }}>Xin chào, Nguyễn Văn A</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              Mã RIVA ID: <strong style={{ color: 'var(--color-gold-bright)' }}>VN-2027-8842</strong> • THPT Chuyên Hà Nội - Amsterdam
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFDE43, #F0F2C0)',
              color: '#03081c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800
            }}>
              NA
            </div>
          </div>
        </div>

        {/* Toast alert if any */}
        {toastMsg && (
          <div style={{
            padding: '14px 20px',
            background: 'var(--color-success-bg)',
            border: '1px solid var(--color-success)',
            borderRadius: '10px',
            color: '#34D399',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <CheckCircle2 size={18} />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Stat Cards (01 Cuộc thi, 02 Dự án, 01 Thông báo) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '28px' }}>
          <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(20, 110, 245, 0.15)', color: '#60A5FA' }}>
              <Award size={24} />
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: 'white' }}>01</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Cuộc thi đã tham gia</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(201, 162, 39, 0.15)', color: 'var(--color-gold-bright)' }}>
              <FolderGit2 size={24} />
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--color-gold-bright)' }}>02</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Dự án đang ươm mầm</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#34D399' }}>
              <Bell size={24} />
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#34D399' }}>01</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Thông báo quan trọng</div>
            </div>
          </div>
        </div>

        {/* Active Application Card (matching 8.png: Hồ sơ mới nhất SVIIF 2027) */}
        {latestApp && (
          <div className="glass-card" style={{
            padding: '24px 28px',
            marginBottom: '32px',
            background: 'linear-gradient(135deg, rgba(7, 26, 58, 0.9) 0%, rgba(14, 38, 85, 0.7) 100%)',
            border: '1px solid rgba(20, 110, 245, 0.35)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '14px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--color-gold-bright)', fontWeight: 700, letterSpacing: '0.06em' }}>
                  HỒ SƠ MỚI NHẤT
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white', marginTop: '4px' }}>
                  {latestApp.competition_title || latestApp.competition_code}
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--color-text-light)', marginTop: '4px' }}>
                  Đề tài: <strong>{latestApp.project_title}</strong>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                {latestApp.status === 'under_review' && (
                  <span className="badge badge-upcoming">
                    <Clock size={14} />
                    Đang chờ duyệt sơ tuyển
                  </span>
                )}
                {latestApp.status === 'approved' && (
                  <span className="badge badge-open">
                    <CheckCircle2 size={14} />
                    Đã duyệt vào đoàn chính thức
                  </span>
                )}
                {latestApp.status === 'submitted' && (
                  <span className="badge badge-blue">
                    <FileText size={14} />
                    Đã tiếp nhận hồ sơ
                  </span>
                )}
              </div>
            </div>

            {/* Progress stepper */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ fontSize: '12px', color: 'var(--color-success)', fontWeight: 600 }}>
                ✓ 1. Nộp hồ sơ
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-gold-bright)', fontWeight: 600 }}>
                ● 2. RIVA Sơ tuyển
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>
                ○ 3. Cố vấn hoàn thiện
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>
                ○ 4. Nộp BTC Quốc tế
              </div>
            </div>
          </div>
        )}

        {/* Form "Thông tin người tham gia & Đề tài" (matching 8.png form) */}
        <div className="glass-card" style={{ padding: '32px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white' }}>
              Thông tin người tham gia & Đăng ký đề tài
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Dữ liệu được lưu trữ trực tiếp vào hệ thống Supabase `applications` để hội đồng xét duyệt.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid-3" style={{ gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Họ và tên *</label>
                <input 
                  type="text" 
                  required
                  className="form-input" 
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Ngày sinh *</label>
                <input 
                  type="date" 
                  required
                  className="form-input" 
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Quốc tịch</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                />
              </div>
            </div>

            <div className="grid-3" style={{ gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input 
                  type="email" 
                  required
                  className="form-input" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Số điện thoại *</label>
                <input 
                  type="tel" 
                  required
                  className="form-input" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tỉnh / Thành phố *</label>
                <input 
                  type="text" 
                  required
                  className="form-input" 
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>

            <div className="grid-2" style={{ gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Đơn vị / Trường học *</label>
                <input 
                  type="text" 
                  required
                  className="form-input" 
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Chọn cuộc thi đăng ký *</label>
                <select 
                  className="form-select"
                  value={formData.competition_code}
                  onChange={(e) => setFormData({ ...formData, competition_code: e.target.value })}
                >
                  {competitions.map(c => (
                    <option key={c.id} value={c.code}>
                      {c.flag_emoji} {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Project Details */}
            <div className="form-group">
              <label className="form-label">Tên đề tài / Dự án nghiên cứu *</label>
              <input 
                type="text" 
                required
                className="form-input" 
                placeholder="Ví dụ: Thiết bị IoT cảnh báo sớm nguy cơ sạt lở đất ứng dụng cảm biến áp điện"
                value={formData.project_title}
                onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Lĩnh vực nghiên cứu</label>
              <input 
                type="text" 
                className="form-input" 
                value={formData.project_field}
                onChange={(e) => setFormData({ ...formData, project_field: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tóm tắt đề tài (Mục tiêu, nguyên mẫu, phương pháp) *</label>
              <textarea 
                rows={4}
                required
                className="form-textarea" 
                placeholder="Mô tả mục tiêu của đề tài, các vật liệu đã thử nghiệm, kết quả đạt được..."
                value={formData.project_summary}
                onChange={(e) => setFormData({ ...formData, project_summary: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button 
                type="submit" 
                className="btn btn-gold btn-lg"
                disabled={loading}
              >
                <Send size={18} />
                <span>{loading ? 'Đang nộp hồ sơ...' : 'NỘP HỒ SƠ DỰ THI'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
