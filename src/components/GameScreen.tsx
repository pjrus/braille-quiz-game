import React, { useEffect, useState } from 'react';
import { BrailleGameService } from '../services/BrailleGameService';
import type { GameState, GameStats } from '../types/braille';
import BrailleSequence from './BrailleSequence';
import './GameScreen.css';

const gameService = new BrailleGameService();

const GameScreen: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameStats, setGameStats] = useState<GameStats | null>(null);
  const [timer, setTimer] = useState<number>(60);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'correct' | 'incorrect'>('correct');
  // Local UI settings before starting a game
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [selectedGameLength, setSelectedGameLength] = useState<number>(60);
  const [selectedQuestions, setSelectedQuestions] = useState<number>(10);

  useEffect(() => {
    const gameStateSubscription = gameService.getGameState().subscribe(setGameState);
    const gameStatsSubscription = gameService.getGameStats().subscribe(setGameStats);
    const timerSubscription = gameService.getTimer().subscribe(setTimer);

    return () => {
      gameStateSubscription.unsubscribe();
      gameStatsSubscription.unsubscribe();
      timerSubscription.unsubscribe();
    };
  }, []);

  const handleStartGame = () => {
    // Apply settings to service then start
    gameService.setDifficulty(selectedDifficulty);
    gameService.setGameLength(selectedGameLength);
    gameService.setQuestionsPerGame(selectedQuestions);
    gameService.startGame();
    setSelectedAnswer('');
    setShowFeedback(false);
    setFeedbackMessage('');
  };

  const handleAnswerSelect = (answer: string) => {
    if (!gameState?.isGameActive || showFeedback) return;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === gameState.currentQuestion?.correctAnswer;
    
    setFeedbackMessage(isCorrect ? 'Correct! 🎉' : `Wrong! The answer was ${gameState.currentQuestion?.correctAnswer}`);
    setFeedbackType(isCorrect ? 'correct' : 'incorrect');
    setShowFeedback(true);
    
    // Process the answer immediately, then wait before hiding feedback
    gameService.answerQuestion(answer);
    
    setTimeout(() => {
      setSelectedAnswer('');
      setShowFeedback(false);
    }, 1500);
  };

  const handleResetStats = () => {
    if (window.confirm('Are you sure you want to reset all statistics?')) {
      gameService.resetStats();
    }
  };

  if (!gameState || !gameStats) {
    return <div className="loading">Loading game...</div>;
  }

  return (
    <div className="game-screen">
      <header className="game-header">
        <h1 className="game-title">🔤 Braille Character Quiz</h1>
        <div className="game-info">
          <div className="info-item">
            <span className="info-label">Score:</span>
            <span className="info-value">{gameState.score}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Question:</span>
            <span className="info-value">
              {gameState.currentQuestionIndex + 1} / {gameState.totalQuestions}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Time:</span>
            <span className={`info-value ${timer <= 10 ? 'time-warning' : ''}`}>
              {timer}s
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Streak:</span>
            <span className="info-value">{gameState.streak}</span>
          </div>
        </div>
      </header>

      <main className="game-content">
        {!gameState.isGameActive ? (
          <div className="game-start-screen">
            <div className="stats-panel">
              <h2>Your Statistics</h2>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-value">{gameStats.totalGames}</span>
                  <span className="stat-label">Games Played</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{gameStats.highScore}</span>
                  <span className="stat-label">High Score</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{gameStats.averageScore}</span>
                  <span className="stat-label">Average Score</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{gameStats.bestStreak}</span>
                  <span className="stat-label">Best Streak</span>
                </div>
              </div>
              <div className="stats-actions">
                <button 
                  className="btn btn-secondary" 
                  onClick={handleResetStats}
                >
                  Reset Stats
                </button>
              </div>
            </div>
            
            <div className="game-settings">
              <h3>Game Settings</h3>
              <div className="setting-row">
                <label>Difficulty:</label>
                <select value={selectedDifficulty} onChange={e => setSelectedDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}>
                  <option value="easy">Easy (lowercase only)</option>
                  <option value="medium">Medium (lowercase + capitals)</option>
                  <option value="hard">Hard (includes numbers)</option>
                </select>
              </div>

              <div className="setting-row">
                <label>Game Length (seconds):</label>
                <input
                  type="number"
                  min={10}
                  max={300}
                  value={selectedGameLength}
                  onChange={e => setSelectedGameLength(Number(e.target.value) || 10)}
                />
              </div>

              <div className="setting-row">
                <label>Number of Questions:</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={selectedQuestions}
                  onChange={e => setSelectedQuestions(Number(e.target.value) || 1)}
                />
              </div>

              <div className="start-actions">
                <button 
                  className="btn btn-primary btn-large" 
                  onClick={handleStartGame}
                >
                  {gameStats.totalGames > 0 ? 'Play Again' : 'Start Game'}
                </button>
              </div>
            </div>

            <div className="game-instructions">
              <h3>How to Play</h3>
              <ul>
                <li>You'll see Braille patterns displayed</li>
                <li>For numbers, you'll see the number sign (⠼) followed by the number pattern</li>
                <li>For capital letters, you'll see the capital sign (⠠) followed by the letter pattern</li>
                <li>For lowercase letters, you'll see just the letter pattern</li>
                <li>Choose the correct letter or number from the options</li>
                <li>You have 60 seconds to answer as many questions as possible</li>
                <li>Each correct answer gives you 10 points</li>
                <li>Try to build up your streak for better scores!</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="question-container">
            {gameState.currentQuestion && (
              <>
                <div className="question-header">
                  <h2>{gameState.currentQuestion.questionText || 'What letter or number is this?'}</h2>
                </div>
                
                <div className="braille-display">
                  <BrailleSequence 
                    brailleCharacters={gameState.currentQuestion.brailleCharacters}
                    size="large"
                  />
                </div>

                {showFeedback && (
                  <div className={`feedback feedback-${feedbackType}`}>
                    {feedbackMessage}
                  </div>
                )}

                <div className="options-container">
                  {gameState.currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      className={`option-btn ${selectedAnswer === option ? 'selected' : ''}`}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showFeedback}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default GameScreen;