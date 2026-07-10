'use client';

import { useCallback, useEffect, useReducer, useRef } from 'react';
import { generateQuestion } from '@/lib/questionGenerator';
import type { Difficulty, GameState, Question } from '@/types/braille';
import {
  DEFAULT_DIFFICULTY,
  DEFAULT_GAME_DURATION,
  DEFAULT_QUESTIONS_PER_GAME,
  POINTS_PER_CORRECT,
} from '@/types/braille';

export interface StartConfig {
  difficulty: Difficulty;
  gameLength: number;
  questionsPerGame: number;
}

interface SessionState extends GameState {
  difficulty: Difficulty;
  hasStarted: boolean;
}

type Action =
  | { type: 'START'; config: StartConfig; question: Question }
  | { type: 'TICK' }
  | { type: 'ANSWER'; answer: string }
  | { type: 'END_FROM_TIMEOUT' };

function initialState(): SessionState {
  return {
    currentQuestion: null,
    score: 0,
    totalQuestions: DEFAULT_QUESTIONS_PER_GAME,
    currentQuestionIndex: 0,
    isGameActive: false,
    timeRemaining: DEFAULT_GAME_DURATION,
    streak: 0,
    difficulty: DEFAULT_DIFFICULTY,
    hasStarted: false,
  };
}

function reducer(state: SessionState, action: Action): SessionState {
  switch (action.type) {
    case 'START': {
      const { config, question } = action;
      return {
        currentQuestion: question,
        score: 0,
        totalQuestions: config.questionsPerGame,
        currentQuestionIndex: 0,
        isGameActive: true,
        timeRemaining: config.gameLength,
        streak: 0,
        difficulty: config.difficulty,
        hasStarted: true,
      };
    }
    case 'TICK': {
      if (!state.isGameActive) return state;
      return { ...state, timeRemaining: Math.max(state.timeRemaining - 1, 0) };
    }
    case 'ANSWER': {
      if (!state.isGameActive || !state.currentQuestion) return state;
      const isCorrect = action.answer === state.currentQuestion.correctAnswer;
      const score = state.score + (isCorrect ? POINTS_PER_CORRECT : 0);
      const streak = isCorrect ? state.streak + 1 : 0;
      const nextIndex = state.currentQuestionIndex + 1;
      const gameOver = nextIndex >= state.totalQuestions;

      return {
        ...state,
        score,
        streak,
        currentQuestionIndex: nextIndex,
        isGameActive: !gameOver,
        currentQuestion: gameOver
          ? state.currentQuestion
          : generateQuestion(state.difficulty),
      };
    }
    case 'END_FROM_TIMEOUT': {
      return { ...state, isGameActive: false, timeRemaining: 0 };
    }
    default:
      return state;
  }
}

export function useGameSession(
  onComplete?: (score: number, streak: number) => void,
) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wasActiveRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  const stopTimer = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  const start = useCallback(
    (config: StartConfig) => {
      const question = generateQuestion(config.difficulty);
      stopTimer();
      dispatch({ type: 'START', config, question });
      tickRef.current = setInterval(() => dispatch({ type: 'TICK' }), 1000);
      wasActiveRef.current = true;
    },
    [stopTimer],
  );

  const answer = useCallback((value: string) => {
    dispatch({ type: 'ANSWER', answer: value });
  }, []);

  // End game when time runs out.
  useEffect(() => {
    if (state.isGameActive && state.timeRemaining === 0) {
      stopTimer();
      dispatch({ type: 'END_FROM_TIMEOUT' });
    }
  }, [state.isGameActive, state.timeRemaining, stopTimer]);

  // Fire completion callback exactly once when the game ends.
  useEffect(() => {
    if (wasActiveRef.current && !state.isGameActive) {
      wasActiveRef.current = false;
      onCompleteRef.current?.(state.score, state.streak);
    }
  }, [state.isGameActive, state.score, state.streak]);

  // Cleanup timer on unmount.
  useEffect(() => stopTimer, [stopTimer]);

  return { state, start, answer };
}