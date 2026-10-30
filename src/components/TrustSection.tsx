import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const partners = [
    { 
      name: 'IFIA', 
      desc: 'Hiệp hội Quốc tế các Nhà Phát minh', 
      country: 'Thụy Sĩ / Geneva', 
      flag: '🇨🇭',
      url: 'https://www.ifia.com'
    },
    { 
      name: 'WIIPA', 
      desc: 'Hiệp hội Sở hữu Trí tuệ Thế giới', 
      country: 'Quốc tế', 
      flag: '🌐',
      url: 'https://www.wiipa.org'
    },
    { 
      name: 'SVIIF', 
      desc: 'Silicon Valley Invention Festival', 
      country: 'Hoa Kỳ', 
      flag: '🇺🇸',
      url: 'https://www.sviif.com'
    },
    { 
      name: 'IPITEX', 
      desc: 'Triển lãm Phát minh Bangkok', 
      country: 'Thái Lan', 
      flag: '🇹🇭',
      url: 'https://ipitex.nrct.go.th'
    },
    { 
      name: 'iENA', 
      desc: 'Triển lãm Sáng chế Nuremberg', 
      country: 'Cộng hòa LB Đức', 
      flag: '🇩🇪',
      url: 'https://www.iena.de/en/'
    },
    { 
      name: 'GENEVA INVENTIONS', 
      desc: 'Triển lãm Sáng chế Quốc tế Geneva', 
      country: 'Thụy Sĩ', 
      flag: '🇨🇭',
      url: 'https://inventions-geneva.ch/en/'
    },
    { 
      name: 'KIPA', 
      desc: 'Hiệp hội Thúc đẩy Sáng chế Hàn Quốc', 
      country: 'Hàn Quốc', 
      flag: '🇰🇷',
      url: 'https://www.kipa.org/eng/'
    },
    { 
      name: 'WIPO PARTNER', 
      desc: 'Tổ chức Sở hữu Trí tuệ Thế giới', 
      country: 'Liên Hợp Quốc', 
      flag: '🇺🇳',
      url: 'https://www.wipo.int'
    }
  ];

  return (
    <section className="trust-strip">
      <div className="container">
        <div className="trust-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <span>ĐỐI TÁC CHIẾN LƯỢC & SỰ CÔNG NHẬN QUỐC TẾ</span>
          <span style={{ fontSize: '11px', color: 'var(--color-gold-bright)', fontWeight: 600, letterSpacing: 'normal' }}>
            (Nhấp để xem website chính thức)
          </span>
        </div>

        <div className="partner-logo-row">
          {partners.map((p, idx) => (
            <a 
              key={idx} 
              href={p.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="partner-logo-item partner-link-card"
              title={`Truy cập trang web chính thức của ${p.name}`}
              style={{ textDecoration: 'none', position: 'relative' }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(51, 102, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                lineHeight: 1,
                flexShrink: 0
              }}>
                {p.flag}
              </div>
              <div style={{ flex: 1 }}>
                <div className="partner-logo-text" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{p.name}</span>
                  <ExternalLink size={11} color="var(--color-sky)" style={{ opacity: 0.8 }} />
                </div>
                <div style={{ fontSize: '10px', color: 'var(--color-text-dim)' }}>{p.desc}</div>
              </div>
            </a>
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
