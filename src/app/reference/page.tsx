import {
  BRAILLE_CAPITALS,
  BRAILLE_LOWERCASE,
  BRAILLE_SIGNS,
  NUMBERS_BRAILLE,
} from '@/data/brailleData';
import BraillePattern from '@/components/BraillePattern';
import styles from './page.module.css';

export const metadata = {
  title: 'Reference — Braille Character Quiz',
};

const capitalSign = BRAILLE_SIGNS.find((s) => s.letter === 'CAPITAL_SIGN')!;
const numberSign = BRAILLE_SIGNS.find((s) => s.letter === 'NUMBER_SIGN')!;

const TIPS = [
  {
    title: 'Pattern Recognition',
    body: 'Focus on the shape and position of the dots. Each pattern is unique and follows logical progressions.',
  },
  {
    title: 'Dot Positions',
    body: 'Dots 1–3 are on the left, dots 4–6 on the right. Top to bottom: 1 & 4, 2 & 5, 3 & 6.',
  },
  {
    title: 'Practice Order',
    body: 'Start with letters a–j (basic patterns), then k–t (add dot 3), finally u–z (add dot 6).',
  },
  {
    title: 'Memory Tricks',
    body: 'Many letters follow patterns: B = A + dot 2, C = A + dot 4, D = A + dot 4 + dot 5, etc.',
  },
];

export default function ReferencePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Braille Alphabet Reference</h1>

      <p className={styles.intro}>
        Learn and reference all Braille characters used in the quiz. Each character shows the dot pattern and its corresponding letter, number, or symbol.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Lowercase Letters (a–z)</h2>
        <div className={styles.grid}>
          {BRAILLE_LOWERCASE.map((char) => (
            <ReferenceCard
              key={char.letter}
              letter={char.letter}
              unicode={char.unicode}
              name={char.displayName ?? char.letter}
            >
              <BraillePattern brailleCharacter={char} size="medium" />
            </ReferenceCard>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Capital Letters (A–Z)</h2>
        <div className={styles.explain}>
          <div className={styles.explainRow}>
            <BraillePattern brailleCharacter={capitalSign} size="small" />
            <span className={styles.op} aria-hidden="true">+</span>
            <BraillePattern brailleCharacter={BRAILLE_CAPITALS[0]} size="small" />
            <span className={styles.op} aria-hidden="true">=</span>
            <span className={styles.resultPill}>Capital A</span>
          </div>
          <p>Capital letters are formed by placing the capital sign (⠠) before the lowercase letter pattern.</p>
        </div>
        <div className={styles.grid}>
          {BRAILLE_CAPITALS.map((char) => (
            <ReferenceCard
              key={char.letter}
              letter={char.letter}
              unicode={`⠠${char.unicode}`}
              name={char.displayName ?? char.letter}
            >
              <div className={styles.sequence}>
                <BraillePattern brailleCharacter={capitalSign} size="small" />
                <BraillePattern
                  brailleCharacter={{
                    ...char,
                    letter: char.letter.toLowerCase(),
                    type: 'letter',
                  }}
                  size="small"
                />
              </div>
            </ReferenceCard>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Numbers (0–9)</h2>
        <div className={styles.explain}>
          <div className={styles.explainRow}>
            <BraillePattern brailleCharacter={numberSign} size="small" />
            <span className={styles.op} aria-hidden="true">+</span>
            <BraillePattern brailleCharacter={NUMBERS_BRAILLE[0]} size="small" />
            <span className={styles.op} aria-hidden="true">=</span>
            <span className={styles.resultPill}>Number 1</span>
          </div>
          <p>Numbers are formed by placing the number sign (⠼) before the corresponding letter pattern.</p>
        </div>
        <div className={styles.grid}>
          {NUMBERS_BRAILLE.map((char) => (
            <ReferenceCard
              key={char.letter}
              letter={char.letter}
              unicode={`⠼${char.unicode}`}
              name={char.displayName ?? char.letter}
            >
              <div className={styles.sequence}>
                <BraillePattern brailleCharacter={numberSign} size="small" />
                <BraillePattern brailleCharacter={char} size="small" />
              </div>
            </ReferenceCard>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Special Signs</h2>
        <div className={styles.grid}>
          {BRAILLE_SIGNS.map((char) => (
            <ReferenceCard
              key={char.letter}
              letter={char.letter.replace(/_/g, ' ')}
              unicode={char.unicode}
              name={char.displayName ?? char.letter}
              special
            >
              <BraillePattern brailleCharacter={char} size="medium" />
            </ReferenceCard>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Tips</h2>
        <div className={styles.tipGrid}>
          {TIPS.map((tip) => (
            <div key={tip.title} className={styles.tipCard}>
              <h3>{tip.title}</h3>
              <p>{tip.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ReferenceCard({
  letter,
  unicode,
  name,
  special,
  children,
}: {
  letter: string;
  unicode: string;
  name: string;
  special?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.item}>
      <div className={styles.itemPattern}>{children}</div>
      <div className={styles.itemInfo}>
        <div className={`${styles.itemLetter} ${special ? styles.itemLetterSpecial : ''}`}>{letter}</div>
        <div className={styles.itemUnicode}>{unicode}</div>
        <div className={styles.itemName}>{name}</div>
      </div>
    </div>
  );
}