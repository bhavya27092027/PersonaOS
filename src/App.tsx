import { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { CustomCursor } from './components/CustomCursor';
import { BootSequence } from './components/BootSequence';
import { ParticleBackground } from './components/ParticleBackground';
import { Hero } from './components/Hero';
import { VisitorModal } from './components/VisitorModal';
import { MissionControl } from './components/MissionControl';
import { AIFloatingChat } from './components/AIFloatingChat';
import { Footer } from './components/Footer';

import { OriginStory } from './components/sections/OriginStory';
import { SkillsLab } from './components/sections/SkillsLab';
import { ProjectUniverse } from './components/sections/ProjectUniverse';
import { AchievementVault } from './components/sections/AchievementVault';
import { AICompanion } from './components/sections/AICompanion';
import { SkillChallenges } from './components/sections/SkillChallenges';
import { ExperienceTimeline } from './components/sections/ExperienceTimeline';
import { ContactTerminal } from './components/sections/ContactTerminal';
import { TechQuizPage } from './components/quiz/TechQuizPage';
import { DebugChallengePage } from './components/quiz/DebugChallengePage';
import { CodeRushPage } from './components/quiz/CodeRushPage';

function App() {
  const {
    bootComplete,
    setVisitorModalOpen,
    currentGame,
    setCurrentGame
  } = useAppStore();

  useEffect(() => {
    if (bootComplete) {
      const timer = setTimeout(() => {
        setVisitorModalOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [bootComplete, setVisitorModalOpen]);

  return (
    <div className="relative min-h-screen bg-cyber-dark overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Boot Sequence */}
      <BootSequence />

      {/* Background Effects */}
      {bootComplete && <ParticleBackground />}

      {/* Navigation */}
      {bootComplete && <MissionControl />}

      {/* Main Content */}
      {bootComplete && (
        <main className="relative z-10">
          {/* Hero Section */}
          <Hero />

          {/* Sections */}
          <OriginStory />
          <SkillsLab />
          <ProjectUniverse />
          <AchievementVault />
          <AICompanion />
          {!currentGame && <SkillChallenges />}

          {currentGame === "tech-quiz" && (
            <TechQuizPage onExit={() => setCurrentGame(null)} />
          )}

          {currentGame === "debug-code" && (
            <DebugChallengePage onExit={() => setCurrentGame(null)} />
          )}

          {currentGame === "code-rush" && (
            <CodeRushPage onExit={() => setCurrentGame(null)} />
          )}
          <ExperienceTimeline />
          <ContactTerminal />

          {/* Footer */}
          <Footer />
        </main>
      )}

      {/* Visitor Modal */}
      <VisitorModal />

      {/* AI Floating Chat */}
      <AIFloatingChat />
    </div>
  );
}

export default App;
