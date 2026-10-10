import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  ['about', 'Giới thiệu'], ['competitions', 'Cuộc thi'], ['finder', 'Tìm cơ hội'],
  ['achievements', 'Thành tích'], ['process', 'Quy trình'], ['news', 'Tin tức']
];

export const Header: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = (id: string) => { setMobileMenuOpen(false); onNavigate(id); };
  return (
    <header className="site-header">
      <nav aria-label="Điều hướng chính" className="container site-nav">
          {/* Logo RIVA */}
          <div
            onClick={() => navigate('top')}
            style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
          >
            {/* Logo RIVA Image */}
            <div style={{
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={`${import.meta.env.BASE_URL}logo-riva.png`}
                alt="Logo RIVA"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 10px rgba(255, 222, 67, 0.45))'
                }}
              />
            </div>

            <div>
              <div style={{
                fontSize: '22px',
                fontWeight: 900,
                letterSpacing: '0.15em',
                lineHeight: 1,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span>RIVA</span>
                <span style={{
                  fontSize: '10px',
                  background: 'rgba(255, 222, 67, 0.2)',
                  color: 'var(--color-gold-bright)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  letterSpacing: '0.04em'
                }}>GLOBAL</span>
              </div>
              <div style={{
                fontSize: '10px',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginTop: '3px'
              }}>
                VIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO
              </div>
            </div>
          </div>


        <div className="site-nav-links">
          {links.map(([id, label]) => <a key={id} href={'#' + id} onClick={e => { e.preventDefault(); navigate(id); }}>{label}</a>)}
        </div>
        <div className="site-nav-actions">
          <a href="#register-lead" className="btn btn-sm btn-gold" onClick={e => { e.preventDefault(); navigate('register-lead'); }}>Nhận tư vấn</a>
          <button className="site-menu-toggle" aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {mobileMenuOpen && <nav id="mobile-navigation" aria-label="Điều hướng trên điện thoại" className="site-mobile-nav">
        {links.map(([id, label]) => <a key={id} href={'#' + id} onClick={e => { e.preventDefault(); navigate(id); }}>{label}</a>)}
        <a href="#register-lead" className="btn btn-gold" onClick={e => { e.preventDefault(); navigate('register-lead'); }}>Đăng ký tư vấn</a>
      </nav>}
    </header>
  );
};
