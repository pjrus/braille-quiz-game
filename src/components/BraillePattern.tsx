'use client';

import type { BrailleCharacter } from '@/types/braille';
import styles from './BraillePattern.module.css';

interface BraillePatternProps {
  brailleCharacter: BrailleCharacter;
  size?: 'small' | 'medium' | 'large';
  showUnicode?: boolean;
}

export default function BraillePattern({
  brailleCharacter,
  size = 'medium',
  showUnicode = false,
}: BraillePatternProps) {
  const { braillePattern, unicode } = brailleCharacter;
  const positions = [0, 1, 2, 3, 4, 5];

  return (
    <div className={`${styles.pattern} ${styles[size]}`}>
      <div className={styles.grid} role="img" aria-label={`Braille pattern for ${brailleCharacter.displayName ?? brailleCharacter.letter}`}>
        <div className={styles.column}>
          {positions.slice(0, 3).map((p) => (
            <Dot key={p} active={braillePattern[p]} position={p + 1} />
          ))}
        </div>
        <div className={styles.column}>
          {positions.slice(3).map((p) => (
            <Dot key={p} active={braillePattern[p]} position={p + 1} />
          ))}
        </div>
      </div>
      {showUnicode && (
        <div className={styles.unicode} aria-hidden="true">{unicode}</div>
      )}
    </div>
  );
}

function Dot({ active, position }: { active: boolean; position: number }) {
  return (
    <span
      className={`${styles.dot} ${active ? styles.active : ''}`}
      data-position={position}
    />
  );
}