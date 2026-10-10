import React, { useState } from 'react';
import { Search, Sparkles, Filter, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';
import { Competition } from '../types';

interface OpportunityFinderProps {
  competitions: Competition[];
  onSelectCompetition: (code: string) => void;
}

export const OpportunityFinder: React.FC<OpportunityFinderProps> = ({
  competitions,
  onSelectCompetition
}) => {
  const [selectedRole, setSelectedRole] = useState('student_high');
  const [selectedField, setSelectedField] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [filterApplied, setFilterApplied] = useState(false);

  const filteredCompetitions = competitions.filter(comp => {
    if (selectedCountry !== 'all' && !comp.country_code.toLowerCase().includes(selectedCountry.toLowerCase())) {
      return false;
    }
    if (selectedField !== 'all' && !comp.category.toLowerCase().includes(selectedField.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <section id="finder" style={{ padding: '80px 0', background: 'rgba(5, 16, 38, 0.6)' }}>
      <div className="container">
        <div className="glass-card" style={{
          padding: '40px',
          background: 'radial-gradient(ellipse at top, rgba(19, 59, 190, 0.35) 0%, rgba(7, 21, 69, 0.92) 100%)',
          border: '1px solid rgba(117, 194, 250, 0.35)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 32px' }}>
            <div className="badge badge-blue" style={{ marginBottom: '12px' }}>
              <Filter size={13} />
              TRẢI NGHIỆM NGƯỜI DÙNG TỐI ƯU (SMART UX FINDER)
            </div>
            <h2 className="section-title" style={{ fontSize: '30px', fontWeight: 800, marginBottom: '12px' }}>
              BẠN ĐANG TÌM CƠ HỘI NÀO?
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '15px' }}>
              Chọn hồ sơ và sở thích của bạn để RIVA gợi ý sân chơi quốc tế phù hợp nhất với năng lực và mục tiêu học thuật.
            </p>
          </div>

          {/* Interactive Filters Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '28px'
          }}>
            {/* Step 1: Role */}
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="step-number" style={{ width: '20px', height: '20px', fontSize: '11px', margin: 0 }}>1</span>
                Bạn là ai?
              </label>
              <select 
                className="form-select"
                value={selectedRole}
                onChange={(e) => { setSelectedRole(e.target.value); setFilterApplied(true); }}
              >
                <option value="student_high">Học sinh THCS / THPT (Secondary/High School)</option>
                <option value="student_uni">Sinh viên Đại học / Cao đẳng</option>
                <option value="parent">Phụ huynh định hướng du học / NCKH</option>
                <option value="teacher">Giáo viên / Hướng dẫn nghiên cứu</option>
              </select>
            </div>

            {/* Step 2: Interest Field */}
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="step-number" style={{ width: '20px', height: '20px', fontSize: '11px', margin: 0 }}>2</span>
                Lĩnh vực bạn quan tâm?
              </label>
              <select 
                className="form-select"
                value={selectedField}
                onChange={(e) => { setSelectedField(e.target.value); setFilterApplied(true); }}
              >
                <option value="all">Tất cả các lĩnh vực sáng chế & STEM</option>
                <option value="ai">Trí tuệ nhân tạo (AI) & CNTT</option>
                <option value="stem">STEM & Sáng chế Đổi mới</option>
                <option value="năng lượng">Môi trường & Năng lượng xanh</option>
                <option value="thương mại">Thương mại hóa & Bằng độc quyền</option>
              </select>
            </div>

            {/* Step 3: Destination Country */}
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="step-number" style={{ width: '20px', height: '20px', fontSize: '11px', margin: 0 }}>3</span>
                Đấu trường mong muốn?
              </label>
              <select 
                className="form-select"
                value={selectedCountry}
                onChange={(e) => { setSelectedCountry(e.target.value); setFilterApplied(true); }}
              >
                <option value="all">Toàn bộ các quốc gia (Toàn cầu)</option>
                <option value="us">🇺🇸 Hoa Kỳ (SVIIF Thung Lũng Silicon)</option>
                <option value="de">🇩🇪 Đức (iENA Nuremberg Châu Âu)</option>
                <option value="ch">🇨🇭 Thụy Sĩ (Geneva Inventions Toàn Cầu)</option>
                <option value="th">🇹🇭 Thái Lan (IPITEX Bangkok)</option>
              </select>
            </div>
          </div>

          {/* Result Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-text-light)' }}>
              <CheckCircle2 size={18} color="var(--color-success)" />
              <span>
                Tìm thấy <strong>{filteredCompetitions.length}</strong> cuộc thi phù hợp với nguyện vọng của bạn
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {filteredCompetitions.slice(0, 3).map(comp => (
                <button
                  key={comp.id}
                  className="btn btn-sm btn-outline"
                  onClick={() => onSelectCompetition(comp.code)}
                  style={{ gap: '6px' }}
                >
                  <span>{comp.flag_emoji}</span>
                  <span>{comp.code}</span>
                  <ArrowRight size={12} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
