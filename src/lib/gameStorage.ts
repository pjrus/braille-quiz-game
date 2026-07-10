import type { GameStats } from '@/types/braille';
import {
  DEFAULT_DIFFICULTY,
  DEFAULT_GAME_DURATION,
  DEFAULT_QUESTIONS_PER_GAME,
  type Difficulty,
} from '@/types/braille';

export const SETTINGS_KEY = 'braille-game-settings-v2';
export const STATS_KEY = 'braille-game-stats-v2';
export const THEME_KEY = 'braille-game-theme';
export const ACCENT_KEY = 'braille-game-accent';

export type Accent = 'purple' | 'teal' | 'emerald' | 'amber' | 'rose' | 'blue';
export const ACCENTS: Accent[] = [
  'purple',
  'teal',
  'emerald',
  'amber',
  'rose',
  'blue',
];

export interface GameSettings {
  difficulty: Difficulty;
  gameLength: number;
  questionsPerGame: number;
}

export const DEFAULT_SETTINGS: GameSettings = {
  difficulty: DEFAULT_DIFFICULTY,
  gameLength: DEFAULT_GAME_DURATION,
  questionsPerGame: DEFAULT_QUESTIONS_PER_GAME,
};

export const DEFAULT_STATS: GameStats = {
  totalGames: 0,
  highScore: 0,
  averageScore: 0,
  bestStreak: 0,
};

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadSettings(): GameSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  const parsed = safeParse<Partial<GameSettings>>(
    window.localStorage.getItem(SETTINGS_KEY),
    {},
  );
  return { ...DEFAULT_SETTINGS, ...parsed };
}

export function saveSettings(settings: GameSettings): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadStats(): GameStats {
  if (typeof window === 'undefined') return DEFAULT_STATS;
  return safeParse<GameStats>(window.localStorage.getItem(STATS_KEY), DEFAULT_STATS);
}

export function saveStats(stats: GameStats): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}