import { motion } from 'framer-motion';
import { useState } from 'react';
import { achievements } from '../../data/content';
import { Award, Trophy, Code, Cloud, Github, Book, X, Calendar, Sparkles } from 'lucide-react';

const iconMap: Record<string, typeof Award> = {
  award: Award,
  trophy: Trophy,
  code: Code,
  cloud: Cloud,
  github: Github,
  book: Book,
};

interface AchievementDetailProps {
  achievement: typeof achievements[0];
  onClose: () => void;
}

function AchievementDetail({ achievement, onClose }: AchievementDetailProps) {
  const Icon = iconMap[achievement.icon] || Award;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-cyber-dark/90 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />

      {/* Hologram Panel */}
      <motion.div
        className="relative z-10 w-full max-w-lg"
        initial={{ scale: 0.8, y: 50, rotateX: -10 }}
        animate={{ scale: 1, y: 0, rotateX: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div
          className="relative glass-panel-strong rounded-3xl p-8 overflow-hidden"
          style={{ borderColor: `${achievement.color}40` }}
        >
          {/* Hologram effect lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-0 right-0 h-px"
                style={{
                  top: `${20 + i * 15}%`,
                  background: `linear-gradient(90deg, transparent, ${achievement.color}20, transparent)`,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 glass-panel rounded-lg hover:bg-white/10 transition-colors"
            data-hoverable
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Badge Icon */}
          <motion.div
            className="relative w-24 h-24 mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${achievement.color}40, ${achievement.color}10)`,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-2 glass-panel rounded-xl flex items-center justify-center">
              <Icon className="w-10 h-10" style={{ color: achievement.color }} />
            </div>
            <motion.div
              className="absolute -inset-2 rounded-2xl"
              style={{ border: `2px solid ${achievement.color}30` }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Achievement Details */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="font-space-mono text-sm text-gray-400">{achievement.year}</span>
              </div>
              <h3 className="font-orbitron text-2xl font-bold text-white mb-3">
                {achievement.title}
              </h3>
              <p className="font-rajdhani text-gray-300">{achievement.description}</p>
            </motion.div>
          </div>

          {/* Sparkle Effects */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: achievement.color }} />
            </motion.div>
          ))}

          {/* Bottom gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${achievement.color}10, transparent)`,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AchievementVault() {
  const [selectedAchievement, setSelectedAchievement] = useState<typeof achievements[0] | null>(null);

  return (
    <section id="achievements" className="relative min-h-screen py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <motion.div
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyber-pink/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
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
          <p className="font-space-mono text-cyber-pink text-sm mb-2">CHAPTER 04</p>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            Achievement Vault
          </h2>
          <p className="font-rajdhani text-gray-400 text-lg max-w-2xl mx-auto">
            Unlockable artifacts showcasing milestones of excellence throughout the journey.
          </p>
        </motion.div>
      </div>

      {/* Achievements Grid */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {achievements.map((achievement) => {
            const Icon = iconMap[achievement.icon] || Award;
            return (
              <motion.div
                key={achievement.id}
                className="relative group"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <motion.div
                  className="glass-panel p-6 rounded-2xl cursor-pointer overflow-hidden"
                  onClick={() => setSelectedAchievement(achievement)}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ borderColor: `${achievement.color}20` }}
                  data-hoverable
                >
                  {/* Glow effect on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${achievement.color}15 0%, transparent 70%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon & Year */}
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${achievement.color}20` }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-7 h-7" style={{ color: achievement.color }} />
                      </motion.div>
                      <span className="font-space-mono text-xs px-2 py-1 rounded glass-panel text-gray-400">
                        {achievement.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-rajdhani text-xl font-semibold text-white mb-2 group-hover:text-cyber-blue transition-colors">
                      {achievement.title}
                    </h3>

                    {/* Description */}
                    <p className="font-rajdhani text-gray-400 text-sm mb-4">
                      {achievement.description}
                    </p>

                    {/* Unlock Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: achievement.color }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="font-space-mono text-xs text-gray-500">UNLOCKED</span>
                      </div>
                      <motion.div
                        className="flex items-center gap-1 text-cyber-blue"
                        whileHover={{ x: 5 }}
                      >
                        <span className="font-space-mono text-xs">VIEW</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div
                    className="absolute top-0 right-0 w-16 h-16 opacity-20"
                    style={{
                      background: `linear-gradient(135deg, ${achievement.color}, transparent)`,
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <AchievementDetail
          achievement={selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      )}
    </section>
  );
}
