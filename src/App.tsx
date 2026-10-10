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
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { api } from './lib/supabase';
import { ActiveView, Competition, Achievement } from './types';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedCompCode, setSelectedCompCode] = useState<string>('SVIIF');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: 'student' | 'admin' } | null>(null);

  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initData() {
      try {
        const [comps, achs] = await Promise.all([
          api.getCompetitions(),
          api.getAchievements()
        ]);
        setCompetitions(comps);
        setAchievements(achs);
      } catch (err) {
        console.error('Failed to load initial data:', err);
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, []);

  const handleSelectCompetition = (code: string) => {
    setSelectedCompCode(code);
    setActiveView('competition-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyCompetition = (code: string) => {
    setSelectedCompCode(code);
    if (!currentUser) {
      setCurrentUser({ name: 'Nguyễn Văn A', role: 'student' });
    }
    setActiveView('student-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentCompetition = competitions.find(c => c.code === selectedCompCode) || competitions[0];

  return (
    <div className="app-root">
      {/* Universal Header with Top Quick Switcher */}
      <Header 
        activeView={activeView}
        setActiveView={setActiveView}
        openAuthModal={() => setAuthModalOpen(true)}
        openCompetitionModal={handleSelectCompetition}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      {/* VIEW 1: HOME LANDING PAGE */}
      {activeView === 'home' && (
        <main className="landing-page">
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
          <LeadConsultationForm />
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

      {/* VIEW 3: DASHBOARD THÍ SINH (APPLICANT PORTAL) */}
      {activeView === 'student-dashboard' && (
        <StudentDashboard 
          competitions={competitions}
          onBackToHome={() => setActiveView('home')}
        />
      )}

      {/* VIEW 4: PORTAL QUẢN TRỊ (ADMIN DASHBOARD) */}
      {activeView === 'admin-dashboard' && (
        <AdminDashboard 
          onBackToHome={() => setActiveView('home')}
        />
      )}

      {/* Auth Modal for Login & Register */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'admin') {
            setActiveView('admin-dashboard');
          } else {
            setActiveView('student-dashboard');
          }
        }}
      />

      {/* Universal Footer */}
      <Footer />
    </div>
  );
};
