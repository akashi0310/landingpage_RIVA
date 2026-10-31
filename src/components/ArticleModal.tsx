import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Newspaper, 
  Quote, 
  Share2, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Check 
} from 'lucide-react';
import { ArticleBlock } from '../types';
import { sanitizeUrl } from '../lib/security';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category?: string;
  date?: string;
  author?: string;
  coverImage?: string;
  leadParagraph?: string;
  pressSource?: string;
  blocks?: ArticleBlock[];
  onConsultClick?: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  isOpen,
  onClose,
  title,
  category = 'CHUYÊN ĐỀ BÁO CHÍ',
  date = 'Tháng 10/2026',
  author = 'Ban Biên Tập RIVA',
  coverImage,
  leadParagraph,
  pressSource,
  blocks = [],
  onConsultClick
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Khóa cuộn trang nền và lắng nghe phím ESC
  useEffect(() => {
    if (!isOpen) return;

    // Lưu vị trí cuộn ban đầu và khóa cuộn body
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cuộn lên đầu bài báo khi mở
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // 2. Tính toán thanh tiến độ đọc (Reading Progress) khi người dùng cuộn nội dung
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const totalScroll = scrollHeight - clientHeight;
    if (totalScroll > 0) {
      const progress = Math.min(100, Math.max(0, (scrollTop / totalScroll) * 100));
      setScrollProgress(progress);
    }
  };

  // 3. Sao chép liên kết bài báo
  const handleCopyLink = () => {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    }
  };

  if (!isOpen) return null;

  // Tính ước lượng thời gian đọc (~200 từ/phút)
  const allText = [leadParagraph || '', ...blocks.map(b => b.text || '')].join(' ');
  const wordCount = allText.trim().split(/\s+/).filter(Boolean).length;
  const estimatedReadingTime = Math.max(2, Math.ceil(wordCount / 180));

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="article-fullscreen-reader"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        background: '#04091e',
        color: '#FFFFFF',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        animation: 'articleReaderFadeIn 0.22s ease-out'
      }}
    >
      {/* 1. STICKY TOP NAVIGATION BAR (CỐ ĐỊNH TRÊN CÙNG KHI CUỘN) */}
      <header 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(4, 9, 30, 0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(117, 194, 250, 0.22)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(16px, 3vw, 36px)',
          height: '66px',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Bên trái: Nút Quay Lại Trang Chủ + Huy hiệu chuyên mục */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <button
            onClick={onClose}
            className="btn btn-sm btn-ghost"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '999px',
              background: 'rgba(51, 102, 255, 0.15)',
              border: '1px solid rgba(117, 194, 250, 0.35)',
              color: 'white',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            title="Quay lại trang chủ (Phím ESC)"
          >
            <ArrowLeft size={16} />
            <span className="hide-on-mobile">Quay lại trang chủ</span>
            <span className="show-on-mobile">Quay lại</span>
          </button>

          <div style={{ width: '1px', height: '22px', background: 'rgba(255, 255, 255, 0.15)', flexShrink: 0 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
            <span className="badge badge-gold" style={{ fontSize: '11px', fontWeight: 800, flexShrink: 0 }}>
              {category}
            </span>
            {pressSource && (
              <span 
                className="hide-on-mobile"
                style={{ 
                  fontSize: '12px', 
                  color: 'var(--color-sky)', 
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}
              >
                • {pressSource}
              </span>
            )}
          </div>
        </div>

        {/* Ở giữa: Tiêu đề bài báo thu gọn */}
        <div 
          className="article-reader-top-title"
          style={{
            maxWidth: '480px',
            fontSize: '13px',
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.85)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            padding: '0 16px',
            textAlign: 'center'
          }}
        >
          {title}
        </div>

        {/* Bên phải: Nút Chia sẻ, Nút Tư vấn & Nút Đóng X */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Nút Sao chép liên kết */}
          <button
            onClick={handleCopyLink}
            className="btn btn-sm btn-ghost"
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              color: copied ? 'var(--color-gold-bright)' : 'var(--color-text-light)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 600,
              background: copied ? 'rgba(204, 153, 0, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: copied ? '1px solid var(--color-gold)' : '1px solid rgba(255, 255, 255, 0.1)'
            }}
            title="Sao chép liên kết bài báo"
          >
            {copied ? <Check size={14} color="var(--color-gold-bright)" /> : <Share2 size={14} />}
            <span className="hide-on-mobile">{copied ? 'Đã sao chép!' : 'Chia sẻ'}</span>
          </button>

          {/* Nút Tư vấn đề tài */}
          {onConsultClick && (
            <button
              onClick={() => {
                onClose();
                onConsultClick();
              }}
              className="btn btn-sm btn-gold hide-on-mobile"
              style={{
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 800,
                gap: '6px'
              }}
            >
              <Sparkles size={14} />
              <span>Đăng ký tư vấn</span>
            </button>
          )}

          {/* Nút Đóng bài báo */}
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'white',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            aria-label="Đóng bài báo"
            title="Đóng bài báo (ESC)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Reading Progress Indicator Bar */}
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '3px',
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #3366FF, #CC9900, #34D399)',
            boxShadow: '0 0 10px rgba(204, 153, 0, 0.6)',
            transition: 'width 0.1s linear'
          }}
        />
      </header>

      {/* 2. MAIN FULLSCREEN ARTICLE READING CONTAINER (KHU VỰC ĐỌC BÀI VIẾT) */}
      <main style={{ flex: 1, width: '100%' }}>
        <article
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            padding: '44px clamp(20px, 4vw, 40px) 90px',
            width: '100%'
          }}
        >
          {/* Header Bài Viết */}
          <header style={{ marginBottom: '32px' }}>
            {/* Tagline / Nguồn phát hành */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="badge badge-gold" style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>
                {category}
              </span>
              {pressSource && (
                <span style={{ fontSize: '13px', color: 'var(--color-sky)', fontWeight: 700 }}>
                  — {pressSource}
                </span>
              )}
            </div>

            {/* Tiêu đề chính H1 */}
            <h1 
              style={{
                fontSize: 'clamp(28px, 4.2vw, 42px)',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.3,
                marginBottom: '20px',
                letterSpacing: '-0.02em',
                fontFamily: 'var(--font-family)'
              }}
            >
              {title}
            </h1>

            {/* Metadata Bar: Tác giả, Ngày tháng, Thời gian đọc */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '18px',
                fontSize: '13px',
                color: 'var(--color-text-muted)',
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(240, 242, 192, 0.18)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-gold), #8A6400)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#050D26',
                  fontWeight: 800,
                  fontSize: '12px'
                }}>
                  <User size={14} color="#050D26" />
                </div>
                <span style={{ fontWeight: 700, color: '#FFFFFF' }}>{author}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} color="var(--color-sky)" />
                <span>{date}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} color="#34D399" />
                <span>~{estimatedReadingTime} phút đọc</span>
              </div>

              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ 
                  fontSize: '11px', 
                  color: 'var(--color-gold-bright)',
                  background: 'rgba(204, 153, 0, 0.12)',
                  border: '1px solid rgba(204, 153, 0, 0.3)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontWeight: 600
                }}>
                  Bản tin chính thức RIVA
                </span>
              </div>
            </div>
          </header>

          {/* Sa-pô Báo chí / Đoạn mở đầu nổi bật */}
          {leadParagraph && (
            <div 
              style={{
                fontSize: 'clamp(16px, 1.8vw, 18px)',
                fontWeight: 600,
                lineHeight: 1.8,
                color: '#E0E7FF',
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.14) 0%, rgba(9, 21, 61, 0.7) 100%)',
                borderLeft: '4px solid var(--color-gold)',
                padding: '22px 26px',
                borderRadius: '0 16px 16px 0',
                marginBottom: '36px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
              }}
            >
              {leadParagraph}
            </div>
          )}

          {/* Ảnh Bìa Bài Báo Toàn Cảnh (Cover Hero Image) */}
          {coverImage && (
            <figure 
              style={{
                margin: '0 0 36px 0',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(117, 194, 250, 0.25)'
              }}
            >
              <img
                src={sanitizeUrl(coverImage)}
                alt={title}
                style={{ 
                  width: '100%', 
                  maxHeight: '520px', 
                  objectFit: 'cover', 
                  display: 'block' 
                }}
              />
            </figure>
          )}

          {/* Toàn bộ các khối nội dung bài báo (Article Dynamic Blocks) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
            {blocks.map((block) => {
              // 1. Tiêu đề phụ (Subheading)
              if (block.type === 'subheading') {
                return (
                  <h2
                    key={block.id}
                    style={{
                      fontSize: 'clamp(20px, 2.5vw, 24px)',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginTop: '28px',
                      marginBottom: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <span 
                      style={{ 
                        width: '5px', 
                        height: '24px', 
                        background: 'linear-gradient(180deg, var(--color-gold-bright) 0%, var(--color-gold) 100%)', 
                        borderRadius: '3px', 
                        display: 'inline-block',
                        flexShrink: 0
                      }} 
                    />
                    <span>{block.text}</span>
                  </h2>
                );
              }

              // 2. Đoạn văn chính (Paragraph)
              if (block.type === 'paragraph') {
                return (
                  <p
                    key={block.id}
                    style={{
                      fontSize: '16.5px',
                      lineHeight: 1.88,
                      color: 'rgba(240, 244, 255, 0.94)',
                      textAlign: 'justify',
                      margin: 0
                    }}
                  >
                    {block.text}
                  </p>
                );
              }

              // 3. Trích dẫn phong cách tạp chí lớn (Pull Quote)
              if (block.type === 'quote') {
                return (
                  <blockquote
                    key={block.id}
                    style={{
                      margin: '20px 0',
                      padding: '28px 32px',
                      background: 'radial-gradient(ellipse at top left, rgba(51, 102, 255, 0.25) 0%, rgba(9, 21, 61, 0.85) 100%)',
                      borderLeft: '5px solid var(--color-gold)',
                      borderRadius: '0 18px 18px 0',
                      position: 'relative',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    <Quote 
                      size={36} 
                      color="var(--color-gold)" 
                      style={{ opacity: 0.45, marginBottom: '10px' }} 
                    />
                    <p 
                      style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        fontStyle: 'italic',
                        lineHeight: 1.7,
                        marginBottom: '12px',
                        margin: 0
                      }}
                    >
                      "{block.text}"
                    </p>
                    {block.authorQuote && (
                      <cite 
                        style={{ 
                          fontSize: '14px', 
                          color: 'var(--color-gold-bright)', 
                          fontWeight: 700,
                          display: 'block',
                          marginTop: '12px',
                          fontStyle: 'normal'
                        }}
                      >
                        — {block.authorQuote}
                      </cite>
                    )}
                  </blockquote>
                );
              }

              // 4. Hình ảnh minh họa kèm chú thích (Image with Caption)
              if (block.type === 'image' && block.imageUrl) {
                return (
                  <figure key={block.id} style={{ margin: '18px 0' }}>
                    <div 
                      style={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      <img
                        src={sanitizeUrl(block.imageUrl)}
                        alt={block.imageCaption || 'Hình ảnh tư liệu minh họa'}
                        style={{ 
                          width: '100%', 
                          maxHeight: '480px', 
                          objectFit: 'cover', 
                          display: 'block' 
                        }}
                      />
                    </div>
                    {block.imageCaption && (
                      <figcaption 
                        style={{
                          fontSize: '13px',
                          color: 'var(--color-text-dim)',
                          fontStyle: 'italic',
                          marginTop: '10px',
                          textAlign: 'center'
                        }}
                      >
                        Ảnh: {block.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              return null;
            })}
          </div>

          {/* 3. KHỐI KẾT BÀI: CALL-TO-ACTION TƯ VẤN VIỆN RIVA */}
          <section 
            style={{
              marginTop: '56px',
              padding: '36px 32px',
              background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.3) 0%, rgba(9, 21, 61, 0.95) 100%)',
              border: '1px solid rgba(204, 153, 0, 0.45)',
              borderRadius: '20px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(51, 102, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px'
            }}
          >
            <div style={{ flex: '1 1 450px' }}>
              <div className="badge badge-gold" style={{ marginBottom: '10px' }}>
                <Sparkles size={13} />
                ĐỒNG HÀNH NGHIÊN CỨU KHOA HỌC
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
                VIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO VÀ KIỂM ĐỊNH CHẤT LƯỢNG RIVA
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, margin: 0 }}>
                Cung cấp lộ trình cố vấn 1-on-1 từ khâu hình thành ý tưởng, bảo hộ sở hữu trí tuệ đến hoàn thiện đề tài và xuất quân thi đấu quốc tế an toàn, đạt giải cao.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                className="btn btn-gold btn-lg"
                onClick={() => {
                  onClose();
                  if (onConsultClick) onConsultClick();
                }}
                style={{ fontWeight: 800 }}
              >
                <Sparkles size={18} />
                <span>Đăng ký tư vấn ngay</span>
              </button>
            </div>
          </section>

          {/* 4. FOOTER QUAY LẠI TRANG CHỦ DƯỚI ĐÁY BÀI VIẾT */}
          <footer 
            style={{
              marginTop: '48px',
              paddingTop: '28px',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <button
              onClick={onClose}
              className="btn btn-ghost"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: 'white',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} />
              <span>← Quay lại trang chủ</span>
            </button>

            <div style={{ fontSize: '13px', color: 'var(--color-text-dim)' }}>
              Nhấn <kbd style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>ESC</kbd> hoặc nút quay lại để đóng bài báo
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
};
