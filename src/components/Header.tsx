import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '../types';

const links = [
  ['about', 'Giới thiệu'],
  ['competitions', 'Cuộc thi'],
  ['achievements', 'Thành tích'],
  ['process', 'Quy trình'],
  ['news', 'Tin tức']
];

interface HeaderProps {
  onNavigate: (id: string) => void;
  onOpenAdmin: () => void;
  siteSettings?: SiteSettings;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenAdmin, siteSettings }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to apply enhanced glassmorphism and shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open for smooth mobile UX
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navigate = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  const hotlineNum = siteSettings?.hotline || '0988.234.567';

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <nav aria-label="Điều hướng chính" className="container site-nav">
        {/* Logo RIVA */}
        <div
          onClick={() => navigate('top')}
          className="site-logo-container"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') navigate('top'); }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', userSelect: 'none' }}
        >
          {/* Logo RIVA Image */}
          <div style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <img
              src={`${import.meta.env.BASE_URL}logo-riva.png`}
              alt="Logo RIVA"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 10px rgba(204, 153, 0, 0.45))'
              }}
            />
          </div>

          <div>
            <div style={{
              fontSize: '20px',
              fontWeight: 900,
              letterSpacing: '0.12em',
              lineHeight: 1,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>RIVA</span>
              <span style={{
                fontSize: '10px',
                background: 'rgba(204, 153, 0, 0.2)',
                color: 'var(--color-gold-bright)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}>GLOBAL</span>
            </div>
            <div className="site-logo-subtitle" style={{
              fontSize: '9px',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginTop: '3px'
            }}>
              VIỆN NGHIÊN CỨU ĐỔI MỚI SÁNG TẠO VÀ KIỂM ĐỊNH CHẤT LƯỢNG
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="site-nav-links">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={'#' + id}
              onClick={e => { e.preventDefault(); navigate(id); }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Actions & Mobile Toggle */}
        <div className="site-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="btn btn-sm btn-ghost"
            onClick={onOpenAdmin}
            style={{
              color: 'var(--color-text-muted)',
              fontSize: '12px',
              gap: '5px',
              padding: '6px 10px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            title="Dành cho Quản trị viên"
          >
            <ShieldCheck size={14} color="var(--color-gold-bright)" />
            <span>Admin</span>
          </button>

          <a
            href="#register-lead"
            className="btn btn-sm btn-gold header-cta-btn"
            onClick={e => { e.preventDefault(); navigate('register-lead'); }}
          >
            <span>Nhận tư vấn</span>
          </a>

          <button
            className="site-menu-toggle"
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={26} color="var(--color-gold-bright)" /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation with backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="site-mobile-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="mobile-navigation"
            aria-label="Điều hướng trên điện thoại"
            className="site-mobile-nav"
          >
            <div className="mobile-nav-list">
              {links.map(([id, label]) => (
                <a
                  key={id}
                  href={'#' + id}
                  className="mobile-nav-link"
                  onClick={e => { e.preventDefault(); navigate(id); }}
                >
                  <span>{label}</span>
                  <ChevronRight size={18} color="var(--color-sky)" />
                </a>
              ))}
            </div>

            <div className="mobile-nav-footer">
              <a
                href="#register-lead"
                className="btn btn-gold btn-lg"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={e => { e.preventDefault(); navigate('register-lead'); }}
              >
                <Sparkles size={18} />
                <span>ĐĂNG KÝ NHẬN TƯ VẤN</span>
              </a>

              <a
                href={`tel:${hotlineNum.replace(/[^0-9]/g, '')}`}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
              >
                <Phone size={16} />
                <span>HOTLINE: {hotlineNum}</span>
              </a>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'center', marginTop: '8px', fontSize: '13px', color: 'var(--color-text-dim)', gap: '6px' }}
              >
                <ShieldCheck size={14} color="var(--color-gold-bright)" />
                <span>Quản Trị Hệ Thống (Admin)</span>
              </button>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};
