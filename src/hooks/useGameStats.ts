'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_STATS,
  loadStats,
  saveStats,
  type GameSettings,
  loadSettings,
  saveSettings,
} from '@/lib/gameStorage';
import type { GameStats } from '@/types/braille';

export function useGameStats() {
  const [stats, setStats] = useState<GameStats>(DEFAULT_STATS);

  useEffect(() => {
    setStats(loadStats());
  }, []);

  const recordGame = useCallback((score: number, streak: number) => {
    setStats((prev) => {
      const totalGames = prev.totalGames + 1;
      const next: GameStats = {
        totalGames,
        highScore: Math.max(prev.highScore, score),
        averageScore: Math.round(
          (prev.averageScore * prev.totalGames + score) / totalGames,
        ),
        bestStreak: Math.max(prev.bestStreak, streak),
      };
      saveStats(next);
      return next;
    });
  }, []);

  const resetStats = useCallback(() => {
    setStats(DEFAULT_STATS);
    saveStats(DEFAULT_STATS);
  }, []);

  return { stats, recordGame, resetStats };
}

export function usePersistedSettings() {
  const [settings, setSettings] = useState<GameSettings | null>(null);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const update = useCallback((next: GameSettings) => {
    setSettings(next);
    saveSettings(next);
  }, []);

  return { settings, update };
}