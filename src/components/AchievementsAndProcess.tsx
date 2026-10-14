import React from 'react';
import { 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  FileCheck, 
  Compass, 
  FolderPlus, 
  Send, 
  UserCheck2, 
  Plane, 
  GraduationCap,
  ArrowRight
} from 'lucide-react';

interface AchievementsAndProcessProps {
  onStartProcess: () => void;
}

export const AchievementsAndProcess: React.FC<AchievementsAndProcessProps> = ({
  onStartProcess
}) => {
  const steps = [
    { num: '01', title: 'Đăng ký tư vấn', subtitle: 'Thông tin liên hệ', desc: 'Để lại thông tin để RIVA liên hệ và tìm hiểu nhu cầu', icon: Compass },
    { num: '02', title: 'Chọn cuộc thi', subtitle: 'Mỹ, Đức, Thụy Sĩ...', desc: 'Lựa chọn đấu trường phù hợp độ tuổi & chuyên ngành', icon: FolderPlus },
    { num: '03', title: 'Tạo hồ sơ dự án', subtitle: 'Ý tưởng & Đề tài', desc: 'Khai báo tên đề tài, tóm tắt và mô hình nghiên cứu', icon: FileCheck },
    { num: '04', title: 'Nộp hồ sơ sơ tuyển', subtitle: 'Thẩm định hồ sơ', desc: 'Chuyên viên hướng dẫn chuẩn bị và gửi hồ sơ sơ tuyển', icon: Send },
    { num: '05', title: 'RIVA Cố vấn', subtitle: 'Nâng cấp Poster & Video', desc: 'Hội đồng chuyên gia tập huấn kỹ năng thuyết trình', icon: UserCheck2 },
    { num: '06', title: 'Tranh tài quốc tế', subtitle: 'On-site hoặc Hybrid', desc: 'Tham gia triển lãm, chấm thi trước ban giám khảo thế giới', icon: Plane },
    { num: '07', title: 'Vinh danh & Trao giải', subtitle: 'Huy chương & Chứng nhận', desc: 'Nhận bằng khen quốc tế, mở rộng cơ hội học bổng', icon: GraduationCap }
  ];

  return (
    <section className="achievements-process-section" style={{ padding: '60px 0' }}>
      <div className="container">
        {/* Section 1: Big Numbers Stats (Thành tích) */}
        <div id="achievements" className="glass-card" style={{
          padding: '44px 32px',
          marginBottom: '70px',
          background: 'radial-gradient(ellipse at center, rgba(19, 59, 190, 0.4) 0%, rgba(3, 8, 28, 0.96) 100%)',
          border: '1px solid rgba(255, 222, 67, 0.4)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
            <div className="badge badge-gold" style={{ marginBottom: '12px' }}>
              <Award size={13} />
              THÀNH TỰU RIVA
            </div>
            <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 800, marginBottom: '12px' }}>
              TẦM VÓC QUỐC GIA TRÊN BẢN ĐỒ SÁNG TẠO
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '15px' }}>
              Hơn một thập kỷ đồng hành cùng các tài năng trẻ Việt Nam chinh phục các đỉnh cao khoa học thế giới.
            </p>
          </div>

          <div className="achievements-metrics-grid">
            <div className="metric-item">
              <div className="metric-number" style={{ color: 'var(--color-gold-bright)' }}>18+</div>
              <div className="metric-label">Quốc gia</div>
              <div className="metric-sub">Mạng lưới tổ chức liên kết</div>
            </div>

            <div className="metric-item">
              <div className="metric-number" style={{ color: 'var(--color-sky)' }}>28+</div>
              <div className="metric-label">Cuộc thi</div>
              <div className="metric-sub">Sân chơi quốc tế hàng năm</div>
            </div>

            <div className="metric-item">
              <div className="metric-number" style={{ color: 'var(--color-gold-bright)' }}>1,200+</div>
              <div className="metric-label">Dự án</div>
              <div className="metric-sub">Được ươm mầm & cố vấn</div>
            </div>

            <div className="metric-item">
              <div className="metric-number" style={{ color: '#34D399' }}>350+</div>
              <div className="metric-label">Huy chương</div>
              <div className="metric-sub">HCV, HCB, Giải đặc biệt WIPO</div>
            </div>

            <div className="metric-item">
              <div className="metric-number" style={{ color: '#F472B6' }}>45+</div>
              <div className="metric-label">Đoàn Quốc Gia</div>
              <div className="metric-sub">Xuất cảnh thi đấu an toàn</div>
            </div>
          </div>
        </div>

        {/* Section 2: 7-Step Participation Process (Slide 11 - Quy trình) */}
        <div id="process">
          <div className="section-header">
            <div className="section-label">
              <Sparkles size={14} />
              <span>LỘ TRÌNH CHUẨN HÓA</span>
            </div>
            <h2 className="section-title">
              QUY TRÌNH THAM DỰ TINH GỌN & CHUYÊN NGHIỆP
            </h2>
            <p className="section-desc">
              Hệ thống 7 bước khép kín từ khâu tiếp nhận ý tưởng đến khi vinh danh trên bục trao giải quốc tế.
            </p>
          </div>

          <div className="timeline-stepper">
            {steps.map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className="step-card">
                  <div className="step-number">{st.num}</div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px', color: '#60A5FA' }}>
                    <Icon size={20} />
                  </div>
                  <div className="step-title">{st.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-gold-bright)', fontWeight: 600, marginBottom: '4px' }}>
                    {st.subtitle}
                  </div>
                  <div className="step-desc">{st.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Quick CTA below Timeline */}
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button 
              className="btn btn-lg btn-gold"
              onClick={onStartProcess}
            >
              <span>BẮT ĐẦU ĐĂNG KÝ NGAY HÔM NAY</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
