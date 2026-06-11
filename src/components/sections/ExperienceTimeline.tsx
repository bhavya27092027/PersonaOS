import { motion } from 'framer-motion';
import { experience } from '../../data/content';
import { Building, Calendar, ArrowRight } from 'lucide-react';

export function ExperienceTimeline() {
  return (
    <section id="timeline" className="relative min-h-screen py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <motion.div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyber-green/10 rounded-full blur-3xl"
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
          <p className="font-space-mono text-cyber-green text-sm mb-2">CHAPTER 06</p>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            Experience Timeline
          </h2>
          <p className="font-rajdhani text-gray-400 text-lg max-w-2xl mx-auto">
            The journey from beginner to engineer - a visual roadmap of growth and learning.
          </p>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="relative mb-12 last:mb-0"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Connection Line */}
            {index !== experience.length - 1 && (
              <div className="absolute left-6 top-24 bottom-0 w-px bg-gradient-to-b from-cyber-green/30 via-transparent to-transparent" />
            )}

            {/* Card */}
            <motion.div
              className="glass-panel rounded-2xl overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              data-hoverable
            >
              {/* Color Bar Top */}
              <div
                className="h-1"
                style={{
                  background: `linear-gradient(90deg, #10b981${60 + index * 20}, #22d3ee${60 + index * 20})`,
                }}
              />

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-cyber-green/20 flex items-center justify-center shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Building className="w-6 h-6 text-cyber-green" />
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="font-rajdhani text-xl font-semibold text-white">
                          {exp.title}
                        </h3>
                        <p className="font-rajdhani text-cyber-green">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="font-space-mono text-sm">{exp.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="font-rajdhani text-gray-300 mb-4">{exp.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 glass-panel rounded-full font-space-mono text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View More Arrow */}
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-cyber-green"
                  whileHover={{ x: 5 }}
                >
                  <span className="font-space-mono text-xs">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>

            {/* Milestone marker */}
            <motion.div
              className="absolute left-6 top-6 w-3 h-3 rounded-full bg-cyber-green"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Roadmap Summary */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="glass-panel rounded-2xl p-8">
          <h3 className="font-orbitron text-xl font-bold text-white mb-6 text-center">
            Career Progression
          </h3>

          <div className="flex justify-between items-center relative">
            {/* Connection line */}
            <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-cyber-green via-cyber-cyan to-cyber-blue" />

            {['Intern', 'Junior', 'Mid-Level', 'Senior'].map((stage, i) => (
              <motion.div
                key={stage}
                className="relative flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                    i <= 2 ? 'bg-cyber-green' : 'bg-gray-700'
                  }`}
                  animate={i <= 2 ? { boxShadow: ['0 0 0 0 #10b98100', '0 0 0 10px #10b98100'] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="font-orbitron text-xs text-cyber-dark">{i + 1}</span>
                </motion.div>
                <span className="font-rajdhani text-sm text-gray-400 mt-2">{stage}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
