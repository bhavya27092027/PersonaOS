import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { timeline } from '../../data/content';

export function OriginStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      id="origin"
      className="relative min-h-screen py-32 px-4 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 max-w-6xl mx-auto mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-space-mono text-cyber-blue text-sm mb-2">CHAPTER 01</p>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">
            Origin Story
          </h2>
          <p className="font-rajdhani text-gray-400 text-lg max-w-2xl mx-auto">
            Every hero has a beginning. This is the journey that shaped who I am today.
          </p>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Central Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyber-blue/50 to-transparent -translate-x-1/2" />

        {/* Progress Line */}
        <motion.div
          className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-cyber-blue via-cyber-cyan to-cyber-purple -translate-x-1/2"
          style={{ height: progressHeight }}
        />

        {/* Timeline Events */}
        {timeline.map((event, index) => (
          <motion.div
            key={event.year}
            className={`relative flex items-center mb-16 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Content Card */}
            <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
              <motion.div
                className="glass-panel p-6 rounded-2xl hover:border-cyber-blue/30 transition-all"
                whileHover={{ scale: 1.02 }}
                data-hoverable
              >
                <div
                  className={`flex items-center gap-3 mb-2 ${
                    index % 2 === 0 ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <motion.div
                    className="w-10 h-1 bg-gradient-to-r from-cyber-blue to-cyber-cyan rounded"
                    initial={{ width: 0 }}
                    whileInView={{ width: '2.5rem' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  />
                  <span className="font-orbitron text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue to-cyber-cyan">
                    {event.year}
                  </span>
                </div>
                <h3 className="font-rajdhani text-2xl font-semibold text-white mb-2">
                  {event.title}
                </h3>
                <p className="font-rajdhani text-gray-400">{event.description}</p>
              </motion.div>
            </div>

            {/* Center Node */}
            <div className="absolute left-1/2 -translate-x-1/2 z-10">
              <motion.div
                className="relative"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <div className="w-6 h-6 bg-cyber-dark border-4 border-cyber-blue rounded-full" />
                <div className="absolute inset-0 w-6 h-6 bg-cyber-blue rounded-full animate-ping opacity-30" />
              </motion.div>
            </div>

            {/* Empty Space for other side */}
            <div className="w-5/12" />
          </motion.div>
        ))}

        {/* End of Timeline */}
        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-lg rotate-45" />
            <div className="absolute inset-2 bg-cyber-dark rounded" />
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/3 left-4 opacity-20">
        <motion.div
          className="w-24 h-24 border border-cyber-blue rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <div className="absolute bottom-1/3 right-4 opacity-20">
        <motion.div
          className="w-32 h-32 border border-cyber-purple rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </section>
  );
}
