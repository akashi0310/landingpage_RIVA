import React, { useState, useEffect } from 'react';
import { Phone, Sparkles } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { OpportunityFinder } from './components/OpportunityFinder';
import { CompetitionsSection } from './components/CompetitionsSection';
import { CompetitionDetailView } from './components/CompetitionDetailView';
import { AboutSection } from './components/AboutSection';
import { GlobalNetwork } from './components/GlobalNetwork';
import { AchievementsAndProcess } from './components/AchievementsAndProcess';
import { StudentStories } from './components/StudentStories';
import { NewsSection } from './components/NewsSection';
import { LeadConsultationForm } from './components/LeadConsultationForm';
import { Footer } from './components/Footer';
import { competitions, achievements } from './lib/content';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'competition-detail'>('home');
  const [selectedCompCode, setSelectedCompCode] = useState<string>('SVIIF');

  const [leadCompetition, setLeadCompetition] = useState('');
  const [sectionTarget, setSectionTarget] = useState('');

  const scrollToTarget = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;

    // Header sticky offset: 74px
    // For competitions, scroll lower down so both header and cards are in prime view
    let offset = 74;
    if (id === 'competitions') {
      offset = 20; // Scrolls deeper down so cards are centered and visible without cut-off
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
    } else {
      scrollToTarget(id);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyCompetition = (code: string) => {
    setSelectedCompCode(code);
    setLeadCompetition(code);
    navigateToSection('register-lead');
  };

  const currentCompetition = competitions.find(c => c.code === selectedCompCode) || competitions[0];

  return (
    <div className="app-root">
      {/* Landing page navigation */}
      <Header onNavigate={navigateToSection} />

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

          {/* Competitions Section (Slide 7 CMS-driven) */}
          <CompetitionsSection 
            competitions={competitions}
            onSelectCompetition={handleSelectCompetition}
            onApplyCompetition={handleApplyCompetition}
          />

          {/* About RIVA & Innovation Mentoring (Slide 2 & 8) */}
          <AboutSection />

          {/* Global Network & Stories (Slide 5) */}
          <GlobalNetwork />

          {/* Achievements & 7-Step Participation Process (Slide 10 & 11) */}
          <AchievementsAndProcess 
            onStartProcess={() => navigateToSection('register-lead')}
          />

          {/* Student Stories / Hall of Fame (Slide 9 Social Proof) */}
          <StudentStories achievements={achievements} />

          {/* News & Updates */}
          <NewsSection />

          {/* Lead Consultation Form (Slide 12 & 15) */}
          <LeadConsultationForm selectedCompetition={leadCompetition} />

          {/* Mobile Floating Quick Action Bar */}
          <div className="mobile-floating-bar" aria-label="Liên hệ nhanh">
            <a href="tel:0988000000" className="mobile-floating-btn mobile-floating-phone">
              <Phone size={16} />
              <span>Hotline</span>
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

      {/* VIEW 2: CHI TIẾT CUỘC THI (SVIIF / IPITEX / iENA) */}
      {activeView === 'competition-detail' && currentCompetition && (
        <CompetitionDetailView 
          competition={currentCompetition}
          onBack={() => setActiveView('home')}
          onRegister={(code) => handleApplyCompetition(code)}
        />
      )}

      {/* Universal Footer */}
      <Footer onNavigate={navigateToSection} />
    </div>
  );
};
