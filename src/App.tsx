import React, { useState, useEffect } from 'react';
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

  const navigateToSection = (id: string) => {
    setActiveView('home');
    setSectionTarget(id);
  };

  useEffect(() => {
    if (activeView === 'home' && sectionTarget) {
      document.getElementById(sectionTarget)?.scrollIntoView({ behavior: 'smooth' });
      setSectionTarget('');
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
            onExploreClick={() => {
              const el = document.getElementById('competitions');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onRegisterClick={() => {
              const el = document.getElementById('register-lead');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
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
            onStartProcess={() => {
              const el = document.getElementById('register-lead');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Student Stories / Hall of Fame (Slide 9 Social Proof) */}
          <StudentStories achievements={achievements} />

          {/* News & Updates */}
          <NewsSection />

          {/* Lead Consultation Form (Slide 12 & 15) */}
          <LeadConsultationForm selectedCompetition={leadCompetition} />
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
