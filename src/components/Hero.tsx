import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Play,
  X,
  Award,
  CheckCircle2,
  Users,
  TrendingUp,
  ShieldCheck,
  Globe2,
  ExternalLink
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
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <>
      {/* ====================================================================
          1. SVIIF-INSPIRED FULL-BLEED CINEMATIC HERO (VIDEO & PHOTO BACKGROUND)
          ==================================================================== */}
      <section className="sviif-hero-wrapper" id="hero-cinematic">
        {/* High-res image fallback / poster for instant loading */}
        <div className="sviif-hero-img-fallback" />

        {/* Ambient video background */}
        <video
          className="sviif-hero-video"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&auto=format&fit=crop&q=85"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-global-technological-network-animated-loop-41584-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Deep cinematic gradient overlay */}
        <div className="sviif-hero-overlay" />

        {/* Golden spinning watermark gear / crest behind title (matching SVIIF) */}
        <div className="sviif-watermark" />

        {/* Floating golden ember particle sparks */}
        <div className="sviif-embers" aria-hidden="true">
          {[
            { top: '15%', left: '12%', size: 4, duration: 8, delay: 0 },
            { top: '35%', left: '22%', size: 3, duration: 11, delay: 2 },
            { top: '55%', left: '8%', size: 5, duration: 9, delay: 4 },
            { top: '75%', left: '18%', size: 3, duration: 12, delay: 1 },
            { top: '20%', right: '14%', size: 4, duration: 10, delay: 3 },
            { top: '45%', right: '20%', size: 3, duration: 7, delay: 5 },
            { top: '68%', right: '10%', size: 5, duration: 13, delay: 2 },
            { top: '85%', right: '25%', size: 4, duration: 9, delay: 4 },
            { top: '10%', left: '48%', size: 3, duration: 14, delay: 1 },
            { top: '60%', left: '52%', size: 4, duration: 8, delay: 3 }
          ].map((dot, i) => (
            <span
              key={i}
              className="sviif-ember-dot"
              style={{
                top: dot.top,
                left: dot.left,
                right: dot.right,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                animationDuration: `${dot.duration}s`,
                animationDelay: `${dot.delay}s`
              }}
            />
          ))}
        </div>

        {/* Hero Center Presentation Content */}
        <div className="sviif-hero-container">
          {/* Institutional Accreditation Pill */}
          <div className="sviif-hero-badge">
            <Sparkles size={14} color="#CC9900" />
            <span>HỆ THỐNG ĐẤU TRƯỜNG SÁNG CHẾ & NCKH QUỐC TẾ • RIVA GLOBAL</span>
          </div>

          {/* Grand SVIIF-Style Gold Title (Cinzel Serif) */}
          <h1 className="sviif-hero-title">
            VIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO & KIỂM ĐỊNH CHẤT LƯỢNG RIVA
          </h1>

          {/* Bold Clean Sub-header (Like SVIIF: Inventions, Artificial Intelligence & Future Technologies) */}
          <div className="sviif-hero-sub">
            Sáng chế, Trí tuệ Nhân tạo & Các Công nghệ Tương lai
          </div>

          {/* Location & Global Hubs (Like SVIIF: Silicon Valley, California, USA) */}
          <div className="sviif-hero-location">
            Thung lũng Silicon (Mỹ) • Geneva (Thụy Sĩ) • Nuremberg (Đức) • Bangkok (Thái Lan)
          </div>

          {/* Season / Dates (Like SVIIF: August 6-8, 2027) */}
          <div className="sviif-hero-date">
            MÙA GIẢI TUYỂN CHỌN & DẪN ĐOÀN THI ĐẤU QUỐC TẾ 2026 – 2027
          </div>

          {/* Action Button Group */}
          <div className="sviif-hero-actions">
            {/* SVIIF Iconic White/Gold Pill Button */}
            <button
              type="button"
              className="sviif-btn-pill-primary"
              onClick={onRegisterClick}
            >
              <span>CỔNG ĐĂNG KÝ SƠ TUYỂN ĐANG MỞ →</span>
            </button>

            {/* Explore Competitions Button */}
            <button
              type="button"
              className="sviif-btn-pill-secondary"
              onClick={onExploreClick}
            >
              <Compass size={17} />
              <span>KHÁM PHÁ CÁC ĐẤU TRƯỜNG</span>
            </button>

            {/* Watch Film Button */}
            <button
              type="button"
              className="sviif-btn-pill-secondary"
              onClick={() => setShowVideoModal(true)}
              style={{ background: 'rgba(204, 153, 0, 0.18)', borderColor: 'rgba(204, 153, 0, 0.5)' }}
            >
              <Play size={16} fill="#CC9900" color="#CC9900" />
              <span style={{ color: '#F0F2C0' }}>XEM PHIM PHÓNG SỰ</span>
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. A TRULY GLOBAL INNOVATION PLATFORM (DIRECTLY MATCHING SVIIF SECTION 2)
          ==================================================================== */}
      <section className="sviif-global-section">
        <div className="container">
          {/* Section Heading in Gold Cinzel Serif */}
          <h2 className="sviif-global-heading">
            A TRULY GLOBAL INNOVATION PLATFORM
          </h2>

          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <span style={{
              fontSize: '14px',
              fontWeight: 800,
              color: 'var(--color-sky-bright)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              ĐẤU TRƯỜNG KHOA HỌC & SÁNG CHẾ QUỐC TẾ HÀNG ĐẦU
            </span>
          </div>

          {/* SVIIF-style Narrative Introduction */}
          <p className="sviif-global-desc">
            RIVA quy tụ các nhà sáng chế trẻ, học sinh, sinh viên và các nhóm nghiên cứu khoa học xuất sắc của Việt Nam tự tin giới thiệu những giải pháp đột phá về <strong>Trí tuệ Nhân tạo (AI), Năng lượng xanh, Y sinh và STEM</strong> ra đấu trường toàn cầu: <strong>SVIIF Thung Lũng Silicon (Mỹ), Geneva Inventions (Thụy Sĩ), iENA Nuremberg (Đức) và IPITEX Bangkok (Thái Lan)</strong>. RIVA bảo trợ toàn diện từ giai đoạn hoàn thiện hồ sơ, đăng ký sở hữu trí tuệ đến tập huấn thuyết trình tiếng Anh và trực tiếp dẫn đoàn thi đấu.
          </p>

          {/* 3-Photo Festival Live Showcase Grid (Matching SVIIF 3 real photos) */}
          <div className="sviif-live-gallery">
            <div className="sviif-gallery-card">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80"
                alt="Lễ trao giải sân khấu quốc tế"
                className="sviif-gallery-img"
              />
              <div className="sviif-gallery-caption">
                <Award size={18} color="#CC9900" />
                <span>Lễ Trao Giải & Vinh Danh Huy Chương Vàng Quốc Tế</span>
              </div>
            </div>

            <div className="sviif-gallery-card">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80"
                alt="Ban giám khảo phỏng vấn tại gian hàng triển lãm"
                className="sviif-gallery-img"
              />
              <div className="sviif-gallery-caption">
                <Globe2 size={18} color="#75C2FA" />
                <span>Thuyết Trình Đề Tài Trước Hội Đồng Giám Khảo Quốc Tế</span>
              </div>
            </div>

            <div className="sviif-gallery-card">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
                alt="Đoàn Việt Nam rạng rỡ cờ đỏ sao vàng"
                className="sviif-gallery-img"
              />
              <div className="sviif-gallery-caption">
                <ShieldCheck size={18} color="#34D399" />
                <span>Đoàn Việt Nam Gặt Hái Thành Tích Vô Địch & Cúp Đặc Biệt</span>
              </div>
            </div>
          </div>

          {/* Digital World Map & Flight Network Explorer */}
          <div className="sviif-map-container">
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-gold)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                BẢN ĐỒ SỐ ĐIỀU PHỐI QUỐC TẾ
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'white' }}>
                HÀNH TRÌNH TỪ VIỆT NAM VƯƠN RA THẾ GIỚI
              </h3>
            </div>

            <InteractiveWorldMap onSelectCompetition={onSelectCompetition} />
          </div>

          {/* Quick Trust Highlights Metric Grid */}
          <div className="hero-metrics-grid" style={{ marginTop: '40px' }}>
            <div className="glass-card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(204, 153, 0, 0.16)', color: 'var(--color-gold)' }}>
                <Award size={22} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-gold)' }}>350+</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Huy chương & Giải quốc tế</div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(51, 102, 255, 0.28)', color: 'var(--color-sky)' }}>
                <TrendingUp size={22} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-sky)' }}>98.4%</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Đoàn RIVA đạt giải xuất sắc</div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.16)', color: '#34D399' }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#34D399' }}>18+</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Tổ chức quốc tế bảo trợ</div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(240, 242, 192, 0.12)', color: 'var(--color-cream)' }}>
                <Users size={22} />
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-cream)' }}>1,200+</div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Học sinh & Sinh viên tham gia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          CINEMATIC VIDEO DOCUMENTARY MODAL
          ==================================================================== */}
      {showVideoModal && (
        <div className="modal-overlay" onClick={() => setShowVideoModal(false)}>
          <div
            className="modal-content"
            style={{ maxWidth: '960px', padding: '24px', background: '#00004D', border: '1px solid rgba(204, 153, 0, 0.45)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Play size={20} color="#CC9900" />
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white' }}>
                  Phim Tư Liệu: Hành Trình Đoàn Việt Nam Tại SVIIF Thung Lũng Silicon
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                style={{ background: 'none', border: 'none', color: '#9cc1fa', cursor: 'pointer', padding: '4px' }}
                aria-label="Đóng video"
              >
                <X size={24} />
              </button>
            </div>

            {/* Video Frame Container */}
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', background: '#000' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
                title="RIVA Documentary Film"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer Caption */}
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ fontSize: '13px', color: 'var(--color-text-light)' }}>
                📍 Silicon Valley, California, USA • Bản quyền tư liệu thuộc VIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO & KIỂM ĐỊNH CHẤT LƯỢNG RIVA
              </div>
              <button
                type="button"
                className="btn btn-sm btn-gold"
                onClick={() => {
                  setShowVideoModal(false);
                  onRegisterClick();
                }}
              >
                <span>Đăng ký tham gia ngay</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
