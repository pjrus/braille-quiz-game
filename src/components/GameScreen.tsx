'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import BrailleSequence from './BrailleSequence';
import { useGameSession } from '@/hooks/useGameSession';
import { useGameStats, usePersistedSettings } from '@/hooks/useGameStats';
import { DEFAULT_SETTINGS, type GameSettings } from '@/lib/gameStorage';
import type { Difficulty } from '@/types/braille';
import styles from './GameScreen.module.css';

const FEEDBACK_MS = 1400;

export default function GameScreen() {
  const { settings, update: updateSettings } = usePersistedSettings();
  const { stats, recordGame, resetStats } = useGameStats();
  const { state, start, answer } = useGameSession(recordGame);

  const [draft, setDraft] = useState<GameSettings>(settings ?? DEFAULT_SETTINGS);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'incorrect';
    message: string;
  } | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (settings) setDraft(settings);
  }, [settings]);

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, []);

  const handleStart = () => {
    setFeedback(null);
    setSelectedAnswer('');
    start({
      difficulty: draft.difficulty,
      gameLength: draft.gameLength,
      questionsPerGame: draft.questionsPerGame,
    });
  };

  const handleAnswer = (value: string) => {
    if (!state.isGameActive || !state.currentQuestion || feedback) return;
    setSelectedAnswer(value);
    const isCorrect = value === state.currentQuestion.correctAnswer;
    setFeedback({
      type: isCorrect ? 'correct' : 'incorrect',
      message: isCorrect
        ? 'Correct!'
        : `Wrong — the answer was ${state.currentQuestion.correctAnswer}`,
    });
    answer(value);

    feedbackTimer.current = setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer('');
    }, FEEDBACK_MS);
  };

  const handleResetStats = () => {
    if (window.confirm('Reset all statistics? This cannot be undone.')) {
      resetStats();
    }
  };

  const handleSettingsChange = (next: Partial<GameSettings>) => {
    const merged = { ...draft, ...next };
    setDraft(merged);
    if (settings) updateSettings(merged);
  };

  const showStartScreen = !state.isGameActive && !state.hasStarted;
  const showGame = state.isGameActive || Boolean(feedback);

  const settingsReady = settings !== null;
  const timerLow = state.isGameActive && state.timeRemaining <= 10;

  const summary = useMemo(() => {
    if (state.hasStarted && !state.isGameActive) {
      return {
        score: state.score,
        streak: state.streak,
        answered: state.currentQuestionIndex,
        total: state.totalQuestions,
      };
    }
    return null;
  }, [state.hasStarted, state.isGameActive, state.score, state.streak, state.currentQuestionIndex, state.totalQuestions]);

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <h1 className={styles.title}>Braille Character Quiz</h1>
        <div className={styles.info} aria-live="polite">
          <Stat label="Score" value={state.score} />
          <Stat label="Question" value={`${Math.min(state.currentQuestionIndex + (showGame ? 1 : 0), state.totalQuestions)} / ${state.totalQuestions}`} />
          <Stat label="Time" value={`${state.timeRemaining}s`} danger={timerLow} />
          <Stat label="Streak" value={state.streak} />
        </div>
      </header>

      <section className={styles.content}>
        {!settingsReady ? (
          <p className={styles.loading}>Loading…</p>
        ) : showStartScreen ? (
          <StartScreen
            draft={draft}
            onSettingsChange={handleSettingsChange}
            onStart={handleStart}
            stats={stats}
            onResetStats={handleResetStats}
            hasPlayed={stats.totalGames > 0}
          />
        ) : showGame ? (
          <ActiveGame
            question={state.currentQuestion}
            feedback={feedback}
            selected={selectedAnswer}
            onAnswer={handleAnswer}
            disabled={Boolean(feedback)}
          />
        ) : summary ? (
          <CompletionScreen summary={summary} onPlayAgain={handleStart} />
        ) : null}
      </section>
    </div>
  );
}

function Stat({ label, value, danger }: { label: string; value: string | number; danger?: boolean }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statLabel}>{label}</span>
      <span className={`${styles.statValue} ${danger ? styles.danger : ''}`} style={danger ? { fontVariantNumeric: 'tabular-nums' } : undefined}>{value}</span>
    </div>
  );
}

