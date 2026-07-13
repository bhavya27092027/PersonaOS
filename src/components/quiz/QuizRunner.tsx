import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
    ArrowLeft,
    Brain,
    Zap,
    Trophy,
    RotateCcw,
    Check,
    X,
} from 'lucide-react';
import type { CategoryMeta, Question, QuizConfig } from '../../quiz/types';
import { getCategoryIcon } from '../../quiz/icons';
import { QuestionCard } from './QuestionCard';

export interface QuizRunnerProps {
    config: QuizConfig;
    meta: CategoryMeta;
    onPlayAgain: () => void;
    onExit: () => void;
}

export function QuizRunner({ config, meta, onPlayAgain, onExit }: QuizRunnerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [phase, setPhase] = useState<'playing' | 'results'>('playing');
    const [answers, setAnswers] = useState<{ question: Question; selected: number; correct: boolean }[]>([]);

    const handleAnswer = (selected: number, isCorrect: boolean, xpEarned: number) => {
        const q = config.questions[currentIndex];
        setScore((s) => s + xpEarned);
        if (isCorrect) setCorrectCount((c) => c + 1);
        setAnswers((a) => [...a, { question: q, selected, correct: isCorrect }]);
    };

    const handleNext = () => {
        if (currentIndex + 1 >= config.questions.length) {
            setPhase('results');
        } else {
            setCurrentIndex((i) => i + 1);
        }
    };

    const Icon = getCategoryIcon(meta.iconKey);

    return (
        <AnimatePresence mode="wait">
            {phase === 'playing' && (
                <motion.div
                    key="playing"
                    className="max-w-2xl mx-auto px-4 py-10 md:py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={onExit}
                            className="flex items-center gap-2 px-4 py-2 glass-panel rounded-xl text-gray-300 hover:text-white transition-colors"
                            data-hoverable
                        >
                            <X className="w-4 h-4" />
                            <span className="font-rajdhani text-sm">Exit</span>
                        </button>
                        <div className="flex items-center gap-2 px-3 py-1.5 glass-panel rounded-full">
                            <Icon className="w-4 h-4" style={{ color: meta.color }} />
                            <span className="font-space-mono text-xs text-gray-400">{meta.label.toUpperCase()}</span>
                        </div>
                    </div>

                    <QuestionCard
                        key={config.questions[currentIndex].id}
                        question={config.questions[currentIndex]}
                        index={currentIndex}
                        total={config.questions.length}
                        score={score}
                        onAnswer={handleAnswer}
                        onNext={handleNext}
                    />
                </motion.div>
            )}

            {phase === 'results' && (
                <ResultsPhase
                    key="results"
                    config={config}
                    meta={meta}
                    score={score}
                    correctCount={correctCount}
                    answers={answers}
                    onPlayAgain={onPlayAgain}
                    onExit={onExit}
                />
            )}
        </AnimatePresence>
    );
}

interface ResultsPhaseProps {
    config: QuizConfig;
    meta: CategoryMeta;
    score: number;
    correctCount: number;
    answers: { question: Question; selected: number; correct: boolean }[];
    onPlayAgain: () => void;
    onExit: () => void;
}

function ResultsPhase({
    config,
    meta,
    score,
    correctCount,
    answers,
    onPlayAgain,
    onExit,
}: ResultsPhaseProps) {
    const total = config.questions.length;
    const percentage = Math.round((correctCount / total) * 100);

    const rank =
        percentage === 100
            ? { label: 'PERFECT', color: '#fbbf24' }
            : percentage >= 80
                ? { label: 'EXPERT', color: '#10b981' }
                : percentage >= 60
                    ? { label: 'SKILLED', color: '#22d3ee' }
                    : percentage >= 40
                        ? { label: 'NOVICE', color: '#7c3aed' }
                        : { label: 'KEEP TRAINING', color: '#ef4444' };

    return (
        <motion.div
            className="max-w-2xl mx-auto px-4 py-10 md:py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={onExit}
                    className="flex items-center gap-2 px-4 py-2 glass-panel rounded-xl text-gray-300 hover:text-white transition-colors"
                    data-hoverable
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-rajdhani text-sm">Back to Portfolio</span>
                </button>
            </div>

            <motion.div
                className="glass-panel-strong rounded-3xl p-8 text-center mb-6"
                style={{ borderColor: `${rank.color}30` }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 18 }}
            >
                <motion.div
                    className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${rank.color}20` }}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Trophy className="w-10 h-10" style={{ color: rank.color }} />
                </motion.div>

                <p className="font-orbitron text-sm tracking-widest mb-2" style={{ color: rank.color }}>
                    {rank.label}
                </p>
                <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-1">
                    {score} XP
                </h2>
                <p className="font-rajdhani text-gray-400 mb-6">
                    {meta.label} • {config.difficulty}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                    <Stat label="Correct" value={`${correctCount}/${total}`} color="#10b981" icon={<Check className="w-4 h-4" />} />
                    <Stat label="Accuracy" value={`${percentage}%`} color="#22d3ee" icon={<Zap className="w-4 h-4" />} />
                    <Stat label="Questions" value={`${total}`} color="#fbbf24" icon={<Brain className="w-4 h-4" />} />
                </div>

                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${rank.color}, var(--cyber-blue))` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </div>
            </motion.div>

            <div className="glass-panel rounded-2xl p-5 mb-6">
                <h3 className="font-orbitron text-sm text-cyber-blue mb-4 tracking-wider">REVIEW</h3>
                <div className="space-y-3">
                    {answers.map((a, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02]">
                            <span
                                className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center"
                                style={{
                                    backgroundColor: a.correct ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                                    color: a.correct ? '#10b981' : '#ef4444',
                                }}
                            >
                                {a.correct ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="font-rajdhani text-sm text-gray-200 line-clamp-2">{a.question.prompt}</p>
                                <p className="font-space-mono text-[11px] text-gray-500 mt-0.5">
                                    Answer: {a.question.options[a.question.correctIndex]}
                                </p>
                            </div>
                            <span className="font-space-mono text-xs text-gray-400 shrink-0">
                                {a.correct ? `+${a.question.xp}` : '+0'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <motion.button
                    onClick={onPlayAgain}
                    className="py-3.5 rounded-xl font-rajdhani text-lg font-semibold flex items-center justify-center gap-2 text-white"
                    style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.6), rgba(0,212,255,0.3))' }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    data-hoverable
                >
                    <RotateCcw className="w-5 h-5" />
                    Play Again
                </motion.button>
                <motion.button
                    onClick={onExit}
                    className="py-3.5 rounded-xl font-rajdhani text-lg font-semibold flex items-center justify-center gap-2 text-gray-300 glass-panel"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    data-hoverable
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Portfolio
                </motion.button>
            </div>
        </motion.div>
    );
}

function Stat({
    label,
    value,
    color,
    icon,
}: {
    label: string;
    value: string;
    color: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="glass-panel rounded-xl p-3">
            <div className="flex items-center justify-center gap-1.5 mb-1" style={{ color }}>
                {icon}
                <span className="font-orbitron text-lg font-bold text-white">{value}</span>
            </div>
            <p className="font-space-mono text-[10px] text-gray-500">{label}</p>
        </div>
    );
}
