import { BehaviorSubject, Observable, interval, map, startWith, take } from 'rxjs';
import type { Question, GameState, GameStats } from '../types/braille';
import { 
  BRAILLE_LOWERCASE, 
  BRAILLE_CAPITALS, 
  NUMBERS_BRAILLE, 
  BRAILLE_SIGNS 
} from '../data/brailleData';

export class BrailleGameService {
  // Configurable settings with sensible defaults
  private gameDuration = 60; // seconds
  private questionsPerGame = 10;
  private difficulty: 'easy' | 'medium' | 'hard' = 'medium';

  private gameState$ = new BehaviorSubject<GameState>({
    currentQuestion: null,
    score: 0,
    totalQuestions: this.questionsPerGame,
    currentQuestionIndex: 0,
    isGameActive: false,
    timeRemaining: this.gameDuration,
    streak: 0,
  });

  private timer$ = new BehaviorSubject<number>(this.gameDuration);
  private gameStats$ = new BehaviorSubject<GameStats>({
    totalGames: 0,
    highScore: 0,
    averageScore: 0,
    bestStreak: 0,
  });

  constructor() {
    this.loadStats();
  }

  getGameState(): Observable<GameState> {
    return this.gameState$.asObservable();
  }

  getGameStats(): Observable<GameStats> {
    return this.gameStats$.asObservable();
  }

  getTimer(): Observable<number> {
    return this.timer$.asObservable();
  }

  // Settings API
  setGameLength(seconds: number): void {
    if (seconds <= 0) return;
    this.gameDuration = Math.floor(seconds);
    // update subjects so UI reflects new defaults when not playing
    this.timer$.next(this.gameDuration);
    this.gameState$.next({
      ...this.gameState$.value,
      totalQuestions: this.questionsPerGame,
      timeRemaining: this.gameDuration,
    });
  }

  setQuestionsPerGame(count: number): void {
    if (count <= 0) return;
    this.questionsPerGame = Math.floor(count);
    this.gameState$.next({
      ...this.gameState$.value,
      totalQuestions: this.questionsPerGame,
    });
  }

  setDifficulty(level: 'easy' | 'medium' | 'hard'): void {
    this.difficulty = level;
  }

  startGame(): void {
    const newQuestion = this.generateQuestion();
    this.gameState$.next({
      ...this.gameState$.value,
      currentQuestion: newQuestion,
      score: 0,
      currentQuestionIndex: 0,
      isGameActive: true,
      timeRemaining: this.gameDuration,
      totalQuestions: this.questionsPerGame,
      streak: 0,
    });

    this.startTimer();
  }

  private startTimer(): void {
    const duration = this.gameDuration;
    const timer = interval(1000).pipe(
      map(tick => duration - tick - 1),
      startWith(duration),
      take(duration + 1)
    );

    timer.subscribe({
      next: (timeLeft) => {
        this.timer$.next(timeLeft);
        this.gameState$.next({
          ...this.gameState$.value,
          timeRemaining: timeLeft,
        });
      },
      complete: () => {
        this.endGame();
      }
    });
  }

  answerQuestion(answer: string): void {
    const currentState = this.gameState$.value;
    if (!currentState.isGameActive || !currentState.currentQuestion) return;

    const isCorrect = answer === currentState.currentQuestion.correctAnswer;
    const newScore = currentState.score + (isCorrect ? 10 : 0);
    const newStreak = isCorrect ? currentState.streak + 1 : 0;
    const nextQuestionIndex = currentState.currentQuestionIndex + 1;

    if (nextQuestionIndex >= this.questionsPerGame) {
      this.endGame(newScore, newStreak);
      return;
    }

    const nextQuestion = this.generateQuestion();
    this.gameState$.next({
      ...currentState,
      currentQuestion: nextQuestion,
      score: newScore,
      streak: newStreak,
      currentQuestionIndex: nextQuestionIndex,
    });
  }

  private endGame(finalScore?: number, finalStreak?: number): void {
    const currentState = this.gameState$.value;
    const score = finalScore ?? currentState.score;
    const streak = finalStreak ?? currentState.streak;

    this.gameState$.next({
      ...currentState,
      isGameActive: false,
      score,
      streak,
    });

    this.updateStats(score, streak);
  }

