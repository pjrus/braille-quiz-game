'use client';

import { useTheme } from './ThemeProvider';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, accent, toggleTheme, cycleAccent } = useTheme();

  return (
    <div className={styles.group}>
      <button
        type="button"
        className={styles.accentBtn}
        onClick={cycleAccent}
        aria-label={`Change accent color. Current: ${accent}`}
        title={`Accent: ${accent}`}
      >
        <span className={styles.swatch} data-accent={accent} />
      </button>
      <button
        type="button"
        className={styles.themeBtn}
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        aria-pressed={theme === 'dark'}
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      >
        <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
      </button>
    </div>
  );
}