import React from 'react';
import { 
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
    <section id="process" className="achievements-process-section" style={{ padding: '70px 0' }}>
      <div className="container">
        {/* 7-Step Participation Process (Slide 11 - Quy trình) */}
        <div>
          <div className="section-header">
            <div className="section-label">
              <Sparkles size={14} />
              <span>LỘ TRÌNH CHUẨN HÓA</span>
            </div>
            <h2 className="section-title">
              QUY TRÌNH THAM DỰ
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
