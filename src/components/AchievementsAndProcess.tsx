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
    <section id="process" style={{ padding: '90px 0' }}>
      <div className="container">
        {/* Section 1: Big Numbers Stats */}
        <div id="achievements" className="glass-card" style={{
          padding: '48px 36px',
          marginBottom: '80px',
          background: 'radial-gradient(ellipse at center, rgba(19, 59, 190, 0.4) 0%, rgba(3, 8, 28, 0.96) 100%)',
          border: '1px solid rgba(255, 222, 67, 0.4)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
            <div className="badge badge-gold" style={{ marginBottom: '12px' }}>
              <Award size={13} />
              THÀNH TỰU RIVA
            </div>
            <h2 className="section-title" style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px' }}>
              TẦM VÓC QUỐC GIA TRÊN BẢN ĐỒ SÁNG TẠO
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '15px' }}>
              Hơn một thập kỷ đồng hành cùng các tài năng trẻ Việt Nam chinh phục các đỉnh cao khoa học thế giới.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '20px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '42px', fontWeight: 900, color: 'var(--color-gold-bright)', lineHeight: 1 }}>18+</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginTop: '10px' }}>Quốc gia</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Mạng lưới tổ chức liên kết</div>
            </div>

            <div>
              <div style={{ fontSize: '42px', fontWeight: 900, color: 'var(--color-sky)', lineHeight: 1 }}>28+</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginTop: '10px' }}>Cuộc thi</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Sân chơi quốc tế hàng năm</div>
            </div>

            <div>
              <div style={{ fontSize: '42px', fontWeight: 900, color: 'var(--color-gold-bright)', lineHeight: 1 }}>1,200+</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginTop: '10px' }}>Dự án</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Được ươm mầm & cố vấn</div>
            </div>

            <div>
              <div style={{ fontSize: '42px', fontWeight: 900, color: '#34D399', lineHeight: 1 }}>350+</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginTop: '10px' }}>Huy chương</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>HCV, HCB, Giải đặc biệt WIPO</div>
            </div>

            <div>
              <div style={{ fontSize: '42px', fontWeight: 900, color: '#F472B6', lineHeight: 1 }}>45+</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginTop: '10px' }}>Đoàn Quốc Gia</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Xuất cảnh thi đấu an toàn</div>
            </div>
          </div>
        </div>

        {/* Section 2: 7-Step Participation Process (Slide 11) */}
        <div>
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
