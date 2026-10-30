import React from 'react';
import { Award, Sparkles, Quote, ExternalLink, Star } from 'lucide-react';
import { Achievement } from '../types';

interface StudentStoriesProps {
  achievements: Achievement[];
}

export const StudentStories: React.FC<StudentStoriesProps> = ({ achievements }) => {
  return (
    <section id="stories" style={{ padding: '90px 0', background: 'rgba(5, 16, 38, 0.5)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <Award size={14} />
            <span>VINH DANH CÁC ĐOÀN VIỆT NAM (SOCIAL PROOF)</span>
          </div>
          <h2 className="section-title">
            CÁC ĐOÀN TIÊU BIỂU — BẢNG VÀNG THÀNH TÍCH
          </h2>
          <p className="section-desc">
            Các đoàn học sinh, sinh viên xuất sắc do RIVA hướng dẫn và dẫn đoàn mang niềm tự hào cờ đỏ sao vàng tỏa sáng trên các bục trao giải quốc tế.
          </p>
        </div>

        {/* Delegation Cards Grid */}
        <div className="grid-2" style={{ gap: '28px' }}>
          {achievements.map((item) => {
            // Hiển thị tên theo đoàn đại biểu đoạt giải (không hiển thị tên cá nhân)
            const delegationTitle = item.student_name.startsWith('Đoàn')
              ? item.student_name
              : `Đoàn ${item.competition.split(' ')[0]} đoạt giải`;

            return (
              <div 
                key={item.id} 
                className="glass-card glass-card-interactive student-story-card"
              >
                {/* Avatar / Team image */}
                <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
                  <img 
                    src={item.avatar_url} 
                    alt={delegationTitle}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '16px',
                      objectFit: 'cover',
                      border: '2px solid var(--color-gold)'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    right: '-8px',
                    background: 'linear-gradient(135deg, #CC9900, #F0F2C0)',
                    color: '#050d26',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
                  }}>
                    <Award size={18} />
                  </div>
                </div>

                {/* Delegation Details */}
                <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="badge badge-gold" style={{ fontSize: '11px' }}>
                      {item.award}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-dim)', fontWeight: 600 }}>
                      Năm {item.year}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'white', marginTop: '6px', marginBottom: '4px' }}>
                    {delegationTitle}
                  </h3>

                  <div style={{ fontSize: '12px', color: 'var(--color-gold-bright)', fontWeight: 600, marginBottom: '8px' }}>
                    🏛️ {item.school}
                  </div>

                  <div style={{
                    fontSize: '13px',
                    color: 'var(--color-text-light)',
                    lineHeight: 1.5,
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    borderRadius: '8px',
                    borderLeft: '3px solid var(--color-primary)'
                  }}>
                    🔬 <strong>Đề tài:</strong> {item.project_title}
                  </div>

                  <div style={{ marginTop: '10px', fontSize: '12px', color: '#60A5FA', fontWeight: 600 }}>
                    Đấu trường: {item.competition}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
