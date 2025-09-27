import { BehaviorSubject, Observable, interval, map, startWith, take } from 'rxjs';
import type { Question, GameState, GameStats } from '../types/braille';
import { 
  BRAILLE_LOWERCASE, 
  BRAILLE_CAPITALS, 
  NUMBERS_BRAILLE, 
  BRAILLE_SIGNS 
} from '../data/brailleData';

export class BrailleGameService {
  private readonly GAME_DURATION = 60; // seconds
  private readonly QUESTIONS_PER_GAME = 10;

  private gameState$ = new BehaviorSubject<GameState>({
    currentQuestion: null,
    score: 0,
    totalQuestions: this.QUESTIONS_PER_GAME,
    currentQuestionIndex: 0,
    isGameActive: false,
    timeRemaining: this.GAME_DURATION,
    streak: 0,
  });

  private timer$ = new BehaviorSubject<number>(this.GAME_DURATION);
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

  startGame(): void {
    const newQuestion = this.generateQuestion();
    this.gameState$.next({
      ...this.gameState$.value,
      currentQuestion: newQuestion,
      score: 0,
      currentQuestionIndex: 0,
      isGameActive: true,
      timeRemaining: this.GAME_DURATION,
      streak: 0,
    });

    this.startTimer();
  }

  private startTimer(): void {
    const timer = interval(1000).pipe(
      map(tick => this.GAME_DURATION - tick - 1),
      startWith(this.GAME_DURATION),
      take(this.GAME_DURATION + 1)
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

    if (nextQuestionIndex >= this.QUESTIONS_PER_GAME) {
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
    const questionTypes = ['lowercase', 'capital', 'number'];
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
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