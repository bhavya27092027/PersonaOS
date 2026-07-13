import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Check, X, Zap, ChevronRight, Bug, CheckCheck } from 'lucide-react';
import type { Question } from '../../quiz/types';
import { DIFFICULTY_COLORS, BUG_TYPE_COLORS } from '../../quiz/types';
import { CodeBlock } from './CodeBlock';

interface QuestionCardProps {
    question: Question;
    index: number;
    total: number;
    score: number;
    onAnswer: (selectedIndex: number, isCorrect: boolean, xpEarned: number) => void;
    onNext: () => void;
}

export function QuestionCard({
    question,
    index,
    total,
    score,
    onAnswer,
    onNext,
}: QuestionCardProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [answered, setAnswered] = useState(false);
    const accent = DIFFICULTY_COLORS[question.difficulty];
    const progress = ((index + 1) / total) * 100;
    const isCorrect = selected === question.correctIndex;

    const handleSelect = (i: number) => {
        if (answered) return;
        setSelected(i);
        setAnswered(true);
        const correct = i === question.correctIndex;
        onAnswer(i, correct, correct ? question.xp : 0);
    };

    const handleNext = () => {
        setSelected(null);
        setAnswered(false);
        onNext();
    };

    const optionState = (i: number): 'idle' | 'correct' | 'wrong' | 'muted' => {
        if (!answered) return 'idle';
        if (i === question.correctIndex) return 'correct';
        if (i === selected) return 'wrong';
        return 'muted';
    };

    const hasCode = Boolean(question.codeSnippet);
    const bugColor = question.bugType ? BUG_TYPE_COLORS[question.bugType] : accent;

    return (
        <motion.div
            className="relative glass-panel-strong rounded-3xl overflow-hidden"
            style={{ borderColor: `${accent}30` }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: 'spring', damping: 22 }}
        >
            {/* Progress bar */}
            <div className="h-1.5 w-full bg-white/5">
                <motion.div
                    className="h-full rounded-r-full"
                    style={{ background: `linear-gradient(90deg, ${accent}, var(--cyber-blue))` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                />
            </div>

            <div className="p-6 md:p-8">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span
                        className="px-2.5 py-1 rounded-md font-orbitron text-[11px] tracking-wide"
                        style={{ backgroundColor: `${accent}20`, color: accent }}
                    >
                        {question.difficulty.toUpperCase()}
                    </span>
                    {question.bugType && (
                        <span
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md font-orbitron text-[11px] tracking-wide"
                            style={{ backgroundColor: `${bugColor}20`, color: bugColor }}
                        >
                            <Bug className="w-3 h-3" />
                            {question.bugType.toUpperCase()}
                        </span>
                    )}
                    <span className="font-space-mono text-xs text-gray-400 ml-auto">
                        Q {index + 1} / {total}
                    </span>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-panel">
                        <Zap className="w-3.5 h-3.5 text-cyber-yellow" />
                        <span className="font-space-mono text-xs text-gray-300">XP {score}</span>
                    </div>
                </div>

                {/* Prompt */}
                <AnimatePresence mode="wait">
                    <motion.h3
                        key={question.id}
                        className="font-rajdhani text-xl md:text-2xl font-semibold text-white mb-5 leading-snug"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {question.prompt}
                    </motion.h3>
                </AnimatePresence>

                {/* Code snippet (debug questions) */}
                {hasCode && (
                    <div className="mb-5">
                        <CodeBlock code={question.codeSnippet!} language={question.language} title={question.language} />
                    </div>
                )}

                {/* Options */}
                <div className="grid gap-3">
                    {question.options.map((opt, i) => {
                        const state = optionState(i);
                        const letter = String.fromCharCode(65 + i);
                        return (
                            <motion.button
                                key={i}
                                onClick={() => handleSelect(i)}
                                disabled={answered}
                                className="group relative w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 disabled:cursor-default"
                                style={{
                                    borderColor:
                                        state === 'correct'
                                            ? 'rgba(16,185,129,0.6)'
                                            : state === 'wrong'
                                                ? 'rgba(239,68,68,0.6)'
                                                : 'rgba(255,255,255,0.1)',
                                    backgroundColor:
                                        state === 'correct'
                                            ? 'rgba(16,185,129,0.12)'
                                            : state === 'wrong'
                                                ? 'rgba(239,68,68,0.12)'
                                                : 'rgba(255,255,255,0.02)',
                                    opacity: state === 'muted' ? 0.4 : 1,
                                }}
                                whileHover={!answered ? { scale: 1.01, x: 4 } : undefined}
                                data-hoverable
                            >
                                {/* Letter badge */}
                                <span
                                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-orbitron text-sm"
                                    style={{
                                        backgroundColor:
                                            state === 'correct'
                                                ? 'rgba(16,185,129,0.25)'
                                                : state === 'wrong'
                                                    ? 'rgba(239,68,68,0.25)'
                                                    : 'rgba(255,255,255,0.06)',
                                        color:
                                            state === 'correct'
                                                ? '#10b981'
                                                : state === 'wrong'
                                                    ? '#ef4444'
                                                    : '#9ca3af',
                                    }}
                                >
                                    {state === 'correct' ? (
                                        <Check className="w-4 h-4" />
                                    ) : state === 'wrong' ? (
                                        <X className="w-4 h-4" />
                                    ) : (
                                        letter
                                    )}
                                </span>

                                <span className="font-rajdhani text-base md:text-lg text-gray-100 flex-1">
                                    {opt}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Explanation + corrected code + Next */}
                <AnimatePresence>
                    {answered && (
                        <motion.div
                            className="mt-6"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div
                                className="rounded-xl p-4 border mb-4"
                                style={{
                                    backgroundColor: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                                    borderColor: isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)',
                                }}
                            >
                                <p
                                    className="font-orbitron text-xs mb-1.5"
                                    style={{ color: isCorrect ? '#10b981' : '#ef4444' }}
                                >
                                    {isCorrect ? `CORRECT  +${question.xp} XP` : 'INCORRECT'}
                                </p>
                                <p className="font-rajdhani text-sm text-gray-300 leading-relaxed">
                                    {question.explanation}
                                </p>
                            </div>

                            {/* Corrected code (when applicable) */}
                            {question.correctedCode && (
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCheck className="w-4 h-4 text-cyber-green" />
                                        <span className="font-orbitron text-xs text-cyber-green tracking-wider">
                                            CORRECTED CODE
                                        </span>
                                    </div>
                                    <CodeBlock code={question.correctedCode} language={question.language} title="fixed" />
                                </div>
                            )}

                            <motion.button
                                onClick={handleNext}
                                className="w-full py-3.5 rounded-xl font-rajdhani text-lg font-semibold flex items-center justify-center gap-2 text-white"
                                style={{ background: `linear-gradient(135deg, ${accent}60, ${accent}30)` }}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                data-hoverable
                            >
                                {index + 1 === total ? 'View Results' : 'Next Question'}
                                <ChevronRight className="w-5 h-5" />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
