import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { personalInfo } from '../data/content';
import { useAppStore } from '../store/useAppStore';

export function Hero() {
  const { setVisitorModalOpen, setAiChatOpen } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    setMousePosition({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-40" />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-cyber-blue/20 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * 5,
          y: mousePosition.y * 5,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4 }}
        style={{ top: '20%', left: '10%' }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-cyber-purple/20 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * -3,
          y: mousePosition.y * -3,
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 5 }}
        style={{ bottom: '20%', right: '10%' }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Glitch Effect Name */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
          }}
        >
          <motion.h1
            className="font-orbitron text-6xl md:text-8xl lg:text-9xl font-black mb-4 relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-purple animate-gradient bg-[length:200%_auto]">
                {personalInfo.name}
              </span>
              {/* Glitch layers */}
              <span
                className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-cyber-pink to-cyber-blue"
                style={{ clipPath: 'inset(0 0 50% 0)', transform: 'translate(-2px, -2px)' }}
              >
                {personalInfo.name}
              </span>
              <span
                className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan to-cyber-green"
                style={{ clipPath: 'inset(50% 0 0 0)', transform: 'translate(2px, 2px)' }}
              >
                {personalInfo.name}
              </span>
            </span>
          </motion.h1>
        </motion.div>

        {/* Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="font-rajdhani text-2xl md:text-4xl font-light text-white mb-2">
            {personalInfo.title}
          </h2>
          <p className="font-space-mono text-lg md:text-xl text-gray-400">
            {personalInfo.subtitle}
          </p>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyber-blue" />
          <div className="w-2 h-2 rotate-45 bg-cyber-blue animate-pulse" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyber-blue" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.button
            onClick={() => setVisitorModalOpen(true)}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyber-blue to-cyber-cyan rounded-xl font-rajdhani text-lg font-semibold text-cyber-dark overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            data-hoverable
          >
            <span className="relative z-10 flex items-center gap-2">
              Enter Experience
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyber-purple to-cyber-pink"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>

          <motion.button
            onClick={() => setAiChatOpen(true)}
            className="group relative px-8 py-4 glass-panel border-cyber-blue/30 rounded-xl font-rajdhani text-lg font-semibold text-white overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            data-hoverable
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-blue opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyber-blue" />
              </span>
              Talk To AI Bhavya
            </span>
            <div className="absolute inset-0 bg-cyber-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {['4+ Years', '50+ Projects', '500+ Problems'].map((stat, i) => (
            <motion.div
              key={stat}
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              <div className="font-space-mono text-cyber-blue text-sm">{stat.split(' ')[1]}</div>
              <div className="font-orbitron text-2xl text-white">{stat.split(' ')[0]}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-cyber-blue/50 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-cyber-blue"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
