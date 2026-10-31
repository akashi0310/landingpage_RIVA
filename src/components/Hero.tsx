import React, { useState, useEffect } from 'react';
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
import { ArticleModal } from './ArticleModal';
import { defaultShowcaseData, defaultHeroData, defaultNewsArticles } from '../lib/content';
import { api } from '../lib/supabase';
import { ShowcaseSectionData, HeroBannerData, NewsArticle, ShowcasePhoto } from '../types';

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
  const [showcaseData, setShowcaseData] = useState<ShowcaseSectionData>(() => {
    try {
      const saved = localStorage.getItem('riva_showcase_data');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return defaultShowcaseData;
  });

  const [heroData, setHeroData] = useState<HeroBannerData>(() => {
    try {
      const saved = localStorage.getItem('riva_hero_data');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return defaultHeroData;
  });

  // Danh sách bài báo & bài đang được chọn để đọc chi tiết
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(defaultNewsArticles);
  const [selectedArticleForModal, setSelectedArticleForModal] = useState<NewsArticle | null>(null);

  const loadArticles = async () => {
    try {
      const list = await api.getNewsArticles();
      if (list && list.length > 0) setNewsArticles(list);
    } catch (e) { }
  };

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem('riva_showcase_data');
        if (saved) setShowcaseData(JSON.parse(saved));
      } catch (e) { }
    };
    const handleHeroUpdate = () => {
      try {
        const saved = localStorage.getItem('riva_hero_data');
        if (saved) setHeroData(JSON.parse(saved));
      } catch (e) { }
    };
    window.addEventListener('riva_showcase_updated', handleUpdate);
    window.addEventListener('riva_hero_updated', handleHeroUpdate);
    window.addEventListener('riva_news_updated', loadArticles);
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('storage', handleHeroUpdate);
    window.addEventListener('storage', loadArticles);
    loadArticles();
    return () => {
      window.removeEventListener('riva_showcase_updated', handleUpdate);
      window.removeEventListener('riva_hero_updated', handleHeroUpdate);
      window.removeEventListener('riva_news_updated', loadArticles);
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('storage', handleHeroUpdate);
      window.removeEventListener('storage', loadArticles);
    };
  }, []);

  // Lắng nghe sự kiện Back trên trình duyệt để đóng modal mà không bị out web
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (!hash.startsWith('#article-')) {
        setSelectedArticleForModal(null);
      }
      if (hash !== '#video') {
        setShowVideoModal(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenVideoModal = () => {
    setShowVideoModal(true);
    window.history.pushState({ modal: 'video', source: 'hero' }, '', '#video');
  };

  const handleCloseVideoModal = () => {
    if (window.location.hash === '#video') {
      window.history.back();
    } else {
      setShowVideoModal(false);
    }
  };

  const handleCloseArticleModal = () => {
    if (window.location.hash.startsWith('#article-')) {
      window.history.back();
    } else {
      setSelectedArticleForModal(null);
    }
  };

  const handlePhotoClick = (photo: ShowcasePhoto) => {
    // 1. Tìm bài báo theo articleId
    let target = photo.articleId ? newsArticles.find(a => a.id === photo.articleId) : undefined;

    // 2. Fallback: tìm theo tiêu đề bài báo gần giống
    if (!target) {
      target = newsArticles.find(a =>
        a.title.toLowerCase().includes(photo.title.toLowerCase()) ||
        photo.title.toLowerCase().includes(a.title.toLowerCase())
      );
    }

    // 3. Fallback: nếu chưa có, tạo cấu trúc bài báo hoàn chỉnh từ ảnh để người đọc xem trọn vẹn
    if (!target) {
      target = {
        id: photo.id,
        title: photo.title,
        category: photo.badgeType === 'gold' ? 'VINH DANH QUỐC TẾ' : photo.badgeType === 'sky' ? 'ĐẤU TRƯỜNG TOÀN CẦU' : 'BẢO TRỢ ĐỔI MỚI SÁNG TẠO',
        date: 'Tháng 10/2026',
        author: 'Ban Tin Tức & Phóng Sự RIVA Media',
        cover_image: photo.imageUrl,
        desc: `Phóng sự toàn cảnh: ${photo.title}. Hành trình của đoàn đại biểu sáng chế và nghiên cứu khoa học trẻ Việt Nam tại các đấu trường uy tín thế giới.`,
        blocks: [
          {
            id: 'sh-b1',
            type: 'subheading',
            text: photo.title
          },
          {
            id: 'sh-b2',
            type: 'paragraph',
            text: 'Viện Nghiên cứu Đổi mới Sáng tạo và Kiểm định Chất lượng (RIVA) vinh dự bảo trợ toàn diện cho các đoàn thí sinh Việt Nam tham dự chuỗi triển lãm sáng chế và hội nghị khoa học quốc tế thường niên tại Hoa Kỳ (SVIIF Thung Lũng Silicon), Thụy Sĩ (Geneva Inventions), CHLB Đức (iENA Nuremberg) và Thái Lan (IPITEX Bangkok).'
          },
          {
            id: 'sh-b3',
            type: 'image',
            imageUrl: photo.imageUrl,
            imageCaption: photo.title
          },
          {
            id: 'sh-b4',
            type: 'quote',
            text: 'Sự tự tin và tính ứng dụng thực tiễn của các đề tài NCKH Việt Nam luôn nhận được đánh giá rất cao từ Hội đồng Giám khảo Quốc tế và các hiệp hội phát minh toàn cầu.',
            authorQuote: 'Đại diện Ban Cố vấn Viện RIVA'
          }
        ],
        published: true
      };
    }

    setSelectedArticleForModal(target);
    window.history.pushState({ modal: 'article', articleId: target.id }, '', `#article-${target.id}`);
  };

  return (
    <>
      {/* ====================================================================
          1. SVIIF-INSPIRED FULL-BLEED CINEMATIC HERO (VIDEO & PHOTO BACKGROUND)
          ==================================================================== */}
      <section className="sviif-hero-wrapper" id="hero-cinematic">
        {/* High-res image fallback / poster for instant loading */}
        <div
          className="sviif-hero-img-fallback"
          style={{
            backgroundImage: `url('${heroData.bg_image || defaultHeroData.bg_image}')`,
            opacity: heroData.bg_opacity ?? 0.35
          }}
        />

        {/* Ambient video background */}
        {heroData.enable_video && heroData.bg_video && (
          <video
            className="sviif-hero-video"
            autoPlay
            loop
            muted
            playsInline
            poster={heroData.bg_image || defaultHeroData.bg_image}
            style={{ opacity: (heroData.bg_opacity ?? 0.35) * 1.1 }}
          >
            <source
              src={heroData.bg_video}
              type="video/mp4"
            />
          </video>
        )}

        {/* Deep cinematic gradient overlay */}
        <div className="sviif-hero-overlay" />

        {/* Golden spinning watermark gear / crest behind title (matching SVIIF) */}
        {(heroData.enable_watermark ?? true) && <div className="sviif-watermark" />}

        {/* Floating golden ember particle sparks */}
        {(heroData.enable_embers ?? true) && (
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
        )}

        {/* Hero Center Presentation Content */}
        <div className="sviif-hero-container">
          {/* Institutional Accreditation Pill */}
          <div className="sviif-hero-badge">
            <Sparkles size={14} color="#CC9900" />
            <span>{heroData.badge_text || 'HỆ THỐNG ĐẤU TRƯỜNG SÁNG CHẾ & NCKH QUỐC TẾ • RIVA GLOBAL'}</span>
          </div>

          {/* Grand SVIIF-Style Gold Title (Cinzel Serif) */}
          <h1 className="sviif-hero-title">
            {heroData.title || 'VIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO VÀ KIỂM ĐỊNH CHẤT LƯỢNG RIVA'}
          </h1>

          {/* Headline lớn: Đấu Trường Quốc Tế */}
          <div className="sviif-hero-sub">
            {heroData.subtitle || 'ĐƯA TÀI NĂNG VIỆT NAM RA ĐẤU TRƯỜNG QUỐC TẾ'}
          </div>

          {/* Slogan chính thống */}
          <div className="sviif-hero-location">
            {heroData.location_slogan || 'Kết nối tài năng Việt Nam với đấu trường khoa học & sáng tạo quốc tế'}
          </div>

          {/* Action Button Group */}
          <div className="sviif-hero-actions">
            {/* SVIIF Iconic White/Gold Pill Button */}
            <button
              type="button"
              className="sviif-btn-pill-primary"
              onClick={onRegisterClick}
            >
              <span>{heroData.primary_btn_text || 'CỔNG ĐĂNG KÝ SƠ TUYỂN ĐANG MỞ →'}</span>
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
              onClick={handleOpenVideoModal}
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
            {showcaseData.heading}
          </h2>

          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <span style={{
              fontSize: '14px',
              fontWeight: 800,
              color: 'var(--color-sky-bright)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              {showcaseData.subheading}
            </span>
          </div>

          {/* SVIIF-style Narrative Introduction */}
          <p className="sviif-global-desc">
            {showcaseData.description}
          </p>

          {/* 3-Photo Festival Live Showcase Grid (Dynamic from Admin) */}
          <div className="sviif-live-gallery">
            {showcaseData.photos.map((photo) => (
              <div
                key={photo.id}
                className="sviif-gallery-card"
                onClick={() => handlePhotoClick(photo)}
                title={`Bấm để đọc bài báo chi tiết: ${photo.title}`}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="sviif-gallery-img"
                  onError={(e) => {
                    // Fallback image if custom url fails
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                {/* Visual hover indicator to read full article */}
                <div className="sviif-gallery-read-hint">
                  <span>Đọc bài báo chi tiết</span>
                  <ArrowRight size={13} />
                </div>

                <div className="sviif-gallery-caption">
                  {photo.badgeType === 'gold' && <Award size={18} color="#CC9900" />}
                  {photo.badgeType === 'sky' && <Globe2 size={18} color="#75C2FA" />}
                  {photo.badgeType === 'success' && <ShieldCheck size={18} color="#34D399" />}
                  <span>{photo.title}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Digital World Map & Flight Network Explorer */}
          <div id="competitions" className="sviif-map-container">
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
        <div className="modal-overlay" onClick={handleCloseVideoModal}>
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
                onClick={handleCloseVideoModal}
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
                📍 Silicon Valley, California, USA • Bản quyền tư liệu thuộc VIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO VÀ KIỂM ĐỊNH CHẤT LƯỢNG RIVA
              </div>
              <button
                type="button"
                className="btn btn-sm btn-gold"
                onClick={() => {
                  handleCloseVideoModal();
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

      {/* Selected Article Reading Modal (Mở trực tiếp toàn bộ nội dung bài báo khi bấm vào ảnh sân khấu & triển lãm) */}
      {selectedArticleForModal && (
        <ArticleModal
          isOpen={Boolean(selectedArticleForModal)}
          onClose={handleCloseArticleModal}
          title={selectedArticleForModal.title}
          category={selectedArticleForModal.category}
          date={selectedArticleForModal.date}
          author={selectedArticleForModal.author}
          coverImage={selectedArticleForModal.cover_image}
          leadParagraph={selectedArticleForModal.desc}
          blocks={selectedArticleForModal.blocks}
          onConsultClick={() => {
            handleCloseArticleModal();
            onRegisterClick();
          }}
        />
      )}
    </>
  );
};
