import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const partners = [
    { 
      name: 'IFIA', 
      desc: 'Hiệp hội Quốc tế các Nhà Phát minh', 
      country: 'Geneva, Thụy Sĩ', 
      flag: '🇨🇭',
      domain: 'ifia.com',
      url: 'https://www.ifia.com'
    },
    { 
      name: 'WIIPA', 
      desc: 'Hiệp hội Sở hữu Trí tuệ Thế giới', 
      country: 'Quốc tế', 
      flag: '🌐',
      domain: 'wiipa.org',
      url: 'https://www.wiipa.org'
    },
    { 
      name: 'WIPO (UN)', 
      desc: 'Tổ chức Sở hữu Trí tuệ Thế giới - LHQ', 
      country: 'Liên Hợp Quốc', 
      flag: '🇺🇳',
      domain: 'wipo.int',
      url: 'https://www.wipo.int'
    },
    { 
      name: 'SVIIF', 
      desc: 'Triển lãm Sáng chế Silicon Valley', 
      country: 'Hoa Kỳ', 
      flag: '🇺🇸',
      domain: 'sviif.com',
      url: 'https://www.sviif.com'
    },
    { 
      name: 'GENEVA INVENTIONS', 
      desc: 'Triển lãm Sáng chế Quốc tế Geneva', 
      country: 'Thụy Sĩ', 
      flag: '🇨🇭',
      domain: 'inventions-geneva.ch',
      url: 'https://inventions-geneva.ch/en/'
    },
    { 
      name: 'iENA', 
      desc: 'Triển lãm Sáng chế Nuremberg', 
      country: 'CHLB Đức', 
      flag: '🇩🇪',
      domain: 'iena.de',
      url: 'https://www.iena.de/en/'
    },
    { 
      name: 'IPITEX', 
      desc: 'Triển lãm Phát minh Bangkok', 
      country: 'Thái Lan', 
      flag: '🇹🇭',
      domain: 'ipitex.nrct.go.th',
      url: 'https://ipitex.nrct.go.th'
    },
    { 
      name: 'WICO KOREA', 
      desc: 'Olympic Sáng chế & Đổi mới Sáng tạo', 
      country: 'Hàn Quốc', 
      flag: '🇰🇷',
      domain: 'wicokorea.com',
      url: 'https://www.wicokorea.com'
    },
    { 
      name: 'INTARG', 
      desc: 'Triển lãm Sáng chế Quốc tế Ba Lan', 
      country: 'Ba Lan', 
      flag: '🇵🇱',
      domain: 'intarg.pl',
      url: 'https://intarg.pl'
    },
    { 
      name: 'KIPA', 
      desc: 'Hiệp hội Thúc đẩy Sáng chế Hàn Quốc', 
      country: 'Hàn Quốc', 
      flag: '🇰🇷',
      domain: 'kipa.org',
      url: 'https://www.kipa.org/eng/'
    }
  ];

  return (
    <section className="trust-strip">
      <div className="container">
        <div className="trust-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span>ĐỐI TÁC CHIẾN LƯỢC & SỰ CÔNG NHẬN QUỐC TẾ</span>
          <span style={{ fontSize: '11px', color: 'var(--color-gold-bright)', fontWeight: 700, letterSpacing: 'normal' }}>
            • Bấm vào logo để truy cập website chính thức
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
              title={`Truy cập trang web chính thức của ${p.name}: ${p.url}`}
              style={{ textDecoration: 'none', position: 'relative' }}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(5, 15, 52, 0.9)',
                border: '1px solid rgba(117, 194, 250, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                lineHeight: 1,
                flexShrink: 0
              }}>
                {p.flag}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="partner-logo-text" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontWeight: 800 }}>{p.name}</span>
                  <ExternalLink size={12} color="var(--color-gold-bright)" style={{ opacity: 0.9 }} />
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-dim)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.desc}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--color-sky-bright)', fontWeight: 600, marginTop: '2px', fontFamily: 'monospace' }}>
                  🌐 {p.domain}
                </div>
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
