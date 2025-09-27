export interface BrailleCharacter {
  letter: string;
  braillePattern: boolean[]; // 6 dots: [1,2,3,4,5,6]
  unicode: string;
  type?: 'letter' | 'capital' | 'number' | 'symbol';
  displayName?: string; // For showing "Capital A" or "Number 1"
}

export interface Question {
  id: string;
  brailleCharacters: BrailleCharacter[]; // Changed from single to array for compound patterns
  options: string[];
  correctAnswer: string;
  questionText?: string; // Custom question text
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