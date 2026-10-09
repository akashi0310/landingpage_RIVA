import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Globe2, 
  Cpu, 
  GraduationCap, 
  Target,
  ArrowRight
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="about" style={{ padding: '90px 0', background: 'rgba(3, 10, 23, 0.4)' }}>
      <div className="container">
        {/* Top Header */}
        <div className="section-header">
          <div className="section-label">
            <Sparkles size={14} />
            <span>VỀ RIVA (ABOUT US)</span>
          </div>
          <h2 className="section-title">
            KHÔNG CHỈ LÀ TỔ CHỨC THI, MÀ LÀ CẦU NỐI QUỐC TẾ
          </h2>
          <p className="section-desc">
            RIVA là Viện Nghiên Cứu Đổi Mới Sáng Tạo hàng đầu Việt Nam, hỗ trợ toàn diện từ giai đoạn hình thành ý tưởng, 
            nghiên cứu thực nghiệm, bảo hộ sáng chế đến dẫn đoàn tranh tài tại các triển lãm danh giá nhất thế giới.
          </p>
        </div>

        {/* 2 Columns: Visual Showcase & Core Pillars */}
        <div className="grid-2" style={{ alignItems: 'center', gap: '48px' }}>
          {/* Left: Video & Media Showcase (as in 8.png About RIVA card) */}
          <div className="glass-card" style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{
              height: '340px',
              position: 'relative',
              backgroundImage: 'url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(7, 26, 58, 0.4) 0%, rgba(3, 10, 23, 0.85) 100%)'
              }} />

              {/* Play Button */}
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFDE43, #F0F2C0)',
                  border: 'none',
                  color: '#03081c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 0 30px var(--color-gold-glow)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <Play size={28} fill="#03081c" style={{ marginLeft: '4px' }} />
              </button>

              {/* Bottom Caption on Video */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '20px',
                right: '20px',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'white' }}>
                    Phim tư liệu: Hành trình đoàn Việt Nam tại SVIIF Thung Lũng Silicon
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-gold-bright)' }}>
                    Thời lượng: 03:45 • Phụ đề Tiếng Anh & Tiếng Việt
                  </div>
                </div>
                <span className="badge badge-gold">HD 4K</span>
              </div>
            </div>

            <div style={{ padding: '20px 24px', background: 'rgba(7, 21, 69, 0.95)' }}>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-around', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-gold-bright)' }}>100%</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Visa bảo lãnh đoàn</div>
                </div>
                <div style={{ width: '1px', background: 'var(--color-border)' }} />
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-sky)' }}>1-on-1</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Cố vấn cùng chuyên gia</div>
                </div>
                <div style={{ width: '1px', background: 'var(--color-border)' }} />
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#34D399' }}>Top 1</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Mạng lưới NCKH trẻ VN</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Core Missions & Ecosystem (Slide 3 & 8) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(201, 162, 39, 0.15)', color: 'var(--color-gold-bright)' }}>
                  <Target size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '6px', color: 'white' }}>
                    Sứ mệnh: Đưa trí tuệ Việt Nam ra thế giới
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    Giúp học sinh và sinh viên Việt Nam tự tin đứng trên các bục vinh quang quốc tế, khẳng định năng lực tư duy sáng tạo 
                    và nghiên cứu khoa học ngang tầm với bạn bè năm châu.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(19, 59, 190, 0.28)', color: 'var(--color-sky)' }}>
                  <Cpu size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '6px', color: 'white' }}>
                    Chương trình RIVA Innovation Mentoring
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    Đội ngũ cố vấn gồm các tiến sĩ, thạc sĩ tốt nghiệp từ Mỹ, Châu Âu trực tiếp hướng dẫn phương pháp NCKH chuẩn quốc tế, 
                    viết Abstract, lập trình mô hình và thiết kế Poster A0.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#34D399' }}>
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '6px', color: 'white' }}>
                    Bệ phóng Học bổng & Du học Toàn cầu
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    Các giải thưởng tại SVIIF, IPITEX, iENA là bằng chứng xác thực nhất về năng lực học thuật và tính độc bản (originality), 
                    giúp học sinh RIVA trúng tuyển vào các đại học Top 50 thế giới với học bổng lên tới 100%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
