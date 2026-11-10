import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    ArrowLeft,
    Zap,
    Timer,
    Flame,
    Trophy,
    RotateCcw,
    Check,
    X,
    Clock,
    Target,
    Gauge,
} from 'lucide-react';
import type { Question } from '../../quiz/types';
import { pickRushQuestions, RUSH_CATEGORY_LABELS } from '../../quiz/rush/registry';
import { CodeBlock } from './CodeBlock';

const GAME_DURATION = 60;
const FAST_ANSWER_THRESHOLD = 5;
const BASE_XP = 10;
const FAST_BONUS = 5;
const COMBO_XP = 2;
const AUTO_ADVANCE_DELAY = 1800;

type Phase = 'ready' | 'playing' | 'results';

interface AnswerRecord {
    question: Question;
    correct: boolean;
    xpEarned: number;
    timeMs: number;
    wasFast: boolean;
}

export function CodeRushPage({ onExit }: { onExit: () => void }) {
    const [phase, setPhase] = useState<Phase>('ready');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalXP, setTotalXP] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [answers, setAnswers] = useState<AnswerRecord[]>([]);
    const [fastestMs, setFastestMs] = useState<number | null>(null);

    const questionStartRef = useRef<number>(0);
    const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startGame = () => {
        setQuestions(pickRushQuestions(20));
        setCurrentIndex(0);
        setTotalXP(0);
        setStreak(0);
        setBestStreak(0);
        setTimeLeft(GAME_DURATION);
        setAnswers([]);
        setFastestMs(null);
        setPhase('playing');
    };

    // Countdown timer
    useEffect(() => {
        if (phase !== 'playing') return;
        const interval = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(interval);
                    setPhase('results');
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [phase]);

    // Track question start time
    useEffect(() => {
        if (phase === 'playing') {
            questionStartRef.current = Date.now();
        }
    }, [phase, currentIndex]);

    const handleAnswer = useCallback(
        (_selectedIndex: number, isCorrect: boolean, _xpEarned: number) => {
            const elapsedMs = Date.now() - questionStartRef.current;
            const elapsedSec = elapsedMs / 1000;
            const wasFast = elapsedSec < FAST_ANSWER_THRESHOLD;

            let earned = 0;
            if (isCorrect) {
                earned = BASE_XP;
                if (wasFast) earned += FAST_BONUS;
                const newStreak = streak + 1;
                earned += COMBO_XP * newStreak;
                setStreak(newStreak);
                setBestStreak((b) => Math.max(b, newStreak));
            } else {
                setStreak(0);
            }

            setTotalXP((xp) => xp + earned);
            setFastestMs((f) => (f === null ? elapsedMs : Math.min(f, elapsedMs)));

            const q = questions[currentIndex];
            setAnswers((a) => [...a, { question: q, correct: isCorrect, xpEarned: earned, timeMs: elapsedMs, wasFast }]);

            // Auto-advance
            autoAdvanceRef.current = setTimeout(() => {
                if (currentIndex + 1 >= questions.length) {
                    setPhase('results');
                } else {
                    setCurrentIndex((i) => i + 1);
                }
            }, AUTO_ADVANCE_DELAY);
        },
        [streak, questions, currentIndex],
    );

    const handleNext = useCallback(() => {
        if (autoAdvanceRef.current) {
            clearTimeout(autoAdvanceRef.current);
            autoAdvanceRef.current = null;
        }
        if (currentIndex + 1 >= questions.length) {
            setPhase('results');
        } else {
            setCurrentIndex((i) => i + 1);
        }
    }, [currentIndex, questions.length]);

    useEffect(() => {
        return () => {
            if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
        };
    }, []);

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
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-yellow/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-red/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
            </div>

            <div className="relative z-10 min-h-full">
                <AnimatePresence mode="wait">
                    {phase === 'ready' && (
                        <ReadyPhase key="ready" onStart={startGame} onExit={onExit} />
                    )}
                    {phase === 'playing' && (
                        <PlayingPhase
                            key="playing"
                            questions={questions}
                            currentIndex={currentIndex}
                            totalXP={totalXP}
                            streak={streak}
                            timeLeft={timeLeft}
                            onAnswer={handleAnswer}
                            onNext={handleNext}
                            onExit={onExit}
                        />
                    )}
                    {phase === 'results' && (
                        <ResultsPhase
                            key="results"
                            totalXP={totalXP}
                            answers={answers}
                            bestStreak={bestStreak}
                            fastestMs={fastestMs}
                            onPlayAgain={startGame}
                            onExit={onExit}
                        />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

/* ---------- READY ---------- */

function ReadyPhase({ onStart, onExit }: { onStart: () => void; onExit: () => void }) {
    return (
        <motion.div
            className="max-w-2xl mx-auto px-4 py-10 md:py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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
                    <Zap className="w-4 h-4 text-cyber-yellow" />
                    <span className="font-space-mono text-xs text-gray-400">CODE RUSH</span>
                </div>
            </div>

            <div className="text-center mb-10">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(251,191,36,0.15)' }}
                >
                    <Zap className="w-10 h-10 text-cyber-yellow" />
                </motion.div>
                <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-3">Code Rush</h1>
                <p className="font-rajdhani text-gray-400 text-lg max-w-xl mx-auto mb-8">
                    Answer as many questions as you can in 60 seconds. Fast answers earn bonus XP. Build a combo streak for even more.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
                <InfoCard icon={<Timer className="w-5 h-5" />} color="#fbbf24" label="60 Seconds" sub="Beat the clock" />
                <InfoCard icon={<Flame className="w-5 h-5" />} color="#f97316" label="Combo Streak" sub="+2 XP / streak" />
                <InfoCard icon={<Gauge className="w-5 h-5" />} color="#00d4ff" label="Fast Bonus" sub="+5 XP < 5s" />
            </div>

            <div className="glass-panel rounded-2xl p-4 mb-8">
                <span className="font-orbitron text-xs text-cyber-yellow tracking-wider mb-3 block">CATEGORIES</span>
                <div className="flex flex-wrap gap-2">
                    {Object.values(RUSH_CATEGORY_LABELS).map((label) => (
                        <span key={label} className="px-2.5 py-1 rounded-md font-space-mono text-[11px] text-gray-400 bg-white/[0.03] border border-white/10">
                            {label}
                        </span>
                    ))}
                </div>
            </div>

            <motion.button
                onClick={onStart}
                className="w-full py-4 rounded-xl font-rajdhani text-lg font-semibold flex items-center justify-center gap-2 text-white"
                style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.6), rgba(249,115,22,0.3))' }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                data-hoverable
            >
                <Zap className="w-5 h-5" />
                Start Rush
            </motion.button>
        </motion.div>
    );
}

function InfoCard({ icon, color, label, sub }: { icon: React.ReactNode; color: string; label: string; sub: string }) {
    return (
        <div className="glass-panel rounded-xl p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                <span style={{ color }}>{icon}</span>
            </div>
            <p className="font-orbitron text-xs font-bold text-white">{label}</p>
            <p className="font-space-mono text-[10px] text-gray-500 mt-0.5">{sub}</p>
        </div>
    );
}

/* ---------- PLAYING ---------- */

interface PlayingPhaseProps {
    questions: Question[];
    currentIndex: number;
    totalXP: number;
    streak: number;
    timeLeft: number;
    onAnswer: (selectedIndex: number, isCorrect: boolean, xpEarned: number) => void;
    onNext: () => void;
    onExit: () => void;
}

function PlayingPhase({
    questions,
    currentIndex,
    totalXP,
    streak,
    timeLeft,
    onAnswer,
    onNext,
    onExit,
}: PlayingPhaseProps) {
    const question = questions[currentIndex];
    if (!question) return null;

    const [selected, setSelected] = useState<number | null>(null);
    const [answered, setAnswered] = useState(false);

    const accent = '#fbbf24';
    const timerColor = timeLeft <= 10 ? '#ef4444' : timeLeft <= 20 ? '#fbbf24' : '#10b981';
    const categoryLabel = RUSH_CATEGORY_LABELS[question.category] ?? 'Mixed';

    const handleSelect = (i: number) => {
        if (answered) return;
        setSelected(i);
        setAnswered(true);
        const correct = i === question.correctIndex;
        onAnswer(i, correct, correct ? question.xp : 0);
    };

    const optionState = (i: number): 'idle' | 'correct' | 'wrong' | 'muted' => {
        if (!answered) return 'idle';
        if (i === question.correctIndex) return 'correct';
        if (i === selected) return 'wrong';
        return 'muted';
    };

    // Reset state when question changes
    const qid = question.id;
    useEffect(() => {
        setSelected(null);
        setAnswered(false);
    }, [qid]);

    return (
        <motion.div
            className="max-w-2xl mx-auto px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* HUD bar */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={onExit}
                    className="flex items-center gap-2 px-3 py-2 glass-panel rounded-xl text-gray-300 hover:text-white transition-colors"
                    data-hoverable
                >
                    <X className="w-4 h-4" />
                    <span className="font-rajdhani text-sm">Exit</span>
                </button>

                {/* Timer */}
                <motion.div
                    className="flex items-center gap-2 px-4 py-2 rounded-xl"
                    style={{ backgroundColor: `${timerColor}15`, border: `1px solid ${timerColor}40` }}
                    animate={timeLeft <= 10 ? { scale: [1, 1.05, 1] } : undefined}
                    transition={timeLeft <= 10 ? { duration: 0.5, repeat: Infinity } : undefined}
                >
                    <Timer className="w-5 h-5" style={{ color: timerColor }} />
                    <span className="font-orbitron text-xl font-bold" style={{ color: timerColor }}>
                        {timeLeft}s
                    </span>
                </motion.div>

                {/* XP + Streak */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass-panel">
                        <Zap className="w-4 h-4 text-cyber-yellow" />
                        <span className="font-orbitron text-sm font-bold text-white">{totalXP}</span>
                    </div>
                    {streak > 0 && (
                        <motion.div
                            key={streak}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
                            style={{ backgroundColor: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.4)' }}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 12 }}
                        >
                            <Flame className="w-4 h-4 text-cyber-red" />
                            <span className="font-orbitron text-sm font-bold text-cyber-red">{streak}</span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Streak banner */}
            {streak >= 3 && (
                <motion.div
                    className="mb-4 text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="font-orbitron text-sm font-bold text-cyber-red tracking-wider">
                        🔥 {streak}x COMBO STREAK!
                    </span>
                </motion.div>
            )}

            {/* Question card */}
            <motion.div
                className="relative glass-panel-strong rounded-3xl overflow-hidden"
                style={{ borderColor: `${accent}30` }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ type: 'spring', damping: 22 }}
                key={question.id}
            >
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

                <div className="p-6 md:p-8">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="px-2.5 py-1 rounded-md font-orbitron text-[11px] tracking-wide bg-cyber-yellow/15 text-cyber-yellow">
                            {categoryLabel.toUpperCase()}
                        </span>
                        {question.language && question.language !== 'text' && (
                            <span className="px-2.5 py-1 rounded-md font-orbitron text-[11px] tracking-wide bg-white/[0.04] text-gray-300 border border-white/10">
                                {question.language.toUpperCase()}
                            </span>
                        )}
                        <span className="font-space-mono text-xs text-gray-400 ml-auto">
                            Q {currentIndex + 1}
                        </span>
                    </div>

                    {/* Prompt */}
                    <h3 className="font-rajdhani text-xl md:text-2xl font-semibold text-white mb-5 leading-snug">
                        {question.prompt}
                    </h3>

                    {/* Code snippet */}
                    {question.codeSnippet && (
                        <div className="mb-5">
                            <CodeBlock code={question.codeSnippet} language={question.language} title={question.language} />
                        </div>
                    )}

                    {/* Options */}
                    <div className="grid gap-3">
                        {question.options.map((opt, i) => {
                            const state = optionState(i);
                            const styles: Record<string, React.CSSProperties> = {
                                idle: { borderColor: 'rgba(255,255,255,0.1)' },
                                correct: { borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)' },
                                wrong: { borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)' },
                                muted: { borderColor: 'rgba(255,255,255,0.05)', opacity: 0.4 },
                            };
                            return (
                                <motion.button
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    disabled={answered}
                                    className="relative text-left p-4 rounded-xl border transition-all overflow-hidden"
                                    style={styles[state]}
                                    whileHover={!answered ? { scale: 1.01 } : undefined}
                                    whileTap={!answered ? { scale: 0.98 } : undefined}
                                    data-hoverable
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-space-mono text-xs"
                                            style={{
                                                backgroundColor:
                                                    state === 'correct' ? '#10b981' : state === 'wrong' ? '#ef4444' : 'rgba(255,255,255,0.05)',
                                                color: state === 'correct' || state === 'wrong' ? '#fff' : '#9ca3af',
                                            }}
                                        >
                                            {state === 'correct' ? <Check className="w-4 h-4" /> : state === 'wrong' ? <X className="w-4 h-4" /> : String.fromCharCode(65 + i)}
                                        </span>
                                        <span className="font-rajdhani text-sm md:text-base text-gray-200">{opt}</span>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Brief explanation after answering */}
                    <AnimatePresence>
                        {answered && (
                            <motion.div
                                className="mt-5"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <div
                                    className="rounded-xl p-3 border"
                                    style={{
                                        backgroundColor: selected === question.correctIndex ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                                        borderColor: selected === question.correctIndex ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)',
                                    }}
                                >
                                    <p className="font-rajdhani text-sm text-gray-300 leading-relaxed">
                                        {question.explanation}
                                    </p>
                                </div>
                                <motion.button
                                    onClick={onNext}
                                    className="w-full mt-3 py-3 rounded-xl font-rajdhani text-base font-semibold flex items-center justify-center gap-2 text-white"
                                    style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.5), rgba(249,115,22,0.3))' }}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    data-hoverable
                                >
                                    Next →
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ---------- RESULTS ---------- */

interface ResultsPhaseProps {
    totalXP: number;
    answers: AnswerRecord[];
    bestStreak: number;
    fastestMs: number | null;
    onPlayAgain: () => void;
    onExit: () => void;
}

function ResultsPhase({ totalXP, answers, bestStreak, fastestMs, onPlayAgain, onExit }: ResultsPhaseProps) {
    const total = answers.length;
    const correct = answers.filter((a) => a.correct).length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const fastestSec = fastestMs !== null ? (fastestMs / 1000).toFixed(2) : '—';

    const rank =
        accuracy >= 90 && bestStreak >= 5
            ? { label: 'CODE MASTER', color: '#fbbf24' }
            : accuracy >= 75
                ? { label: 'SPEED RUNNER', color: '#10b981' }
                : accuracy >= 50
                    ? { label: 'QUICK THINKER', color: '#22d3ee' }
                    : accuracy >= 25
                        ? { label: 'WARMING UP', color: '#7c3aed' }
                        : { label: 'KEEP RUSHING', color: '#ef4444' };

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

            {/* Main results card */}
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
                <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-1">{totalXP} XP</h2>
                <p className="font-rajdhani text-gray-400 mb-6">Code Rush Complete</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <ResultStat icon={<Target className="w-4 h-4" />} label="Accuracy" value={`${accuracy}%`} color="#22d3ee" />
                    <ResultStat icon={<Check className="w-4 h-4" />} label="Solved" value={`${correct}/${total}`} color="#10b981" />
                    <ResultStat icon={<Flame className="w-4 h-4" />} label="Best Streak" value={`${bestStreak}x`} color="#f97316" />
                    <ResultStat icon={<Clock className="w-4 h-4" />} label="Fastest" value={`${fastestSec}s`} color="#fbbf24" />
                </div>

                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${rank.color}, var(--cyber-yellow))` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${accuracy}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </div>
            </motion.div>

            {/* Category performance */}
            <div className="glass-panel rounded-2xl p-5 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Gauge className="w-4 h-4 text-cyber-yellow" />
                    <h3 className="font-orbitron text-sm text-cyber-yellow tracking-wider">PERFORMANCE BY CATEGORY</h3>
                </div>
                <div className="space-y-3">
                    {(() => {
                        const catMap: Record<string, { total: number; correct: number }> = {};
                        for (const a of answers) {
                            const cat = RUSH_CATEGORY_LABELS[a.question.category] ?? a.question.category;
                            catMap[cat] ||= { total: 0, correct: 0 };
                            catMap[cat].total++;
                            if (a.correct) catMap[cat].correct++;
                        }
                        return Object.entries(catMap).map(([cat, s]) => {
                            const acc = Math.round((s.correct / s.total) * 100);
                            return (
                                <div key={cat}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="font-rajdhani text-sm text-gray-200">{cat}</span>
                                        <span className="font-space-mono text-xs text-gray-400">
                                            {s.correct}/{s.total} • {acc}%
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ background: acc >= 60 ? 'linear-gradient(90deg, #10b981, #22d3ee)' : 'linear-gradient(90deg, #ef4444, #fbbf24)' }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${acc}%` }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                        />
                                    </div>
                                </div>
                            );
                        });
                    })()}
                </div>
            </div>

            {/* Answer log */}
            <div className="glass-panel rounded-2xl p-5 mb-6">
                <h3 className="font-orbitron text-sm text-cyber-blue mb-4 tracking-wider">ANSWER LOG</h3>
                <div className="flex flex-wrap gap-2">
                    {answers.map((a, i) => (
                        <motion.span
                            key={i}
                            className="w-8 h-8 rounded-lg flex items-center justify-center font-space-mono text-xs"
                            style={{
                                backgroundColor: a.correct ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                                color: a.correct ? '#10b981' : '#ef4444',
                            }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.03 }}
                        >
                            {a.correct ? '✓' : '✗'}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <motion.button
                    onClick={onPlayAgain}
                    className="py-3.5 rounded-xl font-rajdhani text-lg font-semibold flex items-center justify-center gap-2 text-white"
                    style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.6), rgba(249,115,22,0.3))' }}
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

function ResultStat({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
    return (
        <div className="glass-panel rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1" style={{ color }}>
                {icon}
                <span className="font-orbitron text-base font-bold text-white">{value}</span>
            </div>
            <p className="font-space-mono text-[10px] text-gray-500">{label}</p>
        </div>
    );
}
