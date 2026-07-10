'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import GameHeaderStats from './GameHeaderStats';
import GameStartScreen from './GameStartScreen';
import GameActiveView from './GameActiveView';
import GameCompletionScreen from './GameCompletionScreen';
import { useGameSession } from '@/hooks/useGameSession';
import { useGameStats, usePersistedSettings } from '@/hooks/useGameStats';
import type { GameSettings } from '@/lib/gameStorage';

const FEEDBACK_MS = 1400;

export default function GameScreen() {
  const { settings, update: updateSettings } = usePersistedSettings();
  const { stats, recordGame, resetStats } = useGameStats();
  const { state, start, answer } = useGameSession(recordGame);

  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'incorrect';
    message: string;
  } | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, []);

  const handleStart = () => {
    setFeedback(null);
    setSelectedAnswer('');
    start({
      difficulty: settings.difficulty,
      gameLength: settings.gameLength,
      questionsPerGame: settings.questionsPerGame,
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
    updateSettings({ ...settings, ...next });
  };

  const showStartScreen = !state.isGameActive && !state.hasStarted;
  const showGame = state.isGameActive || Boolean(feedback);
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
    <div className="mx-auto max-w-[880px]">
      <GameHeaderStats
        score={state.score}
        question={`${Math.min(state.currentQuestionIndex + (showGame ? 1 : 0), state.totalQuestions)} / ${state.totalQuestions}`}
        time={`${state.timeRemaining}s`}
        streak={state.streak}
        timerLow={timerLow}
      />

      {showStartScreen ? (
        <GameStartScreen
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onStart={handleStart}
          stats={stats}
          onResetStats={handleResetStats}
          hasPlayed={stats.totalGames > 0}
        />
      ) : showGame ? (
        <GameActiveView
          question={state.currentQuestion}
          feedback={feedback}
          selected={selectedAnswer}
          onAnswer={handleAnswer}
          disabled={Boolean(feedback)}
        />
      ) : summary ? (
        <GameCompletionScreen summary={summary} onPlayAgain={handleStart} />
      ) : null}
    </div>
  );
}
