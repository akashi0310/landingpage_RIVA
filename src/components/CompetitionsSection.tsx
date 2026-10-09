import React from 'react';
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Award,
  Clock
} from 'lucide-react';
import { Competition } from '../types';

interface CompetitionsSectionProps {
  competitions: Competition[];
  onSelectCompetition: (code: string) => void;
  onApplyCompetition: (code: string) => void;
}

export const CompetitionsSection: React.FC<CompetitionsSectionProps> = ({
  competitions,
  onSelectCompetition,
  onApplyCompetition
}) => {
  return (
    <section id="competitions" style={{ padding: '90px 0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <Sparkles size={14} />
            <span>CƠ HỘI ĐANG MỞ (CMS-DRIVEN)</span>
          </div>
          <h2 className="section-title">
            CÁC ĐẤU TRƯỜNG KHOA HỌC & SÁNG CHẾ QUỐC TẾ
          </h2>
          <p className="section-desc">
            Dữ liệu được cập nhật theo thời gian thực từ hệ thống ban tổ chức quốc tế. RIVA bảo trợ và hướng dẫn chuẩn bị từ A-Z.
          </p>
        </div>

        {/* Competitions Card Grid */}
        <div className="grid-3">
          {competitions.map((comp) => {
            const isOpen = comp.status === 'open';
            const isUpcoming = comp.status === 'upcoming';

            return (
              <div 
                key={comp.id} 
                className="glass-card glass-card-interactive"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  position: 'relative',
                  borderTop: isOpen ? '3px solid var(--color-primary)' : '3px solid var(--color-gold)'
                }}
              >
                {/* Card Top Banner / Country Header */}
                <div style={{
                  padding: '24px 24px 16px',
                  background: 'linear-gradient(180deg, rgba(19, 59, 190, 0.22) 0%, transparent 100%)',
                  borderBottom: '1px solid rgba(240, 242, 192, 0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '28px' }}>{comp.flag_emoji}</span>
                      <div>
                        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          Quốc gia
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>
                          {comp.country}
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    {isOpen && (
                      <span className="badge badge-open">
                        <span className="pulse-dot" />
                        ĐANG MỞ
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="badge badge-upcoming">
                        <span className="pulse-dot" />
                        SẮP MỞ
                      </span>
                    )}
                    {!isOpen && !isUpcoming && (
                      <span className="badge badge-closed">ĐÃ ĐÓNG</span>
                    )}
                  </div>

                  {/* Competition Title */}
                  <h3 style={{ fontSize: '19px', fontWeight: 800, lineHeight: 1.35, minHeight: '52px', color: 'white' }}>
                    {comp.title}
                  </h3>
                </div>

                {/* Card Body */}
                <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6, minHeight: '62px' }}>
                    {comp.description.slice(0, 130)}...
                  </p>

                  <div style={{ height: '1px', background: 'var(--color-border)' }} />

                  {/* Key Info Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-light)' }}>
                      <MapPin size={16} color="var(--color-sky)" />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {comp.location}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-light)' }}>
                      <Clock size={16} color="var(--color-gold-bright)" />
                      <span>
                        Hạn chót: <strong style={{ color: 'var(--color-gold-bright)' }}>{comp.deadline}</strong>
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-light)' }}>
                      <Award size={16} color="#34D399" />
                      <span style={{ color: 'var(--color-text-muted)' }}>
                        Lĩnh vực: <span style={{ color: 'white' }}>{comp.category}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div style={{
                  padding: '16px 24px 20px',
                  background: 'rgba(3, 10, 23, 0.4)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  gap: '12px'
                }}>
                  <button 
                    className="btn btn-outline"
                    style={{ flex: 1 }}
                    onClick={() => onSelectCompetition(comp.code)}
                  >
                    <span>Xem chi tiết</span>
                  </button>

                  <button 
                    className="btn btn-gold"
                    style={{ flex: 1 }}
                    onClick={() => onApplyCompetition(comp.code)}
                  >
                    <span>Đăng ký →</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
