export interface BrailleCharacter {
  letter: string;
  braillePattern: boolean[];
  unicode: string;
  type?: 'letter' | 'capital' | 'number' | 'symbol';
  displayName?: string;
}

export interface Question {
  id: string;
  brailleCharacters: BrailleCharacter[];
  options: string[];
  correctAnswer: string;
  questionText?: string;
}

export interface GameState {
  currentQuestion: Question | null;
  score: number;
  totalQuestions: number;
  currentQuestionIndex: number;
  isGameActive: boolean;
  timeRemaining: number;
  streak: number;
}

export interface GameStats {
  totalGames: number;
  highScore: number;
  averageScore: number;
  bestStreak: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export const DEFAULT_GAME_DURATION = 60;
export const DEFAULT_QUESTIONS_PER_GAME = 10;
export const DEFAULT_DIFFICULTY: Difficulty = 'medium';
export const POINTS_PER_CORRECT = 10;