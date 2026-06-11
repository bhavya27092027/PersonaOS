import { motion } from 'framer-motion';
import { personalInfo } from '../data/content';
import { Heart, Zap } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
        />

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            data-hoverable
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-lg rotate-45" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyber-dark rounded" />
            </div>
            <span className="font-orbitron text-lg font-bold text-white">
              BHAVYA<span className="text-cyber-blue">OS</span>
            </span>
          </motion.div>

          {/* Made With */}
          <motion.p
            className="font-rajdhani text-gray-400 text-sm flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Zap className="w-4 h-4 text-cyber-yellow" />
            </motion.span>
            using React, Three.js & Framer Motion
          </motion.p>

          {/* Copyright */}
          <motion.p
            className="font-space-mono text-xs text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </motion.p>
        </div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute bottom-0 left-1/4 w-2 h-2 rounded-full bg-cyber-blue/30"
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-2 h-2 rounded-full bg-cyber-purple/30"
          animate={{
            y: [0, -80, 0],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>
    </footer>
  );
}
