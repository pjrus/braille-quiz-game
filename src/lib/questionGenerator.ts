import {
  BRAILLE_CAPITALS,
  BRAILLE_LOWERCASE,
  BRAILLE_SIGNS,
  NUMBERS_BRAILLE,
} from '@/data/brailleData';
import type { BrailleCharacter, Difficulty, Question } from '@/types/braille';

const capitalSign = BRAILLE_SIGNS.find((s) => s.letter === 'CAPITAL_SIGN');
const numberSign = BRAILLE_SIGNS.find((s) => s.letter === 'NUMBER_SIGN');

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function allowedTypesFor(difficulty: Difficulty): Array<
  'lowercase' | 'capital' | 'number'
> {
  switch (difficulty) {
    case 'easy':
      return ['lowercase'];
    case 'hard':
      return ['lowercase', 'capital', 'number'];
    case 'medium':
    default:
      return ['lowercase', 'capital'];
  }
}

function sourceFor(type: 'lowercase' | 'capital' | 'number'): BrailleCharacter[] {
  switch (type) {
    case 'capital':
      return BRAILLE_CAPITALS;
    case 'number':
      return NUMBERS_BRAILLE;
    case 'lowercase':
    default:
      return BRAILLE_LOWERCASE;
  }
}

function buildSequence(
  type: 'lowercase' | 'capital' | 'number',
  correct: BrailleCharacter,
): BrailleCharacter[] {
  if (type === 'capital' && capitalSign) return [capitalSign, correct];
  if (type === 'number' && numberSign) return [numberSign, correct];
  return [correct];
}

function questionTextFor(type: 'lowercase' | 'capital' | 'number'): string {
  switch (type) {
    case 'capital':
      return 'What capital letter is this?';
    case 'number':
      return 'What number is this?';
    case 'lowercase':
    default:
      return 'What lowercase letter is this?';
  }
}

function buildOptions(
  correct: BrailleCharacter,
  source: BrailleCharacter[],
): string[] {
  const wrong = new Set<string>();
  while (wrong.size < 3) {
    const candidate = pick(source);
    if (candidate.letter !== correct.letter) wrong.add(candidate.letter);
  }
  const options = [correct.letter, ...Array.from(wrong)];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

export function generateQuestion(difficulty: Difficulty): Question {
  const type = pick(allowedTypesFor(difficulty));
  const source = sourceFor(type);
  const correct = pick(source);
  const sequence = buildSequence(type, correct);
  const options = buildOptions(correct, source);

  return {
    id: `q_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    brailleCharacters: sequence,
    options,
    correctAnswer: correct.letter,
    questionText: questionTextFor(type),
  };
}