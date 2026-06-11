import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, Code, Rocket, GraduationCap, Compass } from 'lucide-react';
import { useAppStore, type VisitorType } from '../store/useAppStore';

const visitorTypes: Array<{ id: VisitorType; label: string; description: string; icon: typeof Briefcase; color: string }> = [
  {
    id: 'recruiter',
    label: 'Recruiter',
    description: 'Looking for talented engineers to join your team',
    icon: Briefcase,
    color: '#00d4ff',
  },
  {
    id: 'engineer',
    label: 'Software Engineer',
    description: 'Building cool stuff, interested in technical depth',
    icon: Code,
    color: '#10b981',
  },
  {
    id: 'founder',
    label: 'Founder',
    description: 'Looking for technical co-founders or partners',
    icon: Rocket,
    color: '#ec4899',
  },
  {
    id: 'student',
    label: 'Student',
    description: 'Learning and exploring career paths',
    icon: GraduationCap,
    color: '#fbbf24',
  },
  {
    id: 'explorer',
    label: 'Explorer',
    description: 'Just curious to check out this portfolio',
    icon: Compass,
    color: '#7c3aed',
  },
];

export function VisitorModal() {
  const { visitorModalOpen, setVisitorModalOpen, setVisitorType, visitorType } = useAppStore();

  const handleSelect = (type: VisitorType) => {
    setVisitorType(type);
    setTimeout(() => {
      setVisitorModalOpen(false);
    }, 500);
  };

  return (
    <AnimatePresence>
      {visitorModalOpen && (
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
            exit={{ opacity: 0 }}
            onClick={() => setVisitorModalOpen(false)}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="glass-panel-strong p-8 rounded-3xl border border-cyber-blue/20">
              {/* Close Button */}
              <button
                onClick={() => setVisitorModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                data-hoverable
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="font-space-mono text-cyber-blue text-sm mb-2">VISITOR IDENTIFICATION</p>
                  <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-2">
                    Who Are You?
                  </h2>
                  <p className="font-rajdhani text-gray-400 text-lg">
                    Help me personalize your experience
                  </p>
                </motion.div>
              </div>

              {/* Visitor Types Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {visitorTypes.map((type, index) => (
                  <motion.button
                    key={type.id}
                    onClick={() => handleSelect(type.id)}
                    className={`group relative p-6 glass-panel rounded-2xl text-left transition-all duration-300 ${
                      visitorType === type.id
                        ? 'border-2 scale-[1.02]'
                        : 'hover:border-cyber-blue/30'
                    }`}
                    style={{
                      borderColor: visitorType === type.id ? type.color : undefined,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-hoverable
                  >
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${type.color}20` }}
                    >
                      <type.icon className="w-6 h-6" style={{ color: type.color }} />
                    </div>

                    {/* Content */}
                    <h3 className="font-rajdhani text-xl font-semibold text-white mb-1">
                      {type.label}
                    </h3>
                    <p className="font-rajdhani text-gray-400 text-sm">
                      {type.description}
                    </p>

                    {/* Hover Glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${type.color}20 0%, transparent 70%)`,
                      }}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Skip Link */}
              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <button
                  onClick={() => setVisitorModalOpen(false)}
                  className="font-space-mono text-sm text-gray-500 hover:text-cyber-blue transition-colors"
                >
                  Skip for now
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
