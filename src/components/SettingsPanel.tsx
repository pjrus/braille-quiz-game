'use client';

import { useTheme } from '@/components/ThemeProvider';
import { ACCENTS, ACCENT_COLORS } from '@/lib/gameStorage';
import styles from './SettingsPanel.module.css';

export default function SettingsPanel() {
  const { theme, accent, setTheme, setAccent } = useTheme();

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Appearance</h2>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Theme</span>
        <div className={styles.themeOptions}>
          <button
            type="button"
            className={`${styles.themeBtn} ${theme === 'light' ? styles.themeBtnActive : ''}`}
            onClick={() => setTheme('light')}
            aria-pressed={theme === 'light'}
          >
            <span aria-hidden="true">☀</span> Light
          </button>
          <button
            type="button"
            className={`${styles.themeBtn} ${theme === 'dark' ? styles.themeBtnActive : ''}`}
            onClick={() => setTheme('dark')}
            aria-pressed={theme === 'dark'}
          >
            <span aria-hidden="true">☾</span> Dark
          </button>
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Accent color</span>
        <div className={styles.accentOptions}>
          {ACCENTS.map((a) => (
            <button
              key={a}
              type="button"
              className={`${styles.accentBtn} ${accent === a ? styles.accentBtnActive : ''}`}
              style={{ '--swatch-color': ACCENT_COLORS[a] } as React.CSSProperties}
              onClick={() => setAccent(a)}
              aria-label={`Accent: ${a}`}
              aria-pressed={accent === a}
              title={a}
            >
              <span className={styles.swatch} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
