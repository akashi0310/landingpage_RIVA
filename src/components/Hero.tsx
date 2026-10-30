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
import { InteractiveWorldMap } from './InteractiveWorldMap';

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

        {/* Visual: Glowing Digital World Map with Animated Data Connections & Extensible Auto-arcs */}
        <InteractiveWorldMap onSelectCompetition={onSelectCompetition} />

        {/* Quick Trust Highlights Metric Grid */}
        <div className="hero-metrics-grid">
          <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(204, 153, 0, 0.16)', color: 'var(--color-gold)' }}>
              <Award size={22} />
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-gold)' }}>350+</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Huy chương & Giải quốc tế</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(51, 102, 255, 0.28)', color: 'var(--color-sky)' }}>
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
