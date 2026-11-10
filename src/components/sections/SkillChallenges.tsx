import { motion } from 'framer-motion';
<<<<<<< HEAD
import { useMemo, useState } from 'react';
=======
>>>>>>> 10442e488e90465a2ab118c8b6961984eebe960f
import { Play, Zap, Bug, Brain, Star, LucideIcon } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface Game {
  id: 'tech-quiz' | 'debug-code' | 'code-rush';
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rules: string[];
}

const games: Game[] = [
  {
    id: 'tech-quiz',
    title: 'Tech Quiz',
    description: 'Test your knowledge across algorithms, data structures, web dev, and more.',
    icon: Brain,
    color: '#7c3aed',

    difficulty: "Easy",
    rules: [
      "Choose a category",
      "Select difficulty",
      "Answer correctly",
      "Earn XP"
    ],
  },
  {
    id: 'debug-code',
    title: 'Debug The Code',
    description: 'Spot bugs in real code snippets across C++, Java, JavaScript, and Python.',
    icon: Bug,
    color: '#10b981',
    difficulty: 'Medium',
    rules: [
      "Select a language",
      "Identify the bug",
      "Fix the code",
      "Earn XP"
    ]
  },
  {
    id: 'code-rush',
    title: 'Code Rush',
    description: 'Rapid-fire programming challenge.',
    icon: Zap,
    color: '#fbbf24',
    difficulty: 'Hard',
    rules: [
      "Answer questions quickly",
      "Earn points for speed and accuracy",
      "Compete against others"
    ]
  },
];


export function SkillChallenges() {
<<<<<<< HEAD
  const { setCurrentGame, visitorType } = useAppStore();
  const [showAllChallenges, setShowAllChallenges] = useState(false);

  // Keep every game available, but surface the most relevant ones first
  // for the visitor persona selected in the "Who Are You?" dialog.
  const personaConfig = {
    recruiter: {
      label: 'Recruiter',
      heading: 'Interview-ready technical challenges',
      description: 'Explore the technical areas that demonstrate problem-solving, debugging, and core engineering knowledge.',
      recommended: ['tech-quiz', 'debug-code'] as Game['id'][],
    },
    engineer: {
      label: 'Software Engineer',
      heading: 'Build and sharpen engineering skills',
      description: 'Dive into programming knowledge, debugging, and fast-paced coding practice.',
      recommended: ['debug-code', 'code-rush', 'tech-quiz'] as Game['id'][],
    },
    founder: {
      label: 'Founder',
      heading: 'Explore technical problem-solving',
      description: 'See practical coding, debugging, and technical knowledge challenges behind the products.',
      recommended: ['tech-quiz', 'debug-code'] as Game['id'][],
    },
    student: {
      label: 'Student',
      heading: 'Learn through interactive practice',
      description: 'Start with technical fundamentals, then practice spotting bugs and improving coding speed.',
      recommended: ['tech-quiz', 'debug-code', 'code-rush'] as Game['id'][],
    },
    explorer: {
      label: 'Explorer',
      heading: 'Explore the challenge arena',
      description: 'Try a mix of technical quizzes, debugging tasks, and rapid-fire coding challenges.',
      recommended: ['tech-quiz', 'code-rush', 'debug-code'] as Game['id'][],
    },
  };

  const activePersona = visitorType ? personaConfig[visitorType] : null;
  const recommendedGames = useMemo(() => {
    if (!activePersona) return games;
    return [...games].sort((a, b) => {
      const aRank = activePersona.recommended.indexOf(a.id);
      const bRank = activePersona.recommended.indexOf(b.id);
      return (aRank === -1 ? 999 : aRank) - (bRank === -1 ? 999 : bRank);
    });
  }, [activePersona]);
  const visibleGames = showAllChallenges ? games : recommendedGames.slice(0, activePersona ? 2 : games.length);

  return (
    <section id="skill-challenges" className="relative py-32 px-4 overflow-hidden">
=======
  const { setCurrentGame } = useAppStore();

  return (
    <section className="relative py-32 px-4 overflow-hidden">
>>>>>>> 10442e488e90465a2ab118c8b6961984eebe960f
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyber-green/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
<<<<<<< HEAD
          <p className="font-space-mono text-cyber-green text-sm mb-2">CHAPTER 07 · BONUS</p>
=======
          <p className="font-space-mono text-cyber-green text-sm mb-2">BONUS CHAPTER</p>
>>>>>>> 10442e488e90465a2ab118c8b6961984eebe960f
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            Skill Challenges
          </h2>
          <p className="font-rajdhani text-gray-400 text-lg max-w-2xl mx-auto">
<<<<<<< HEAD
            {activePersona?.description ?? 'Test your abilities with interactive games. Sharpen your problem-solving skills through developer challenges.'}
          </p>
          {activePersona && (
            <div className="mt-4 space-y-1">
              <p className="font-orbitron text-sm font-semibold text-cyber-green">
                {activePersona.heading}
              </p>
              <p className="font-space-mono text-xs uppercase tracking-wider text-gray-500">
                Recommended path for {activePersona.label}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Challenge filters */}
      <div className="relative z-10 max-w-5xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-3">
        <p className="font-rajdhani text-gray-400">
          {showAllChallenges ? 'All available challenges' : activePersona ? 'Recommended challenges' : 'Available challenges'}
        </p>
        <button
          type="button"
          onClick={() => setShowAllChallenges((value) => !value)}
          className="rounded-lg border border-cyber-green/30 px-4 py-2 font-space-mono text-xs text-cyber-green transition hover:bg-cyber-green/10"
        >
          {showAllChallenges ? 'Show recommendations' : 'View all challenges'}
        </button>
      </div>

      {/* Games Grid */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleGames.map((game, index) => (
=======
            Test your abilities with interactive games. Sharpen your problem-solving skills through interactive developer challenges.
          </p>
        </motion.div>
      </div>

      {/* Games Grid */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {games.map((game, index) => (
>>>>>>> 10442e488e90465a2ab118c8b6961984eebe960f
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className="relative group glass-panel rounded-2xl overflow-hidden h-full"
                onClick={() => {
                  switch (game.id) {
                    case "tech-quiz":
                      setCurrentGame("tech-quiz");
                      break;

                    case "debug-code":
                      setCurrentGame("debug-code");
                      break;

                    case "code-rush":
                      setCurrentGame("code-rush");
                      break;
                  }
                }}
                whileHover={{ y: -5 }}
                style={{ borderColor: `${game.color}20` }}
                data-hoverable
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${game.color}15 0%, transparent 70%)`,
                  }}
                />

                <div className="p-6">
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${game.color}20` }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <game.icon className="w-8 h-8" style={{ color: game.color }} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="font-orbitron text-xl font-bold text-white mb-2">
                    {game.title}
                  </h3>

                  {/* Description */}
                  <p className="font-rajdhani text-gray-400 text-sm mb-4">
                    {game.description}
                  </p>

                  {/* Difficulty */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2 py-0.5 rounded text-xs font-orbitron"
                        style={{
                          backgroundColor: `${game.color}20`,
                          color: game.color,
                        }}
                      >
                        {game.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <Star className="w-4 h-4" />
                      <span className="font-space-mono text-xs">0 XP</span>
                    </div>
                  </div>
                </div>

                {/* Play indicator */}
                <motion.div
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center glass-panel"
                  whileHover={{ scale: 1.1 }}
                >
                  <Play className="w-4 h-4" style={{ color: game.color }} />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
