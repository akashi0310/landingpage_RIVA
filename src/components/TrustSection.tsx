import React from 'react';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const partners = [
    { name: 'IFIA', desc: 'Hiệp hội Quốc tế các Nhà Phát minh', country: 'Geneva / Global' },
    { name: 'WIIPA', desc: 'Hiệp hội Sở hữu Trí tuệ Thế giới', country: 'Global' },
    { name: 'SVIIF', desc: 'Silicon Valley Invention Festival', country: 'Hoa Kỳ' },
    { name: 'IPITEX', desc: 'Triển lãm Phát minh Bangkok', country: 'Thái Lan' },
    { name: 'iENA', desc: 'Triển lãm Sáng chế Nuremberg', country: 'Cộng hòa LB Đức' },
    { name: 'GENEVA INVENTIONS', desc: 'Triển lãm Sáng chế Quốc tế Geneva', country: 'Thụy Sĩ' },
    { name: 'KIPA', desc: 'Hiệp hội Thúc đẩy Sáng chế Hàn Quốc', country: 'Hàn Quốc' },
    { name: 'WIPO PARTNER', desc: 'Tổ chức Sở hữu Trí tuệ Thế giới', country: 'LHQ' }
  ];

  return (
    <section className="trust-strip">
      <div className="container">
        <div className="trust-title">
          ĐỐI TÁC CHIẾN LƯỢC & SỰ CÔNG NHẬN QUỐC TẾ
        </div>

        <div className="partner-logo-row">
          {partners.map((p, idx) => (
            <div key={idx} className="partner-logo-item">
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(19, 59, 190, 0.28)',
                color: 'var(--color-sky)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '12px'
              }}>
                {p.name.slice(0, 2)}
              </div>
              <div>
                <div className="partner-logo-text" style={{ color: 'white' }}>{p.name}</div>
                <div style={{ fontSize: '10px', color: 'var(--color-text-dim)' }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Note */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          fontSize: '13px',
          color: 'var(--color-text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <ShieldCheck size={16} color="var(--color-gold-bright)" />
          <span>RIVA là đại diện quốc gia được ủy quyền chính thức tuyển chọn, thẩm định và dẫn đoàn học sinh - sinh viên Việt Nam</span>
        </div>
      </div>
    </section>
  );
};
