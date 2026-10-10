import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Compass,
  MapPin,
  Award,
  CheckCircle2,
  Users,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onRegisterClick: () => void;
  onSelectCompetition: (code: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onRegisterClick,
  onSelectCompetition
}) => {
  return (
    <section className="hero-wrapper">
      <div className="hero-glow-bg" />

      <div className="container hero-content">
        {/* Institutional Pill Tagline */}
        <div className="hero-tagline">
          <Sparkles size={15} />
          <span>HỆ SINH THÁI SỐ TOÀN DIỆN V1 — RIVA GLOBAL PLATFORM</span>
        </div>

        {/* Big Impact Headline */}
        <h1 className="hero-title">
          <span className="hero-title-primary">TỪ ĐAM MÊ NGHIÊN CỨU</span>
          <span className="hero-title-gradient">ĐẾN KHÁT VỌNG VƯƠN TẦM QUỐC TẾ</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-desc">
          RIVA kết nối học sinh, sinh viên và các nhà nghiên cứu trẻ mang trí tuệ Việt Nam ra các sân chơi sáng tạo,
          STEM và nghiên cứu khoa học uy tín nhất hành tinh (SVIIF Thung Lũng Silicon, IPITEX Bangkok, iENA Đức, Geneva Thụy Sĩ).
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-group">
          <button
            className="btn btn-lg btn-gold"
            onClick={onExploreClick}
          >
            <Compass size={18} />
            <span>KHÁM PHÁ CUỘC THI</span>
          </button>

          <button
            className="btn btn-lg btn-primary"
            onClick={onRegisterClick}
          >
            <span>ĐĂNG KÝ TƯ VẤN</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Visual: Glowing Digital World Map with Animated Data Connections */}
        <div className="digital-map-container">
          <svg className="digital-map-svg" viewBox="0 0 1000 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="mapArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFDE43" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#75C2FA" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#133BBE" stopOpacity="0.8" />
              </linearGradient>

              <radialGradient id="vietnamGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFDE43" stopOpacity="1" />
                <stop offset="60%" stopColor="#FFDE43" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFDE43" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Subtle Tech Coordinate Grid */}
            <g opacity="0.14" stroke="#75C2FA" strokeWidth="0.5">
              <line x1="50" y1="70" x2="950" y2="70" />
              <line x1="50" y1="140" x2="950" y2="140" />
              <line x1="50" y1="210" x2="950" y2="210" />
              <line x1="50" y1="280" x2="950" y2="280" />
              <line x1="50" y1="350" x2="950" y2="350" />

              <line x1="200" y1="20" x2="200" y2="400" />
              <line x1="400" y1="20" x2="400" y2="400" />
              <line x1="600" y1="20" x2="600" y2="400" />
              <line x1="800" y1="20" x2="800" y2="400" />
            </g>

            {/* Stylized Continents Outlines */}
            {/* North America */}
            <path d="M 120 90 Q 180 80 230 110 T 260 170 Q 240 210 200 220 T 150 170 Z" fill="rgba(19, 59, 190, 0.25)" stroke="rgba(117, 194, 250, 0.45)" strokeWidth="1" />
            {/* South America */}
            <path d="M 230 240 Q 280 270 270 330 T 220 370 Q 200 320 210 270 Z" fill="rgba(19, 59, 190, 0.18)" stroke="rgba(117, 194, 250, 0.35)" strokeWidth="1" />
            {/* Europe */}
            <path d="M 460 90 Q 530 80 550 130 T 510 160 Q 460 160 450 120 Z" fill="rgba(19, 59, 190, 0.28)" stroke="rgba(117, 194, 250, 0.5)" strokeWidth="1" />
            {/* Africa */}
            <path d="M 470 170 Q 540 180 550 250 T 500 330 Q 460 270 460 210 Z" fill="rgba(19, 59, 190, 0.15)" stroke="rgba(117, 194, 250, 0.3)" strokeWidth="1" />
            {/* Asia & Pacific */}
            <path d="M 580 80 Q 750 70 820 130 T 780 230 Q 700 240 650 170 T 570 120 Z" fill="rgba(19, 59, 190, 0.26)" stroke="rgba(117, 194, 250, 0.45)" strokeWidth="1" />
            {/* Australia */}
            <path d="M 760 270 Q 840 280 830 340 T 760 350 Z" fill="rgba(19, 59, 190, 0.18)" stroke="rgba(117, 194, 250, 0.35)" strokeWidth="1" />

            {/* Connecting Global Flight Arcs from Vietnam (x: 710, y: 215) */}
            {/* Arc to USA Silicon Valley (x: 180, y: 130) */}
            <path
              className="connection-arc"
              d="M 710 215 C 600 60, 300 40, 180 130"
              stroke="url(#mapArcGradient)"
              strokeWidth="2.5"
              fill="none"
            />

            {/* Arc to Germany iENA (x: 505, y: 120) */}
            <path
              className="connection-arc"
              d="M 710 215 C 640 140, 560 110, 505 120"
              stroke="url(#mapArcGradient)"
              strokeWidth="2"
              fill="none"
            />

            {/* Arc to Switzerland Geneva (x: 485, y: 135) */}
            <path
              className="connection-arc"
              d="M 710 215 C 630 160, 540 130, 485 135"
              stroke="url(#mapArcGradient)"
              strokeWidth="1.8"
              fill="none"
            />

            {/* Arc to Thailand Bangkok (x: 690, y: 225) */}
            <path
              className="connection-arc"
              d="M 710 215 Q 700 220 690 225"
              stroke="#FFDE43"
              strokeWidth="2.5"
              fill="none"
            />

            {/* Nodes */}
            {/* USA Silicon Valley Node */}
            <circle cx="180" cy="130" r="7" fill="#75C2FA" />
            <circle cx="180" cy="130" r="14" fill="none" stroke="#75C2FA" strokeWidth="1.5" className="pulse-node" />

            {/* Germany Nuremberg Node */}
            <circle cx="505" cy="120" r="6" fill="#75C2FA" />
            <circle cx="505" cy="120" r="12" fill="none" stroke="#75C2FA" strokeWidth="1" className="pulse-node" />

            {/* Switzerland Geneva Node */}
            <circle cx="485" cy="135" r="6" fill="#75C2FA" />
            <circle cx="485" cy="135" r="12" fill="none" stroke="#75C2FA" strokeWidth="1" className="pulse-node" />

            {/* Thailand Bangkok Node */}
            <circle cx="690" cy="225" r="6" fill="#FFDE43" />

            {/* VIETNAM HUB NODE (GOLD GLOWING) */}
            <circle cx="710" cy="215" r="24" fill="url(#vietnamGlow)" />
            <circle cx="710" cy="215" r="8" fill="#FFDE43" />
            <circle cx="710" cy="215" r="16" fill="none" stroke="#FFDE43" strokeWidth="2" className="pulse-node" />
          </svg>

          {/* Floating Location Badges */}
          {/* Vietnam Hub */}
          <div
            className="map-floating-tag"
            style={{
              bottom: '24px',
              right: '24%',
              borderColor: 'var(--color-gold)',
              background: 'rgba(7, 21, 69, 0.95)'
            }}
          >
            <span style={{ fontSize: '16px' }}>🇻🇳</span>
            <div>
              <div style={{ color: 'var(--color-gold-bright)', fontSize: '11px', fontWeight: 800 }}>RIVA VIETNAM</div>
              <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Trung tâm điều phối quốc gia</div>
            </div>
          </div>

          {/* SVIIF USA */}
          <div
            className="map-floating-tag"
            onClick={() => onSelectCompetition('SVIIF')}
            style={{
              top: '20px',
              left: '12%',
              cursor: 'pointer',
              borderColor: 'var(--color-sky)',
              background: 'rgba(7, 21, 69, 0.94)'
            }}
          >
            <span style={{ fontSize: '16px' }}>🇺🇸</span>
            <div>
              <div style={{ color: 'var(--color-sky-bright)', fontSize: '11px', fontWeight: 800 }}>SVIIF 2027 • SILICON VALLEY</div>
              <div style={{ fontSize: '10px', color: 'var(--color-success)' }}>🟢 Đang mở đơn sơ tuyển</div>
            </div>
          </div>

          {/* iENA Germany */}
          <div
            className="map-floating-tag"
            onClick={() => onSelectCompetition('IENA')}
            style={{
              top: '20px',
              left: '46%',
              cursor: 'pointer',
              background: 'rgba(7, 21, 69, 0.94)',
              borderColor: 'rgba(255, 222, 67, 0.4)'
            }}
          >
            <span style={{ fontSize: '16px' }}>🇩🇪</span>
            <div>
              <div style={{ color: 'var(--color-cream)', fontSize: '11px', fontWeight: 800 }}>iENA 2027 • ĐỨC</div>
              <div style={{ fontSize: '10px', color: 'var(--color-warning)' }}>🟡 Sắp mở đơn</div>
            </div>
          </div>

          {/* IPITEX Bangkok */}
          <div
            className="map-floating-tag"
            onClick={() => onSelectCompetition('IPITEX')}
            style={{
              bottom: '24px',
              left: '48%',
              cursor: 'pointer',
              background: 'rgba(7, 21, 69, 0.94)',
              borderColor: 'var(--color-sky)'
            }}
          >
            <span style={{ fontSize: '16px' }}>🇹🇭</span>
            <div>
              <div style={{ color: 'var(--color-cream)', fontSize: '11px', fontWeight: 800 }}>IPITEX 2027 • BANGKOK</div>
              <div style={{ fontSize: '10px', color: 'var(--color-success)' }}>🟢 Đang mở đơn</div>
            </div>
          </div>
        </div>

        {/* Quick Trust Highlights Metric Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginTop: '36px',
          textAlign: 'left'
        }}>
          <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(255, 222, 67, 0.16)', color: 'var(--color-gold)' }}>
              <Award size={22} />
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-gold)' }}>350+</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Huy chương & Giải quốc tế</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(19, 59, 190, 0.28)', color: 'var(--color-sky)' }}>
              <TrendingUp size={22} />
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-sky)' }}>98.4%</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Đoàn RIVA đạt giải xuất sắc</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.16)', color: '#34D399' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#34D399' }}>18+</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Tổ chức quốc tế bảo trợ</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(240, 242, 192, 0.12)', color: 'var(--color-cream)' }}>
              <Users size={22} />
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-cream)' }}>1,200+</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Học sinh & Sinh viên tham gia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
