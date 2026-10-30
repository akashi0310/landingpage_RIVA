import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Globe2, 
  Cpu, 
  GraduationCap, 
  Target,
  ArrowRight,
  Newspaper,
  BookOpen,
  Quote
} from 'lucide-react';
import { api } from '../lib/supabase';
import { defaultAboutArticle } from '../lib/content';
import { AboutArticleData } from '../types';
import { ArticleModal } from './ArticleModal';

export const AboutSection: React.FC<{ onConsultClick?: () => void }> = ({ onConsultClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [aboutData, setAboutData] = useState<AboutArticleData>(defaultAboutArticle);
  const [showFullArticle, setShowFullArticle] = useState(false);

  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = async () => {
    const data = await api.getAboutArticle();
    setAboutData(data);
  };

  return (
    <section id="about" style={{ padding: '52px 0 80px', background: 'rgba(5, 13, 38, 0.5)' }}>
      <div className="container">
        {/* Top Header with Newspaper / Editorial Badge */}
        <div className="section-header" style={{ marginBottom: '36px' }}>
          <div className="section-label">
            <Newspaper size={14} />
            <span>{aboutData.press_source || 'CHUYÊN ĐỀ PHÓNG SỰ BÁO CHÍ • VỀ RIVA'}</span>
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3.8vw, 36px)', lineHeight: 1.25 }}>
            {aboutData.headline}
          </h2>
          <p className="section-desc" style={{ maxWidth: '820px' }}>
            {aboutData.lead_paragraph}
          </p>
        </div>

        {/* Newspaper Style 2-Column Grid */}
        <div className="grid-2" style={{ alignItems: 'flex-start', gap: '36px' }}>
          {/* Left Column: Visual Showcase (Video & Photo Feature) */}
          <div className="glass-card" style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{
              height: 'clamp(230px, 35vw, 350px)',
              position: 'relative',
              backgroundImage: `url("${aboutData.hero_image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80'}")`,
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
                background: 'linear-gradient(180deg, rgba(9, 21, 61, 0.35) 0%, rgba(5, 13, 38, 0.88) 100%)'
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
                  background: 'linear-gradient(135deg, #CC9900, #F0F2C0)',
                  border: 'none',
                  color: '#050d26',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 0 30px var(--color-gold-glow)',
                  transition: 'transform 0.2s ease'
                }}
                aria-label="Phát video phóng sự"
              >
                <Play size={28} fill="#050d26" style={{ marginLeft: '4px' }} />
              </button>

              {/* Bottom Caption on Media */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '20px',
                right: '20px',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'white' }}>
                    {aboutData.video_title || 'Phim tư liệu: Hành trình đoàn Việt Nam tại SVIIF Thung Lũng Silicon'}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-gold-bright)' }}>
                    {aboutData.hero_caption || 'Thời lượng: 03:45 • Phụ đề Song ngữ Anh - Việt'}
                  </div>
                </div>
                <span className="badge badge-gold" style={{ flexShrink: 0 }}>HD 4K</span>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="about-video-metrics">
              <div className="about-video-metrics-inner">
                {aboutData.metrics && aboutData.metrics.length > 0 ? (
                  aboutData.metrics.map((m, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <div className="metrics-divider" />}
                      <div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: idx === 0 ? 'var(--color-gold-bright)' : idx === 1 ? 'var(--color-sky)' : '#34D399' }}>
                          {m.val}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                          {m.label}
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-gold-bright)' }}>100%</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Visa bảo lãnh đoàn</div>
                    </div>
                    <div className="metrics-divider" />
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-sky)' }}>1-on-1</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Cố vấn cùng chuyên gia</div>
                    </div>
                    <div className="metrics-divider" />
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#34D399' }}>Top 1</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Mạng lưới NCKH trẻ VN</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Journalism Cards & Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Editorial Feature Card */}
            <div className="glass-card" style={{ padding: '24px 26px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(204, 153, 0, 0.16)', color: 'var(--color-gold-bright)', flexShrink: 0 }}>
                  <Target size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '6px', color: 'white' }}>
                    Sứ mệnh: Đưa trí tuệ Việt Nam ra thế giới
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                    Giúp học sinh và sinh viên Việt Nam tự tin đứng trên các bục vinh quang quốc tế, khẳng định năng lực tư duy sáng tạo 
                    và nghiên cứu khoa học ngang tầm với bạn bè năm châu.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '24px 26px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(51, 102, 255, 0.25)', color: 'var(--color-sky)', flexShrink: 0 }}>
                  <Cpu size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '6px', color: 'white' }}>
                    Chương trình RIVA Innovation Mentoring
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                    Đội ngũ cố vấn gồm các tiến sĩ, thạc sĩ trực tiếp hướng dẫn phương pháp NCKH chuẩn quốc tế, 
                    viết Abstract tiếng Anh, lập trình mô hình và thiết kế Poster triển lãm A0.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '24px 26px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.16)', color: '#34D399', flexShrink: 0 }}>
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '6px', color: 'white' }}>
                    Bệ phóng Học bổng & Du học Toàn cầu
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                    Giải thưởng tại SVIIF, IPITEX, iENA là bằng chứng xác thực nhất về năng lực học thuật độc bản, 
                    giúp thí sinh RIVA săn học bổng du học Mỹ và các đại học hàng đầu thế giới.
                  </p>
                </div>
              </div>
            </div>

            {/* Read Full Newspaper Article CTA Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(51, 102, 255, 0.2) 0%, rgba(204, 153, 0, 0.15) 100%)',
              border: '1px solid rgba(204, 153, 0, 0.35)',
              marginTop: '4px'
            }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'white' }}>
                  Đọc toàn bộ bài báo phóng sự về Viện RIVA
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  {aboutData.subheadline || 'Hành trình 10 năm kết nối tài năng nghiên cứu khoa học trẻ'}
                </div>
              </div>

              <button 
                className="btn btn-sm btn-gold"
                onClick={() => setShowFullArticle(true)}
                style={{ gap: '6px' }}
              >
                <BookOpen size={15} />
                <span>Xem chi tiết</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Newspaper Article Reader Modal */}
      <ArticleModal 
        isOpen={showFullArticle}
        onClose={() => setShowFullArticle(false)}
        title={aboutData.headline}
        category={aboutData.press_source || 'PHÓNG SỰ ĐẶC BIỆT'}
        date={aboutData.date}
        author={aboutData.author}
        coverImage={aboutData.hero_image}
        leadParagraph={aboutData.lead_paragraph}
        pressSource={aboutData.press_source}
        blocks={aboutData.blocks}
        onConsultClick={onConsultClick}
      />
    </section>
  );
};
