'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getPreferredTheme(): Theme {
  const saved = window.localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getSavedAccent(): Accent {
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
  // Matches the server-rendered defaults in layout.tsx; real values are
  // read from localStorage after mount to avoid a hydration mismatch.
  const [theme, setThemeState] = useState<Theme>('light');
  const [accent, setAccentState] = useState<Accent>('purple');

  useEffect(() => {
    const nextTheme = getPreferredTheme();
    const nextAccent = getSavedAccent();
    // One-time sync from localStorage after the SSR-safe first paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(nextTheme);
    setAccentState(nextAccent);
    applyToDocument(nextTheme, nextAccent);
  }, []);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      applyToDocument(next, accent);
      window.localStorage.setItem(THEME_KEY, next);
    },
    [accent],
  );

  const setAccent = useCallback(
    (next: Accent) => {
      setAccentState(next);
      applyToDocument(theme, next);
      window.localStorage.setItem(ACCENT_KEY, next);
    },
    [theme],
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const cycleAccent = useCallback(() => {
    const idx = ACCENTS.indexOf(accent);
    setAccent(ACCENTS[(idx + 1) % ACCENTS.length]);
  }, [accent, setAccent]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, accent, toggleTheme, cycleAccent, setTheme, setAccent }),
    [theme, accent, toggleTheme, cycleAccent, setTheme, setAccent],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}