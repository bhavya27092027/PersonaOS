import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';

const bootLines = [
  { text: 'Initializing BhavyaOS...', delay: 0 },
  { text: 'Loading Digital Twin...', delay: 800 },
  { text: 'Analyzing Visitor...', delay: 1600 },
  { text: 'System Ready.', delay: 2400 },
];

export function BootSequence() {
  const [currentLine, setCurrentLine] = useState(0);
  const [showLines, setShowLines] = useState<boolean[]>([true, false, false, false]);
  const { bootComplete, setBootComplete } = useAppStore();

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    bootLines.forEach((_, index) => {
      const timer = setTimeout(() => {
        setShowLines((prev) => {
          const newLines = [...prev];
          newLines[index] = true;
          return newLines;
        });
        setCurrentLine(index);
      }, bootLines[index].delay);
      timers.push(timer);
    });

    const completeTimer = setTimeout(() => {
      setBootComplete(true);
    }, 3500);
    timers.push(completeTimer);

    return () => timers.forEach(clearTimeout);
  }, [setBootComplete]);

  return (
    <AnimatePresence>
      {!bootComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-darker"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: 'blur(10px)',
            transition: { duration: 0.8, ease: 'easeInOut' }
          }}
        >
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 cyber-grid opacity-30" />
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-cyber-blue/10 via-transparent to-transparent"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Boot Content */}
          <div className="relative z-10 text-center">
            {/* Logo/Icon */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ scale: [0.5, 1.1, 1], opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="relative">
                <motion.div
                  className="w-32 h-32 mx-auto border-4 border-cyber-blue/50 rounded-2xl rotate-45"
                  animate={{ rotate: 45 }}
                  style={{ rotate: 45 }}
                />
                <motion.div
                  className="absolute inset-0 w-32 h-32 mx-auto border-2 border-cyber-cyan/30 rounded-xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  style={{ margin: '0 auto' }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-lg shadow-lg shadow-cyber-blue/50"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </div>
            </motion.div>

            {/* System Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-2">
                BHAVYA<span className="text-cyber-blue">OS</span>
              </h1>
              <p className="font-rajdhani text-gray-400 text-lg">Digital Twin Experience v2.0</p>
            </motion.div>

            {/* Boot Text */}
            <div className="font-space-mono text-left space-y-2 max-w-md mx-auto px-4">
              {bootLines.map((line, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: showLines[index] ? 1 : 0,
                    x: showLines[index] ? 0 : -20,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    className="text-cyber-green"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showLines[index] ? 1 : 0 }}
                  >
                    {index === bootLines.length - 1 && showLines[index] ? '>' : '>'}
                  </motion.span>
                  <span className={`${index === currentLine ? 'text-cyber-blue' : 'text-gray-400'}`}>
                    {line.text}
                  </span>
                  {index === currentLine && showLines[index] && index !== bootLines.length - 1 && (
                    <motion.span
                      className="w-2 h-5 bg-cyber-blue"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                  {index === bootLines.length - 1 && showLines[index] && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-cyber-green ml-2"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <motion.div
              className="mt-8 max-w-md mx-auto px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-purple"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3.5, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 w-24 h-24 border-l-2 border-t-2 border-cyber-blue/20" />
          <div className="absolute top-4 right-4 w-24 h-24 border-r-2 border-t-2 border-cyber-blue/20" />
          <div className="absolute bottom-4 left-4 w-24 h-24 border-l-2 border-b-2 border-cyber-blue/20" />
          <div className="absolute bottom-4 right-4 w-24 h-24 border-r-2 border-b-2 border-cyber-blue/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
