import React from 'react';
import { X, Calendar, User, Newspaper, Quote, Share2, ArrowRight, Sparkles } from 'lucide-react';
import { ArticleBlock } from '../types';

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
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1200 }}>
      <div 
        className="modal-content"
        style={{
          maxWidth: '860px',
          maxHeight: '92vh',
          padding: '0',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: '#09153d',
          border: '1px solid rgba(117, 194, 250, 0.35)',
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(51, 102, 255, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid var(--color-border)',
          background: 'rgba(5, 13, 38, 0.85)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-gold" style={{ fontSize: '11px', fontWeight: 800 }}>
              {category}
            </span>
            {pressSource && (
              <span style={{ fontSize: '12px', color: 'var(--color-text-dim)', fontStyle: 'italic' }}>
                • {pressSource}
              </span>
            )}
          </div>

          <button 
            onClick={onClose}
            className="btn btn-sm btn-ghost"
            style={{ padding: '6px', borderRadius: '50%', color: 'white' }}
            aria-label="Đóng"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div style={{ padding: '36px 32px 48px', overflowY: 'auto' }}>
          {/* Article Header */}
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{
              fontSize: 'clamp(24px, 3.5vw, 32px)',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.3,
              marginBottom: '16px',
              fontFamily: 'var(--font-family)'
            }}>
              {title}
            </h1>

            {/* Metadata (Author, Date) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              fontSize: '13px',
              color: 'var(--color-text-muted)',
              borderBottom: '1px solid rgba(240, 242, 192, 0.14)',
              paddingBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} color="var(--color-gold-bright)" />
                <span style={{ fontWeight: 600, color: 'white' }}>{author}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} color="var(--color-sky)" />
                <span>{date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-dim)' }}>Bản tin độc quyền Viện RIVA</span>
              </div>
            </div>
          </div>

          {/* Lead Paragraph / Sa-pô Báo chí */}
          {leadParagraph && (
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: 1.75,
              color: 'var(--color-text-light)',
              fontStyle: 'italic',
              background: 'rgba(51, 102, 255, 0.1)',
              borderLeft: '4px solid var(--color-gold)',
              padding: '16px 20px',
              borderRadius: '0 12px 12px 0',
              marginBottom: '28px'
            }}>
              {leadParagraph}
            </div>
          )}

          {/* Main Cover Image */}
          {coverImage && (
            <div style={{
              marginBottom: '32px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <img 
                src={coverImage} 
                alt={title}
                style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}

          {/* Article Dynamic Content Blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {blocks.map((block) => {
              if (block.type === 'subheading') {
                return (
                  <h3 
                    key={block.id}
                    style={{
                      fontSize: '20px',
                      fontWeight: 800,
                      color: 'white',
                      marginTop: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span style={{ width: '4px', height: '20px', background: 'var(--color-gold)', borderRadius: '2px', display: 'inline-block' }} />
                    {block.text}
                  </h3>
                );
              }

              if (block.type === 'paragraph') {
                return (
                  <p 
                    key={block.id}
                    style={{
                      fontSize: '15px',
                      lineHeight: 1.8,
                      color: 'rgba(255, 255, 255, 0.92)',
                      textAlign: 'justify'
                    }}
                  >
                    {block.text}
                  </p>
                );
              }

              if (block.type === 'quote') {
                return (
                  <div 
                    key={block.id}
                    style={{
                      margin: '12px 0',
                      padding: '22px 26px',
                      background: 'radial-gradient(ellipse at top left, rgba(51, 102, 255, 0.22) 0%, rgba(9, 21, 61, 0.8) 100%)',
                      borderLeft: '4px solid var(--color-gold)',
                      borderRadius: '0 14px 14px 0',
                      position: 'relative'
                    }}
                  >
                    <Quote size={28} color="var(--color-gold)" style={{ opacity: 0.5, marginBottom: '8px' }} />
                    <p style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: 'white',
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      marginBottom: '10px'
                    }}>
                      "{block.text}"
                    </p>
                    {block.authorQuote && (
                      <div style={{ fontSize: '13px', color: 'var(--color-gold-bright)', fontWeight: 700 }}>
                        — {block.authorQuote}
                      </div>
                    )}
                  </div>
                );
              }

              if (block.type === 'image' && block.imageUrl) {
                return (
                  <div key={block.id} style={{ margin: '12px 0' }}>
                    <div style={{
                      borderRadius: '14px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
                    }}>
                      <img 
                        src={block.imageUrl} 
                        alt={block.imageCaption || 'Hình ảnh bài viết'} 
                        style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    {block.imageCaption && (
                      <div style={{
                        fontSize: '12px',
                        color: 'var(--color-text-dim)',
                        fontStyle: 'italic',
                        marginTop: '8px',
                        textAlign: 'center'
                      }}>
                        Ảnh: {block.imageCaption}
                      </div>
                    )}
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Bottom Article CTA */}
          <div style={{
            marginTop: '44px',
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.25) 0%, rgba(9, 21, 61, 0.9) 100%)',
            border: '1px solid rgba(204, 153, 0, 0.4)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'white' }}>
                Đồng hành cùng Viện Nghiên Cứu Đổi Mới Sáng Tạo RIVA
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Hỗ trợ 1-on-1 hoàn thiện đề tài NCKH, bảo hộ sở hữu trí tuệ và tranh tài quốc tế.
              </div>
            </div>

            <button 
              className="btn btn-gold"
              onClick={() => {
                onClose();
                if (onConsultClick) onConsultClick();
              }}
            >
              <Sparkles size={16} />
              <span>Đăng ký tư vấn đề tài</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
