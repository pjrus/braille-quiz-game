'use client';

import type { BrailleCharacter } from '@/types/braille';
import BraillePattern from './BraillePattern';
import styles from './BrailleSequence.module.css';

interface BrailleSequenceProps {
  brailleCharacters: BrailleCharacter[];
  size?: 'small' | 'medium' | 'large';
  showUnicode?: boolean;
}

export default function BrailleSequence({
  brailleCharacters,
  size = 'medium',
  showUnicode = false,
}: BrailleSequenceProps) {
  return (
    <div className={`${styles.sequence} ${styles[size]}`}>
      <div className={styles.patterns}>
        {brailleCharacters.map((char, index) => (
          <div key={`${char.letter}-${index}`} className={styles.item}>
            <BraillePattern brailleCharacter={char} size={size} showUnicode={showUnicode} />
            {char.type === 'symbol' && (
              <div className={styles.label}>{char.displayName}</div>
            )}
          </div>
        ))}
      </div>

      {showUnicode && (
        <div className={styles.unicode} aria-hidden="true">
          {brailleCharacters.map((c) => c.unicode).join('')}
        </div>
      )}
    </div>
  );
}