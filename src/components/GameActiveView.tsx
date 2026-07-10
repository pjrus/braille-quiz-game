import { Card, CardContent } from '@/components/ui/card';
import BrailleSequence from './BrailleSequence';
import type { BrailleCharacter } from '@/types/braille';
import styles from './GameActiveView.module.css';

interface GameActiveViewProps {
  question: {
    questionText?: string;
    brailleCharacters: BrailleCharacter[];
    options: string[];
  } | null;
  feedback: { type: 'correct' | 'incorrect'; message: string } | null;
  selected: string;
  onAnswer: (value: string) => void;
  disabled: boolean;
}

export default function GameActiveView({ question, feedback, selected, onAnswer, disabled }: GameActiveViewProps) {
  if (!question) return null;
  return (
    <Card>
      <CardContent className={styles.game}>
        <h2 className={styles.questionText}>{question.questionText ?? 'What letter or number is this?'}</h2>

        <div className={styles.brailleDisplay}>
          <BrailleSequence brailleCharacters={question.brailleCharacters} size="large" />
        </div>

        {feedback && (
          <div
            className={`${styles.feedback} ${feedback.type === 'correct' ? styles.feedbackCorrect : styles.feedbackWrong}`}
            role="status"
            aria-live="polite"
          >
            {feedback.message}
          </div>
        )}

        <div className={styles.options}>
          {question.options.map((option) => (
            <button
              key={option}
              type="button"
              className={`${styles.option} ${selected === option ? styles.optionSelected : ''}`}
              onClick={() => onAnswer(option)}
              disabled={disabled}
            >
              {option}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