function StartScreen({
  draft,
  onSettingsChange,
  onStart,
  stats,
  onResetStats,
  hasPlayed,
}: {
  draft: GameSettings;
  onSettingsChange: (next: Partial<GameSettings>) => void;
  onStart: () => void;
  stats: { totalGames: number; highScore: number; averageScore: number; bestStreak: number };
  onResetStats: () => void;
  hasPlayed: boolean;
}) {
  return (
    <div className={styles.start}>
      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>Game Settings</h2>

        <div className={styles.field}>
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            autoComplete="off"
            value={draft.difficulty}
            onChange={(e) => onSettingsChange({ difficulty: e.target.value as Difficulty })}
          >
            <option value="easy">Easy — lowercase only</option>
            <option value="medium">Medium — lowercase + capitals</option>
            <option value="hard">Hard — includes numbers</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="gameLength">Game Length (seconds)</label>
          <input
            id="gameLength"
            name="gameLength"
            type="number"
            inputMode="numeric"
            autoComplete="off"
            min={10}
            max={300}
            value={draft.gameLength}
            onChange={(e) => onSettingsChange({ gameLength: Math.max(10, Math.min(300, Number(e.target.value) || 10)) })}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="questions">Number of Questions</label>
          <input
            id="questions"
            name="questions"
            type="number"
            inputMode="numeric"
            autoComplete="off"
            min={1}
            max={100}
            value={draft.questionsPerGame}
            onChange={(e) => onSettingsChange({ questionsPerGame: Math.max(1, Math.min(100, Number(e.target.value) || 1)) })}
          />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.primaryBtn} onClick={onStart}>
            {hasPlayed ? 'Play Again' : 'Start Game'}
          </button>
        </div>
      </div>

      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>Your Statistics</h2>
        <div className={styles.statsGrid}>
          <StatCard label="Games Played" value={stats.totalGames} />
          <StatCard label="High Score" value={stats.highScore} />
          <StatCard label="Average Score" value={stats.averageScore} />
          <StatCard label="Best Streak" value={stats.bestStreak} />
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.secondaryBtn} onClick={onResetStats}>
            Reset Stats
          </button>
        </div>
      </div>

      <div className={styles.instructions}>
        <h3>How to Play</h3>
        <ul>
          <li>Lowercase questions show a single Braille pattern.</li>
          <li>Number questions show the number sign (⠼) before the pattern.</li>
          <li>Capital questions show the capital sign (⠠) before the pattern.</li>
          <li>Pick the matching letter or number from four options.</li>
          <li>Each correct answer scores 10 points — keep your streak alive!</li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statCardValue} style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      <span className={styles.statCardLabel}>{label}</span>
    </div>
  );
}

function ActiveGame({
  question,
  feedback,
  selected,
  onAnswer,
  disabled,
}: {
  question: { questionText?: string; brailleCharacters: import('@/types/braille').BrailleCharacter[]; options: string[] } | null;
  feedback: { type: 'correct' | 'incorrect'; message: string } | null;
  selected: string;
  onAnswer: (value: string) => void;
  disabled: boolean;
}) {
  if (!question) return null;
  return (
    <div className={styles.game}>
      <h2 className={styles.questionText}>{question.questionText ?? 'What letter or number is this?'}</h2>

      <div className={styles.brailleDisplay}>
        <BrailleSequence brailleCharacters={question.brailleCharacters} size="large" />
      </div>

      {feedback && (
        <div
          className={`${styles.feedback} ${feedback.type === 'correct' ? styles.feedbackCorrect : styles.feedbackWrong}`}
          role="status"
          aria-live="polite"
        >
          {feedback.message}
        </div>
      )}

      <div className={styles.options}>
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            className={`${styles.option} ${selected === option ? styles.optionSelected : ''}`}
            onClick={() => onAnswer(option)}
            disabled={disabled}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function CompletionScreen({
  summary,
  onPlayAgain,
}: {
  summary: { score: number; streak: number; answered: number; total: number };
  onPlayAgain: () => void;
}) {
  return (
    <div className={styles.completion}>
      <h2 className={styles.panelTitle}>Game Over</h2>
      <p className={styles.completionLead}>You answered {summary.answered} of {summary.total} questions.</p>
      <div className={styles.statsGrid}>
        <StatCard label="Final Score" value={summary.score} />
        <StatCard label="Best Streak" value={summary.streak} />
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.primaryBtn} onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
}