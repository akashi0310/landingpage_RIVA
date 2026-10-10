import React from 'react';
import { Sparkles, Mail, Phone, MapPin, Globe, Shield, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#020712',
      borderTop: '1px solid var(--color-border)',
      padding: '70px 0 30px',
      color: 'var(--color-text-muted)'
    }}>
      <div className="container">
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={`${import.meta.env.BASE_URL}logo-riva.png`}
                  alt="Logo RIVA" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 10px rgba(255, 222, 67, 0.4))'
                  }}
                />
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '0.12em', color: 'white' }}>
                  R I V A
                </div>
                <div style={{ fontSize: '10px', color: 'var(--color-gold-bright)', fontWeight: 700, letterSpacing: '0.06em' }}>
                  VIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO
                </div>
              </div>
            </div>

            <p style={{ fontSize: '13px', lineHeight: 1.7, maxWidth: '340px', marginBottom: '20px' }}>
              Tổ chức đại diện quốc gia kết nối các tài năng sáng tạo, STEM và nghiên cứu khoa học trẻ Việt Nam 
              với các sân chơi học thuật danh giá nhất hành tinh.
            </p>

            <div style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>
              Được bảo trợ bởi IFIA, WIIPA, WIPO Partner Networks.
            </div>
          </div>

          {/* Col 2: Cuộc thi tiêu biểu */}
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Cuộc thi Quốc tế
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li><a href="#competitions">🇺🇸 SVIIF Silicon Valley</a></li>
              <li><a href="#competitions">🇩🇪 iENA Nuremberg</a></li>
              <li><a href="#competitions">🇨🇭 Geneva Inventions</a></li>
              <li><a href="#competitions">🇹🇭 IPITEX Bangkok</a></li>
              <li><a href="#competitions">🇰🇷 Seoul Invention Fair</a></li>
            </ul>
          </div>

          {/* Col 3: Dịch vụ & Đào tạo */}
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Hệ sinh thái
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li><a href="#about">RIVA Innovation Mentoring</a></li>
              <li><a href="#about">Ươm mầm tài năng STEM</a></li>
              <li><a href="#process">Quy trình nộp đề tài</a></li>
              <li><a href="#stories">Bảng vàng thành tích</a></li>
              <li><a href="#register-lead">Đăng ký tư vấn 1-on-1</a></li>
            </ul>
          </div>

          {/* Col 4: Liên hệ & Trụ sở */}
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'white', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Thông tin liên hệ
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={16} color="var(--color-gold-bright)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Trụ sở chính: Tòa nhà RIVA Innovation, Cầu Giấy, Hà Nội</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={16} color="#60A5FA" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Văn phòng đại diện: Quận 1, TP. Hồ Chí Minh</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={16} color="var(--color-gold-bright)" />
                <span>contact@riva.global • admissions@riva.global</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={16} color="var(--color-gold-bright)" />
                <span style={{ color: 'white', fontWeight: 700 }}>0988.xxx.xxx / 024.xxxx.xxxx</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '12px'
        }}>
          <div>
            © 2026 - 2027 RIVA Innovation Research Institute. Toàn bộ bản quyền được bảo lưu.
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#privacy">Chính sách bảo mật dữ liệu</a>
            <a href="#terms">Điều khoản sử dụng</a>
            <button 
              onClick={scrollToTop} 
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-light)',
                padding: '4px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <ArrowUp size={12} />
              <span>Lên đầu trang</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
