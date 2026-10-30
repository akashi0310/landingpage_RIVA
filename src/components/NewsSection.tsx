import React, { useState, useEffect } from 'react';
import { Newspaper, Calendar, ArrowRight, User, Sparkles } from 'lucide-react';
import { api } from '../lib/supabase';
import { defaultNewsArticles } from '../lib/content';
import { NewsArticle } from '../types';
import { ArticleModal } from './ArticleModal';

export const NewsSection: React.FC<{ onConsultClick?: () => void }> = ({ onConsultClick }) => {
  const [articles, setArticles] = useState<NewsArticle[]>(defaultNewsArticles);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const list = await api.getNewsArticles();
    if (list && list.length > 0) {
      setArticles(list);
    }
  };

  return (
    <section id="news" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">
            <Newspaper size={14} />
            <span>TIN TỨC & BÁO CHÍ (NEWS & MEDIA)</span>
          </div>
          <h2 className="section-title">
            CẬP NHẬT TỪ ĐẤU TRƯỜNG KHOA HỌC QUỐC TẾ
          </h2>
          <p className="section-desc">
            Thông tin mới nhất về các sân chơi sáng chế, lịch thi đấu, phóng sự thành tích và cẩm nang nghiên cứu từ Viện RIVA.
          </p>
        </div>

        <div className="grid-3">
          {articles.map((item) => (
            <div 
              key={item.id} 
              className="glass-card glass-card-interactive"
              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '190px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={item.cover_image} 
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
                <span className="badge badge-gold" style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '10px', fontWeight: 800 }}>
                  {item.category}
                </span>
              </div>

              <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--color-text-dim)', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} color="var(--color-sky)" />
                      <span>{item.date}</span>
                    </div>
                    {item.author && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <User size={13} color="var(--color-gold-bright)" />
                        <span>{item.author}</span>
                      </div>
                    )}
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: 800, lineHeight: 1.4, marginBottom: '10px', color: 'white' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--color-border)' }}>
                  <button 
                    className="btn btn-sm btn-ghost" 
                    style={{ padding: 0, color: 'var(--color-sky)', gap: '6px', fontWeight: 700 }}
                    onClick={() => setSelectedArticle(item)}
                  >
                    <span>Đọc chi tiết bài báo</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Article Reading Modal */}
      {selectedArticle && (
        <ArticleModal 
          isOpen={Boolean(selectedArticle)}
          onClose={() => setSelectedArticle(null)}
          title={selectedArticle.title}
          category={selectedArticle.category}
          date={selectedArticle.date}
          author={selectedArticle.author || 'Ban Biên Tập RIVA'}
          coverImage={selectedArticle.cover_image}
          leadParagraph={selectedArticle.desc}
          blocks={selectedArticle.blocks || []}
          onConsultClick={onConsultClick}
        />
      )}
    </section>
  );
};
