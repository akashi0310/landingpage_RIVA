import React, { useState, useEffect } from 'react';
import { Phone, Sparkles, ShieldCheck, Settings, Eye, LogOut } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { OpportunityFinder } from './components/OpportunityFinder';
import { CompetitionDetailView } from './components/CompetitionDetailView';
import { AboutSection } from './components/AboutSection';
import { GlobalNetwork } from './components/GlobalNetwork';
import { AchievementsAndProcess } from './components/AchievementsAndProcess';
import { StudentStories } from './components/StudentStories';
import { NewsSection } from './components/NewsSection';
import { LeadConsultationForm } from './components/LeadConsultationForm';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { competitions, achievements, defaultSiteSettings } from './lib/content';
import { api } from './lib/supabase';
import { SiteSettings } from './types';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'competition-detail' | 'admin-dashboard'>('home');
  const [selectedCompCode, setSelectedCompCode] = useState<string>('SVIIF');
  const [leadCompetition, setLeadCompetition] = useState('');
  const [sectionTarget, setSectionTarget] = useState('');

  // Admin and Site Settings State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('riva_admin_session') === 'true';
  });
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);

  useEffect(() => {
    loadSettings();
  }, [activeView]);

  const loadSettings = async () => {
    try {
      const s = await api.getSiteSettings();
      setSiteSettings(s);
    } catch (e) {
      console.warn('Failed to load site settings:', e);
    }
  };

  // Đồng bộ URL và sự kiện nút Quay lại (Back ← / Forward →) của Trình duyệt
  useEffect(() => {
    // 1. Kiểm tra hash URL ban đầu khi tải trang
    const initialHash = window.location.hash;
    if (initialHash.startsWith('#competition-')) {
      const code = initialHash.replace('#competition-', '').toUpperCase();
      const comp = competitions.find(c => c.code.toUpperCase() === code);
      if (comp) {
        setSelectedCompCode(comp.code);
        setActiveView('competition-detail');
        // Tạo sẵn entry trang chủ để nếu người dùng vào thẳng link này rồi bấm Back thì sẽ về trang chủ chứ không out web
        window.history.replaceState({ view: 'home' }, '', window.location.pathname + window.location.search);
        window.history.pushState({ view: 'competition-detail', compCode: comp.code }, '', initialHash);
      } else {
        window.history.replaceState({ view: 'home' }, '', window.location.pathname + window.location.search);
      }
    } else if (initialHash === '#admin') {
      if (sessionStorage.getItem('riva_admin_session') === 'true') {
        setActiveView('admin-dashboard');
        window.history.replaceState({ view: 'home' }, '', window.location.pathname + window.location.search);
        window.history.pushState({ view: 'admin-dashboard' }, '', initialHash);
      } else {
        setActiveView('home');
        window.history.replaceState({ view: 'home' }, '', window.location.pathname + window.location.search);
      }
    } else {
      window.history.replaceState({ view: 'home' }, '', window.location.pathname + window.location.search + (initialHash || ''));
      if (initialHash && initialHash !== '#' && initialHash !== '#top' && !initialHash.startsWith('#article-') && initialHash !== '#video') {
        const id = initialHash.replace('#', '');
        setTimeout(() => scrollToTarget(id), 120);
      }
    }

    // 2. Bắt sự kiện khi người dùng bấm nút Quay lại (Back ←) trên thanh địa chỉ trình duyệt
    const handlePopState = (e: PopStateEvent) => {
      const currentHash = window.location.hash;
      const state = e.state;

      // Đóng modal đăng nhập admin nếu đang mở và hash không còn là #admin-login
      if (currentHash !== '#admin-login') {
        setShowAdminLoginModal(false);
      }

      if (state?.view === 'competition-detail' || currentHash.startsWith('#competition-')) {
        const code = (state?.compCode || currentHash.replace('#competition-', '')).toUpperCase();
        const comp = competitions.find(c => c.code.toUpperCase() === code);
        if (comp) {
          setSelectedCompCode(comp.code);
          setActiveView('competition-detail');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (state?.view === 'admin-dashboard' || currentHash === '#admin') {
        setActiveView('admin-dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (currentHash.startsWith('#article-') || currentHash === '#video') {
        // Đang ở modal nội bộ trang chủ, giữ activeView = 'home'
        setActiveView('home');
      } else {
        // Quay trở về trang chủ Landing Page
        setActiveView('home');
        if (currentHash && !currentHash.startsWith('#competition-') && currentHash !== '#admin') {
          const targetId = currentHash.replace('#', '');
          if (targetId && targetId !== 'top') {
            setTimeout(() => scrollToTarget(targetId), 60);
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const scrollToTarget = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;

    let offset = 74;
    if (id === 'competitions') {
      offset = 80;
    } else if (id === 'about') {
      offset = 60;
    } else if (id === 'process') {
      offset = 60;
    } else if (id === 'achievements') {
      offset = 60;
    }

    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - offset;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth'
    });
  };

  const navigateToSection = (id: string) => {
    if (activeView !== 'home') {
      setActiveView('home');
      setSectionTarget(id);
      window.history.pushState({ view: 'home', section: id }, '', `#${id}`);
    } else {
      scrollToTarget(id);
      window.history.replaceState({ view: 'home', section: id }, '', `#${id}`);
    }
  };

  useEffect(() => {
    if (activeView === 'home' && sectionTarget) {
      const timer = setTimeout(() => {
        scrollToTarget(sectionTarget);
        setSectionTarget('');
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [activeView, sectionTarget]);

  const handleSelectCompetition = (code: string) => {
    setSelectedCompCode(code);
    setActiveView('competition-detail');
    // Lưu lịch sử trình duyệt để nút Back ← quay lại được trang chủ
    window.history.pushState(
      { view: 'competition-detail', compCode: code },
      '',
      `#competition-${code}`
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyCompetition = (code: string) => {
    setSelectedCompCode(code);
    setLeadCompetition(code);
    navigateToSection('register-lead');
  };

  const handleOpenAdminLogin = () => {
    setShowAdminLoginModal(true);
    window.history.pushState({ modal: 'admin-login' }, '', '#admin-login');
  };

  const handleCloseAdminLogin = () => {
    if (window.location.hash === '#admin-login') {
      window.history.back();
    } else {
      setShowAdminLoginModal(false);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    sessionStorage.setItem('riva_admin_session', 'true');
    setShowAdminLoginModal(false);
    setActiveView('admin-dashboard');
    window.history.pushState({ view: 'admin-dashboard' }, '', '#admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('riva_admin_session');
    setActiveView('home');
    window.history.pushState({ view: 'home' }, '', window.location.pathname + window.location.search);
  };

  const currentCompetition = competitions.find(c => c.code === selectedCompCode) || competitions[0];

  return (
    <div className="app-root">
      {/* Top Admin Quick Bar if Admin is logged in */}
      {isAdminLoggedIn && (
        <div style={{
          background: 'linear-gradient(90deg, #09153d 0%, #10245e 50%, #09153d 100%)',
          borderBottom: '1px solid rgba(204, 153, 0, 0.4)',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} color="var(--color-gold-bright)" />
            <span style={{ fontWeight: 700 }}>Chế độ Quản Trị Viên RIVA đang hoạt động</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {activeView !== 'admin-dashboard' ? (
              <button 
                className="btn btn-sm btn-gold" 
                style={{ padding: '4px 10px', fontSize: '11px', gap: '4px' }}
                onClick={() => { setActiveView('admin-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <Settings size={13} />
                <span>Vào Dashboard Quản Trị</span>
              </button>
            ) : (
              <button 
                className="btn btn-sm btn-outline" 
                style={{ padding: '4px 10px', fontSize: '11px', gap: '4px' }}
                onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <Eye size={13} />
                <span>Xem Website</span>
              </button>
            )}

            <button 
              onClick={handleAdminLogout} 
              style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <LogOut size={13} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}

      {/* Landing page navigation */}
      <Header 
        onNavigate={navigateToSection} 
        onOpenAdmin={() => {
          if (isAdminLoggedIn) {
            setActiveView('admin-dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            handleOpenAdminLogin();
          }
        }}
        siteSettings={siteSettings}
      />

      {/* VIEW 1: HOME LANDING PAGE */}
      {activeView === 'home' && (
        <main id="top" className="landing-page">
          {/* Hero with glowing interactive map */}
          <Hero 
            onExploreClick={() => navigateToSection('competitions')}
            onRegisterClick={() => navigateToSection('register-lead')}
            onSelectCompetition={handleSelectCompetition}
          />

          {/* Trust logos & international accreditation */}
          <TrustSection />

          {/* Smart Opportunity Finder (Slide 6 UX focus) */}
          <OpportunityFinder 
            competitions={competitions}
            onSelectCompetition={handleSelectCompetition}
          />


          {/* About RIVA & Innovation Mentoring (Slide 2 & 8) - Newspaper Article Feature */}
          <AboutSection onConsultClick={() => navigateToSection('register-lead')} />

          {/* Global Network & Stories (Slide 5) */}
          <GlobalNetwork />

          {/* Achievements & 7-Step Participation Process (Slide 10 & 11) */}
          <AchievementsAndProcess 
            onStartProcess={() => navigateToSection('register-lead')}
          />

          {/* Student Stories / Hall of Fame (Slide 9 Social Proof) */}
          <StudentStories achievements={achievements} />

          {/* News & Updates */}
          <NewsSection onConsultClick={() => navigateToSection('register-lead')} />

          {/* Lead Consultation Form (Slide 12 & 15) */}
          <LeadConsultationForm selectedCompetition={leadCompetition} />

          {/* Mobile Floating Quick Action Bar */}
          <div className="mobile-floating-bar" aria-label="Liên hệ nhanh">
            <a 
              href={`tel:${siteSettings.hotline.replace(/[^0-9]/g, '')}`} 
              className="mobile-floating-btn mobile-floating-phone"
            >
              <Phone size={16} />
              <span>{siteSettings.hotline}</span>
            </a>
            <button 
              onClick={() => navigateToSection('register-lead')} 
              className="mobile-floating-btn mobile-floating-consult"
            >
              <Sparkles size={16} />
              <span>Nhận tư vấn ngay</span>
            </button>
          </div>
        </main>
      )}

      {/* VIEW 2: CHI TIẾT CUỘC THI (SVIIF / IPITEX / iENA / GENEVA...) */}
      {activeView === 'competition-detail' && currentCompetition && (
        <CompetitionDetailView 
          competition={currentCompetition}
          onBack={() => {
            if (window.history.length > 1 && window.location.hash.startsWith('#competition-')) {
              window.history.back();
            } else {
              setActiveView('home');
              window.history.pushState({ view: 'home' }, '', window.location.pathname + window.location.search);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          onRegister={(code) => handleApplyCompetition(code)}
        />
      )}

      {/* VIEW 3: ADMIN DASHBOARD */}
      {activeView === 'admin-dashboard' && (
        <AdminDashboard 
          onBackToHome={() => {
            if (window.history.length > 1 && window.location.hash === '#admin') {
              window.history.back();
            } else {
              setActiveView('home');
              window.history.pushState({ view: 'home' }, '', window.location.pathname + window.location.search);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          onLogout={handleAdminLogout}
        />
      )}

      {/* Universal Footer */}
      <Footer 
        onNavigate={navigateToSection} 
        onOpenAdmin={() => {
          if (isAdminLoggedIn) {
            setActiveView('admin-dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            handleOpenAdminLogin();
          }
        }}
        siteSettings={siteSettings}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal 
        isOpen={showAdminLoginModal}
        onClose={handleCloseAdminLogin}
        onSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
};
