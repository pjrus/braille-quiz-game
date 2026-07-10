import styles from './page.module.css';

export const metadata = {
  title: 'Rules — Braille Character Quiz',
};

const RULES = [
  { n: 1, title: 'Choose Your Settings', body: 'Pick difficulty, game length, and number of questions before you start.' },
  { n: 2, title: 'Read the Braille Pattern', body: 'A Braille pattern is displayed. Study the dots to identify the character.' },
  { n: 3, title: 'Select Your Answer', body: 'Choose from four multiple-choice options. Tap the letter or number you think is correct.' },
  { n: 4, title: 'Build Your Score', body: 'Earn 10 points for each correct answer. Consecutive correct answers build your streak.' },
];

const DIFFICULTIES = [
  { name: 'Easy', level: 'easy', desc: 'Lowercase letters only (a–z).', note: 'Perfect for beginners learning basic Braille.' },
  { name: 'Medium', level: 'medium', desc: 'Lowercase + Capital letters.', note: 'Includes the capital sign (⠠) before letters.' },
  { name: 'Hard', level: 'hard', desc: 'Letters + Numbers.', note: 'Includes the number sign (⠼) before digits.' },
];

const SCORING = [
  { icon: '+', title: 'Correct Answer', body: '+10 points per correct answer.' },
  { icon: '×', title: 'Streak Bonus', body: 'Consecutive correct answers build your streak counter.' },
  { icon: '!', title: 'Time Challenge', body: 'Answer quickly to maximize your score within the time limit.' },
];

const TIPS = [
  'Study the Reference — use the Braille Alphabet reference to learn the patterns.',
  'Start Easy — begin with easy difficulty to learn the basic patterns.',
  'Pattern Recognition — focus on dot positions: top row (1, 4), middle row (2, 5), bottom row (3, 6).',
  'Practice Regularly — consistent practice improves speed and accuracy.',
];

export default function RulesPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>How to Play Braille Character Quiz</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Game Overview</h2>
        <p>Test your knowledge of Braille characters in this interactive quiz game. Answer as many questions correctly as possible within the time limit!</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Game Rules</h2>
        <ol className={styles.rules}>
          {RULES.map((rule) => (
            <li key={rule.n} className={styles.rule}>
              <span className={styles.ruleNum} aria-hidden="true">{rule.n}</span>
              <div className={styles.ruleBody}>
                <h3>{rule.title}</h3>
                <p>{rule.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Difficulty Levels</h2>
        <div className={styles.difficultyGrid}>
          {DIFFICULTIES.map((d) => (
            <div key={d.level} className={styles.diffCard} data-level={d.level}>
              <h3>{d.name}</h3>
              <p className={styles.diffDesc}>{d.desc}</p>
              <p className={styles.diffNote}>{d.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Scoring System</h2>
        <ul className={styles.scoring}>
          {SCORING.map((s) => (
            <li key={s.title} className={styles.scoringItem}>
              <span className={styles.scoringIcon} aria-hidden="true">{s.icon}</span>
              <div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tips for Success</h2>
        <ul className={styles.tips}>
          {TIPS.map((tip) => (
            <li key={tip} className={styles.tip}>
              <span className={styles.tipMark} aria-hidden="true">·</span>
              <p>{tip}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Understanding Braille Patterns</h2>
        <div className={styles.brailleExplain}>
          <div className={styles.dotDiagram} role="img" aria-label="Numbered Braille cell layout: dots 1, 4 on top row; 2, 5 in middle; 3, 6 on bottom">
            <span className={styles.dotLabel}>1</span>
            <span className={styles.dotLabel}>4</span>
            <span className={styles.dotLabel}>2</span>
            <span className={styles.dotLabel}>5</span>
            <span className={styles.dotLabel}>3</span>
            <span className={styles.dotLabel}>6</span>
          </div>
          <div className={styles.dotText}>
            <p>Each Braille character is a cell with six possible dot positions, numbered 1–6.</p>
            <p>Different combinations of raised dots create different letters, numbers, and symbols.</p>
          </div>
        </div>
      </section>
    </div>
  );
}