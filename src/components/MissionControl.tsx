import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  User,
  Zap,
  Rocket,
  Trophy,
  Clock,
  Bot,
  Terminal,
  Menu,
  X,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: typeof User;
  color: string;
  section: string;
}

const navItems: NavItem[] = [
  { id: 'origin', label: 'Origin Story', icon: User, color: '#00d4ff', section: 'origin' },
  { id: 'skills', label: 'Skills Lab', icon: Zap, color: '#fbbf24', section: 'skills' },
  { id: 'projects', label: 'Project Universe', icon: Rocket, color: '#7c3aed', section: 'projects' },
  { id: 'achievements', label: 'Achievement Vault', icon: Trophy, color: '#ec4899', section: 'achievements' },
  { id: 'timeline', label: 'Experience Timeline', icon: Clock, color: '#10b981', section: 'timeline' },
  { id: 'ai', label: 'AI Companion', icon: Bot, color: '#22d3ee', section: 'ai' },
  { id: 'contact', label: 'Contact Terminal', icon: Terminal, color: '#FF9900', section: 'contact' },
];

export function MissionControl() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar - Desktop */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 hidden md:block"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: 'spring', damping: 20 }}
      >
        <div className="mx-auto max-w-7xl px-4 pt-4">
          <div className="glass-panel px-6 py-4 rounded-2xl">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                data-hoverable
              >
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-lg rotate-45" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-cyber-dark rounded" />
                </div>
                <span className="font-orbitron text-xl font-bold text-white">
                  BHAVYA<span className="text-cyber-blue">OS</span>
                </span>
              </motion.div>

              {/* Navigation Items */}
              <nav className="flex items-center gap-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.section)}
                    onMouseEnter={() => setActiveMenu(item.id)}
                    onMouseLeave={() => setActiveMenu(null)}
                    className="relative px-4 py-2 font-rajdhani text-sm text-gray-300 hover:text-white transition-colors group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-hoverable
                  >
                    <span className="relative z-10">{item.label}</span>

                    {/* Underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: item.color }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: activeMenu === item.id ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Glow */}
                    <div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)`,
                      }}
                    />
                  </motion.button>
                ))}
              </nav>

              {/* Status Indicator */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 glass-panel rounded-full">
                  <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                  <span className="font-space-mono text-xs text-gray-400">SYSTEM ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Button */}
      <motion.button
        className="fixed top-4 right-4 z-50 md:hidden glass-panel p-3 rounded-xl"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        data-hoverable
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden"
        initial={false}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
      >
        <div
          className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-xl"
          onClick={() => setMobileMenuOpen(false)}
        />
        <motion.nav
          className="absolute top-20 left-4 right-4 glass-panel-strong rounded-2xl p-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: mobileMenuOpen ? 0 : -20,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
        >
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.section)}
                className="flex items-center gap-4 w-full p-4 rounded-xl glass-panel hover:bg-white/5 transition-colors"
                initial={{ x: -20, opacity: 0 }}
                animate={{
                  x: mobileMenuOpen ? 0 : -20,
                  opacity: mobileMenuOpen ? 1 : 0,
                }}
                transition={{ delay: index * 0.05 }}
                data-hoverable
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <span className="font-rajdhani text-lg text-white">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.nav>
      </motion.div>

      {/* Side Dock - Desktop */}
      <motion.div
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="glass-panel p-3 rounded-2xl space-y-2">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.section)}
              className="group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-hoverable
            >
              <item.icon
                className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                style={{ color: undefined }}
              />
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `${item.color}30` }}
              />

              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-1 glass-panel rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                <span className="font-rajdhani text-sm text-white">{item.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
