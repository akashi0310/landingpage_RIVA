import React, { useState } from 'react';
import {
  Globe2,
  Menu,
  X,
  Award,
  Sparkles,
  UserCheck,
  ShieldCheck,
  LayoutDashboard,
  Compass,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { ActiveView } from '../types';
import { isSupabaseConfigured } from '../lib/supabase';

interface HeaderProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  openAuthModal: () => void;
  openCompetitionModal: (code: string) => void;
  currentUser: { name: string; role: 'student' | 'admin' } | null;
  setCurrentUser: (user: { name: string; role: 'student' | 'admin' } | null) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  openAuthModal,
  openCompetitionModal,
  currentUser,
  setCurrentUser
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 900 }}>
      {/* 1. Quick Switcher Bar for testing all screens from 8.png */}
      <div className="demo-switcher-bar">
        <div className="demo-switcher-inner">
          <div className="demo-switcher-title">
            <Sparkles size={16} />
            <span>RIVA DEMO NAVIGATOR</span>
            <span className="demo-badge-pill">
              {isSupabaseConfigured ? '🟢 SUPABASE LIVE' : '⚡ LOCAL TEST MODE'}
            </span>
          </div>

          <div className="demo-view-tabs">
            <button
              className={`demo-tab-btn ${activeView === 'home' ? 'active' : ''}`}
              onClick={() => setActiveView('home')}
            >
              <Compass size={13} />
              1. Trang Chủ
            </button>
            <button
              className={`demo-tab-btn ${activeView === 'competition-detail' ? 'active' : ''}`}
              onClick={() => {
                setActiveView('competition-detail');
              }}
            >
              <Award size={13} />
              2. Chi Tiết Cuộc Thi (SVIIF)
            </button>
            <button
              className="demo-tab-btn"
              onClick={openAuthModal}
            >
              <UserCheck size={13} />
              3. Cổng Đăng Ký / Đăng Nhập
            </button>
            <button
              className={`demo-tab-btn ${activeView === 'student-dashboard' ? 'active gold' : ''}`}
              onClick={() => {
                setCurrentUser({ name: 'Nguyễn Văn A', role: 'student' });
                setActiveView('student-dashboard');
              }}
            >
              <LayoutDashboard size={13} />
              4. Dashboard Thí Sinh
            </button>
            <button
              className={`demo-tab-btn ${activeView === 'admin-dashboard' ? 'active' : ''}`}
              onClick={() => {
                setCurrentUser({ name: 'Ban Quản Trị RIVA', role: 'admin' });
                setActiveView('admin-dashboard');
              }}
            >
              <ShieldCheck size={13} />
              5. Portal Quản Trị (Admin)
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Institutional Navbar */}
      <nav style={{
        background: 'rgba(7, 21, 69, 0.96)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--color-border)',
        padding: '14px 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo RIVA */}
          <div
            onClick={() => setActiveView('home')}
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

          {/* Desktop Nav Links */}
          <div style={{ display: 'none', alignItems: 'center', gap: '28px' }} className="desktop-nav">
            <a
              href="#about"
              onClick={(e) => { if (activeView !== 'home') { setActiveView('home'); } }}
              style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-light)' }}
            >
              Giới thiệu
            </a>
            <a
              href="#competitions"
              onClick={(e) => { if (activeView !== 'home') { setActiveView('home'); } }}
              style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-light)' }}
            >
              Cuộc thi
            </a>
            <a
              href="#finder"
              onClick={(e) => { if (activeView !== 'home') { setActiveView('home'); } }}
              style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-light)' }}
            >
              Tìm cơ hội
            </a>
            <a
              href="#achievements"
              onClick={(e) => { if (activeView !== 'home') { setActiveView('home'); } }}
              style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-light)' }}
            >
              Thành tích
            </a>
            <a
              href="#process"
              onClick={(e) => { if (activeView !== 'home') { setActiveView('home'); } }}
              style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-light)' }}
            >
              Quy trình
            </a>
            <a
              href="#news"
              onClick={(e) => { if (activeView !== 'home') { setActiveView('home'); } }}
              style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-light)' }}
            >
              Tin tức
            </a>
          </div>

          {/* Desktop Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              color: 'var(--color-text-muted)'
            }}>
              <Globe2 size={14} color="var(--color-gold-bright)" />
              <span>Toàn cầu (EN/VI)</span>
            </div>

            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => {
                    if (currentUser.role === 'admin') setActiveView('admin-dashboard');
                    else setActiveView('student-dashboard');
                  }}
                >
                  <UserCheck size={14} />
                  <span>{currentUser.name}</span>
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  title="Đăng xuất"
                  onClick={() => setCurrentUser(null)}
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                className="btn btn-sm btn-outline"
                onClick={openAuthModal}
              >
                Đăng nhập
              </button>
            )}

            <a
              href="#register-lead"
              className="btn btn-sm btn-gold"
              onClick={(e) => {
                if (activeView !== 'home') {
                  setActiveView('home');
                }
              }}
            >
              Đăng ký tham gia →
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                display: 'none',
                cursor: 'pointer',
                padding: '6px'
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            background: 'var(--color-bg-surface)',
            borderTop: '1px solid var(--color-border)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>Giới thiệu</a>
            <a href="#competitions" onClick={() => setMobileMenuOpen(false)}>Cuộc thi</a>
            <a href="#finder" onClick={() => setMobileMenuOpen(false)}>Tìm cơ hội</a>
            <a href="#achievements" onClick={() => setMobileMenuOpen(false)}>Thành tích</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)}>Quy trình</a>
            <div style={{ height: '1px', background: 'var(--color-border)' }} />
            <button className="btn btn-outline" onClick={() => { openAuthModal(); setMobileMenuOpen(false); }}>
              Đăng nhập Portal
            </button>
            <a href="#register-lead" className="btn btn-gold" onClick={() => setMobileMenuOpen(false)}>
              Đăng ký tham gia ngay →
            </a>
          </div>
        )}
      </nav>

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
        }
        @media (max-width: 899px) {
          .mobile-toggle-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