  private generateQuestion(): Question {
    // Choose allowed question types based on difficulty
    const allTypes = ['lowercase', 'capital', 'number'];
    let allowedTypes: string[] = [];
    switch (this.difficulty) {
      case 'easy':
        allowedTypes = ['lowercase'];
        break;
      case 'medium':
        allowedTypes = ['lowercase', 'capital'];
        break;
      case 'hard':
        allowedTypes = allTypes;
        break;
      default:
        allowedTypes = ['lowercase', 'capital'];
    }

    const questionType = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
    
    let correctChar;
    let brailleSequence;
    let questionText;
    
    switch (questionType) {
      case 'lowercase': {
        correctChar = BRAILLE_LOWERCASE[Math.floor(Math.random() * BRAILLE_LOWERCASE.length)];
        brailleSequence = [correctChar];
        questionText = `What lowercase letter is this?`;
        break;
      }
        
      case 'capital': {
        correctChar = BRAILLE_CAPITALS[Math.floor(Math.random() * BRAILLE_CAPITALS.length)];
        const capitalSign = BRAILLE_SIGNS.find(s => s.letter === 'CAPITAL_SIGN')!;
        brailleSequence = [capitalSign, correctChar];
        questionText = `What capital letter is this?`;
        break;
      }
        
      case 'number': {
        correctChar = NUMBERS_BRAILLE[Math.floor(Math.random() * NUMBERS_BRAILLE.length)];
        const numberSign = BRAILLE_SIGNS.find(s => s.letter === 'NUMBER_SIGN')!;
        brailleSequence = [numberSign, correctChar];
        questionText = `What number is this?`;
        break;
      }
        
      default: {
        correctChar = BRAILLE_LOWERCASE[Math.floor(Math.random() * BRAILLE_LOWERCASE.length)];
        brailleSequence = [correctChar];
        questionText = `What letter is this?`;
      }
    }
    
    // Generate 3 incorrect options from the same category
    const incorrectOptions: string[] = [];
    let sourceArray;
    
    switch (questionType) {
      case 'lowercase':
        sourceArray = BRAILLE_LOWERCASE;
        break;
      case 'capital':
        sourceArray = BRAILLE_CAPITALS;
        break;
      case 'number':
        sourceArray = NUMBERS_BRAILLE;
        break;
      default:
        sourceArray = BRAILLE_LOWERCASE;
    }
    
    while (incorrectOptions.length < 3) {
      const randomChar = sourceArray[Math.floor(Math.random() * sourceArray.length)];
      if (randomChar.letter !== correctChar.letter && !incorrectOptions.includes(randomChar.letter)) {
        incorrectOptions.push(randomChar.letter);
      }
    }

    // Shuffle options
    const options = [correctChar.letter, ...incorrectOptions].sort(() => Math.random() - 0.5);

    return {
      id: `q_${Date.now()}_${Math.random()}`,
      brailleCharacters: brailleSequence,
      options,
      correctAnswer: correctChar.letter,
      questionText,
    };
  }

  private updateStats(score: number, streak: number): void {
    const currentStats = this.gameStats$.value;
    const newTotalGames = currentStats.totalGames + 1;
    const newHighScore = Math.max(currentStats.highScore, score);
    const newAverageScore = ((currentStats.averageScore * currentStats.totalGames) + score) / newTotalGames;
    const newBestStreak = Math.max(currentStats.bestStreak, streak);

    const updatedStats: GameStats = {
      totalGames: newTotalGames,
      highScore: newHighScore,
      averageScore: Math.round(newAverageScore),
      bestStreak: newBestStreak,
    };

    this.gameStats$.next(updatedStats);
    this.saveStats(updatedStats);
  }

  private saveStats(stats: GameStats): void {
    localStorage.setItem('braille-game-stats', JSON.stringify(stats));
  }

  private loadStats(): void {
    const saved = localStorage.getItem('braille-game-stats');
    if (saved) {
      try {
        const stats = JSON.parse(saved) as GameStats;
        this.gameStats$.next(stats);
      } catch (error) {
        console.error('Failed to load game stats:', error);
      }
    }
  }

  resetStats(): void {
    const defaultStats: GameStats = {
      totalGames: 0,
      highScore: 0,
      averageScore: 0,
      bestStreak: 0,
    };
    this.gameStats$.next(defaultStats);
    this.saveStats(defaultStats);
  }
}