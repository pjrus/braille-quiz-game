'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ACCENTS, ACCENT_KEY, THEME_KEY, type Accent } from '@/lib/gameStorage';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  accent: Accent;
  toggleTheme: () => void;
  cycleAccent: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getSavedAccent(): Accent {
  if (typeof window === 'undefined') return 'purple';
  const saved = window.localStorage.getItem(ACCENT_KEY);
  return ACCENTS.includes(saved as Accent) ? (saved as Accent) : 'purple';
}

function applyToDocument(theme: Theme, accent: Accent) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.setAttribute('data-accent', accent);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0e0e12' : '#ffffff');
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getPreferredTheme);
  const [accent, setAccent] = useState<Accent>(getSavedAccent);

  // Apply initial values to document on first client render.
  if (typeof window !== 'undefined') {
    applyToDocument(theme, accent);
  }

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      applyToDocument(next, accent);
      window.localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }, [accent]);

  const cycleAccent = useCallback(() => {
    setAccent((prev) => {
      const idx = ACCENTS.indexOf(prev);
      const next = ACCENTS[(idx + 1) % ACCENTS.length];
      applyToDocument(theme, next);
      window.localStorage.setItem(ACCENT_KEY, next);
      return next;
    });
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, accent, toggleTheme, cycleAccent }),
    [theme, accent, toggleTheme, cycleAccent],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}