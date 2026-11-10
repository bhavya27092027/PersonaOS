import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Bug,
  Zap,
  Check,
  ChevronRight,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { DEBUG_LANGUAGES, DEBUG_LANG_MAP, availableDebugDifficulties, countDebugByLang, pickDebugQuestions } from '../../quiz/debug/registry';
import { getCategoryIcon } from '../../quiz/icons';
import { DIFFICULTIES, DIFFICULTY_COLORS, DIFFICULTY_XP } from '../../quiz/types';
import type { CategoryMeta, Difficulty, QuizConfig } from '../../quiz/types';
import { QuizRunner } from './QuizRunner';

type Phase = 'setup' | 'running';

export function DebugChallengePage({ onExit }: { onExit: () => void }) {
  const [phase, setPhase] = useState<Phase>('setup');
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [config, setConfig] = useState<QuizConfig | null>(null);

  const difficulties = useMemo(
    () => (selectedLang ? availableDebugDifficulties(selectedLang) : []),
    [selectedLang],
  );

  const startQuiz = () => {
    if (!selectedLang || !selectedDifficulty) return;
    const questions = pickDebugQuestions(selectedLang, selectedDifficulty, 5);
    if (questions.length === 0) return;
    setConfig({ itemId: selectedLang, difficulty: selectedDifficulty, questions });
    setPhase('running');
  };

  const playAgain = () => {
    setConfig(null);
    setPhase('setup');
  };

  const meta: CategoryMeta | null = config
    ? DEBUG_LANG_MAP[config.itemId] ?? null
    : null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-cyber-dark overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-green/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-pink/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 min-h-full">
        <AnimatePresence mode="wait">
          {phase === 'setup' && (
            <SetupPhase
              key="setup"
              selectedLang={selectedLang}
              selectedDifficulty={selectedDifficulty}
              onSelectLang={(id) => {
                setSelectedLang(id);
                setSelectedDifficulty(null);
              }}
              onSelectDifficulty={setSelectedDifficulty}
              difficulties={difficulties}
              onStart={startQuiz}
              onExit={onExit}
            />
          )}

          {phase === 'running' && config && meta && (
            <QuizRunner
              key="runner"
              config={config}
              meta={meta}
              onPlayAgain={playAgain}
              onExit={onExit}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ---------- SETUP ---------- */

interface SetupPhaseProps {
  selectedLang: string | null;
  selectedDifficulty: Difficulty | null;
  difficulties: Difficulty[];
  onSelectLang: (id: string) => void;
  onSelectDifficulty: (d: Difficulty) => void;
  onStart: () => void;
  onExit: () => void;
}

function SetupPhase({
  selectedLang,
  selectedDifficulty,
  difficulties,
  onSelectLang,
  onSelectDifficulty,
  onStart,
  onExit,
}: SetupPhaseProps) {
  const canStart = selectedLang && selectedDifficulty;

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-10 md:py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 glass-panel rounded-xl text-gray-300 hover:text-white transition-colors"
          data-hoverable
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-rajdhani text-sm">Back</span>
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 glass-panel rounded-full">
          <Bug className="w-4 h-4 text-cyber-green" />
          <span className="font-space-mono text-xs text-gray-400">DEBUG CHALLENGE</span>
        </div>
      </div>

      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: 'rgba(16,185,129,0.15)' }}
        >
          <Bug className="w-10 h-10 text-cyber-green" />
        </motion.div>
        <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-3">
          Debug The Code
        </h1>
        <p className="font-rajdhani text-gray-400 text-lg max-w-xl mx-auto">
          Spot the bug in each code snippet. Choose a language and difficulty, then fix five snippets to earn XP.
        </p>
      </div>

      {/* Bug type legend */}
      <div className="glass-panel rounded-2xl p-4 mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Terminal className="w-4 h-4 text-cyber-green" />
          <span className="font-orbitron text-xs text-cyber-green tracking-wider">CHALLENGE TYPES</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['Syntax Error', 'Logical Bug', 'Runtime Error', 'Incorrect Output', 'Incorrect Condition', 'Infinite Loop', 'Off-By-One'] as const).map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-md font-space-mono text-[11px] text-gray-400 bg-white/[0.03] border border-white/10">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-10">
        <h2 className="font-orbitron text-sm text-cyber-green mb-4 tracking-wider">
          01 / SELECT LANGUAGE
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DEBUG_LANGUAGES.map((lang, i) => {
            const Icon = getCategoryIcon(lang.iconKey);
            const active = selectedLang === lang.id;
            const count = countDebugByLang(lang.id);
            return (
              <motion.button
                key={lang.id}
                onClick={() => onSelectLang(lang.id)}
                className="relative group glass-panel rounded-2xl p-4 text-left overflow-hidden transition-all"
                style={{
                  borderColor: active ? `${lang.color}80` : 'rgba(255,255,255,0.1)',
                  backgroundColor: active ? `${lang.color}10` : undefined,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -3 }}
                data-hoverable
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `radial-gradient(circle at center, ${lang.color}12 0%, transparent 70%)` }}
                />
                <div className="relative flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${lang.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: lang.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-rajdhani text-sm font-semibold text-white truncate">
                      {lang.label}
                    </p>
                    <p className="font-space-mono text-[10px] text-gray-500">{count} snippets</p>
                  </div>
                </div>
                {active && (
                  <motion.div
                    className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: lang.color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="w-3 h-3 text-cyber-dark" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Difficulty */}
      <AnimatePresence>
        {selectedLang && (
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h2 className="font-orbitron text-sm text-cyber-green mb-4 tracking-wider">
              02 / SELECT DIFFICULTY
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {DIFFICULTIES.map((d) => {
                const color = DIFFICULTY_COLORS[d];
                const active = selectedDifficulty === d;
                const enabled = difficulties.includes(d);
                return (
                  <motion.button
                    key={d}
                    onClick={() => enabled && onSelectDifficulty(d)}
                    disabled={!enabled}
                    className="relative glass-panel rounded-2xl p-5 text-center overflow-hidden transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      borderColor: active ? `${color}80` : 'rgba(255,255,255,0.1)',
                      backgroundColor: active ? `${color}10` : undefined,
                    }}
                    whileHover={enabled ? { y: -3 } : undefined}
                    data-hoverable
                  >
                    <div
                      className="w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Zap className="w-6 h-6" style={{ color }} />
                    </div>
                    <p className="font-orbitron text-sm font-bold text-white">{d}</p>
                    <p className="font-space-mono text-[10px] text-gray-500 mt-1">
                      +{DIFFICULTY_XP[d]} XP / q
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {canStart && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              onClick={onStart}
              className="w-full py-4 rounded-xl font-rajdhani text-lg font-semibold flex items-center justify-center gap-2 text-white"
              style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.6), rgba(0,212,255,0.3))' }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              data-hoverable
            >
              <Sparkles className="w-5 h-5" />
              Start Debugging
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
