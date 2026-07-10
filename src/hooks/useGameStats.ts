'use client';

import { useCallback, useState } from 'react';
import {
  DEFAULT_SETTINGS,
  DEFAULT_STATS,
  loadSettings,
  loadStats,
  saveSettings,
  saveStats,
  type GameSettings,
} from '@/lib/gameStorage';
import type { GameStats } from '@/types/braille';

function getInitialStats(): GameStats {
  if (typeof window === 'undefined') return DEFAULT_STATS;
  return loadStats();
}

function getInitialSettings(): GameSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  return loadSettings();
}

export function useGameStats() {
  const [stats, setStats] = useState<GameStats>(getInitialStats);

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
  const [settings, setSettings] = useState<GameSettings>(getInitialSettings);

  const update = useCallback((next: GameSettings) => {
    setSettings(next);
    saveSettings(next);
  }, []);

  return { settings, update };
}