import { motion } from 'framer-motion';
import { useState } from 'react';
import { skills } from '../../data/content';
import { Zap, Filter } from 'lucide-react';

const categories = ['All', 'Frontend', 'Backend', 'Languages', 'AI', 'Database', 'DevOps', 'Cloud', 'API', '3D'];

export function SkillsLab() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="relative min-h-screen py-32 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-80 h-80 bg-cyber-yellow/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 max-w-6xl mx-auto mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-space-mono text-cyber-yellow text-sm mb-2">CHAPTER 02</p>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            Skills Lab
          </h2>
          <p className="font-rajdhani text-gray-400 text-lg max-w-2xl mx-auto">
            Power modules representing my technical capabilities. Each skill has been battle-tested in real-world scenarios.
          </p>
        </motion.div>
      </div>

      {/* Category Filter */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-rajdhani text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50'
                  : 'glass-panel text-gray-400 hover:text-white hover:border-cyber-blue/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-hoverable
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Skills Grid */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="relative glass-panel p-6 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
              whileHover={{ y: -5 }}
              layout
              data-hoverable
            >
              {/* Skill Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${skill.color}20` }}
                  >
                    <Zap className="w-5 h-5" style={{ color: skill.color }} />
                  </div>
                  <div>
                    <h3 className="font-rajdhani text-lg font-semibold text-white">
                      {skill.name}
                    </h3>
                    <p className="font-space-mono text-xs text-gray-500">{skill.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className="font-orbitron text-2xl font-bold"
                    style={{ color: skill.color }}
                  >
                    {skill.level}
                  </span>
                  <span className="text-gray-500 text-sm">/100</span>
                </div>
              </div>

              {/* Energy Bar */}
              <div className="relative h-4 bg-cyber-dark rounded-full overflow-hidden mb-2">
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-20 blur-sm"
                  style={{ background: `linear-gradient(90deg, ${skill.color} ${skill.level}%, transparent ${skill.level}%)` }}
                />

                {/* Fill */}
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                    boxShadow: `0 0 20px ${skill.color}50`,
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: hoveredSkill === skill.name ? ['-100%', '200%'] : '0%',
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: hoveredSkill === skill.name ? Infinity : 0,
                  }}
                />
              </div>

              {/* XP Level Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="xp-badge px-2 py-0.5 rounded text-xs font-orbitron text-white">
                    {skill.level >= 90 ? 'MASTER' : skill.level >= 80 ? 'EXPERT' : skill.level >= 70 ? 'PRO' : 'LEARNING'}
                  </span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: i < Math.floor(skill.level / 20) ? skill.color : '#333',
                      }}
                      whileHover={{ scale: 1.5 }}
                    />
                  ))}
                </div>
              </div>

              {/* Hover Particles */}
              {hoveredSkill === skill.name && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`,
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats Summary */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {[
          { label: 'Technologies', value: skills.length, color: '#00d4ff' },
          { label: 'Expert Level', value: skills.filter((s) => s.level >= 80).length, color: '#10b981' },
          { label: 'Master Level', value: skills.filter((s) => s.level >= 90).length, color: '#fbbf24' },
          { label: 'Categories', value: new Set(skills.map((s) => s.category)).size, color: '#7c3aed' },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel p-4 rounded-xl text-center" data-hoverable>
            <div className="font-orbitron text-3xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="font-rajdhani text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
