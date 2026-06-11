import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Play, X, Zap, Bug, Brain, Trophy, Clock, Star } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: typeof Zap;
  color: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rules: string[];
}

const games: Game[] = [
  {
    id: 'catch-skill',
    title: 'Catch The Skill',
    description: 'Catch falling skill icons to power up your developer profile',
    icon: Zap,
    color: '#fbbf24',
    difficulty: 'Easy',
    rules: ['Use arrow keys to move', 'Catch skill icons', 'Avoid bugs', 'Score points'],
  },
  {
    id: 'debug-code',
    title: 'Debug The Code',
    description: 'Find and fix bugs in the code snippets before time runs out',
    icon: Bug,
    color: '#10b981',
    difficulty: 'Medium',
    rules: ['Read the code carefully', 'Identify the bug', 'Select the correct fix', 'Beat the timer'],
  },
  {
    id: 'tech-quiz',
    title: 'Tech Quiz',
    description: 'Test your knowledge with challenging tech questions',
    icon: Brain,
    color: '#7c3aed',
    difficulty: 'Hard',
    rules: ['Answer multiple choice', 'Race against time', 'Earn XP for correct answers', 'Climb the leaderboard'],
  },
];

function GameModal({ game, onClose }: { game: Game; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-xl" onClick={onClose} />

      <motion.div
        className="relative z-10 w-full max-w-2xl"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div
          className="glass-panel-strong rounded-3xl overflow-hidden"
          style={{ borderColor: `${game.color}30` }}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-white/10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 glass-panel rounded-lg hover:bg-white/10 transition-colors"
              data-hoverable
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="flex items-center gap-4">
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${game.color}20` }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <game.icon className="w-8 h-8" style={{ color: game.color }} />
              </motion.div>
              <div>
                <h3 className="font-orbitron text-2xl font-bold text-white">{game.title}</h3>
                <p className="font-rajdhani text-gray-400">{game.description}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-3 mt-4">
              <div className="flex items-center gap-2 px-3 py-1 glass-panel rounded-full">
                <Trophy className="w-4 h-4 text-cyber-yellow" />
                <span className="font-space-mono text-xs text-gray-400">High Score: 0</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 glass-panel rounded-full">
                <Clock className="w-4 h-4 text-cyber-cyan" />
                <span className="font-space-mono text-xs text-gray-400">Best Time: --:--</span>
              </div>
            </div>
          </div>

          {/* Game Preview */}
          <div className="p-8">
            {/* Placeholder game UI */}
            <div
              className="relative aspect-video rounded-2xl overflow-hidden glass-panel mb-6"
              style={{
                background: `linear-gradient(135deg, ${game.color}10 0%, transparent 50%)`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${game.color}20` }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <game.icon className="w-10 h-10" style={{ color: game.color }} />
                  </motion.div>
                  <p className="font-orbitron text-lg text-white mb-2">COMING SOON</p>
                  <p className="font-rajdhani text-gray-400 text-sm">This game is under development</p>
                </motion.div>
              </div>

              {/* Animated elements */}
              <motion.div
                className="absolute w-4 h-4 rounded-full"
                style={{ backgroundColor: game.color }}
                animate={{
                  x: ['10%', '90%', '10%'],
                  y: ['20%', '80%', '20%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Rules */}
            <div className="mb-6">
              <h4 className="font-rajdhani text-lg font-semibold text-white mb-3">How to Play</h4>
              <div className="grid grid-cols-2 gap-2">
                {game.rules.map((rule, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 glass-panel rounded-lg"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${game.color}20` }}
                    >
                      <span className="font-orbitron text-xs" style={{ color: game.color }}>{i + 1}</span>
                    </div>
                    <span className="font-rajdhani text-sm text-gray-300">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Play Button */}
            <motion.button
              className="w-full py-4 rounded-xl font-rajdhani text-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              style={{
                background: `linear-gradient(135deg, ${game.color}60, ${game.color}30)`,
                color: 'white',
              }}
              disabled
              data-hoverable
            >
              <Play className="w-5 h-5" />
              Coming Soon
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SkillChallenges() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  return (
    <section className="relative py-32 px-4 overflow-hidden">
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
          <p className="font-space-mono text-cyber-green text-sm mb-2">BONUS CHAPTER</p>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            Skill Challenges
          </h2>
          <p className="font-rajdhani text-gray-400 text-lg max-w-2xl mx-auto">
            Test your abilities with interactive games. Coming soon to this portfolio!
          </p>
        </motion.div>
      </div>

      {/* Games Grid */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className="relative group glass-panel rounded-2xl overflow-hidden h-full"
                onClick={() => setSelectedGame(game)}
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

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
