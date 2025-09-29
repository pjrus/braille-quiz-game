import React from 'react';
import './Rules.css';

const Rules: React.FC = () => {
  return (
    <div className="rules-container">
      <h1>How to Play Braille Character Quiz</h1>
      
      <section className="rules-section">
        <h2>Game Overview</h2>
        <p>Test your knowledge of Braille characters in this interactive quiz game. Answer as many questions correctly as possible within the time limit!</p>
      </section>

      <section className="rules-section">
        <h2>Game Rules</h2>
        <div className="rules-list">
          <div className="rule-item">
            <span className="rule-number">1</span>
            <div className="rule-content">
              <h3>Choose Your Settings</h3>
              <p>Select difficulty level, game length, and number of questions before starting.</p>
            </div>
          </div>
          
          <div className="rule-item">
            <span className="rule-number">2</span>
            <div className="rule-content">
              <h3>Read the Braille Pattern</h3>
              <p>A Braille pattern will be displayed. Study the dots carefully to identify the character.</p>
            </div>
          </div>
          
          <div className="rule-item">
            <span className="rule-number">3</span>
            <div className="rule-content">
              <h3>Select Your Answer</h3>
              <p>Choose from 4 multiple-choice options. Click on the letter or number you think is correct.</p>
            </div>
          </div>
          
          <div className="rule-item">
            <span className="rule-number">4</span>
            <div className="rule-content">
              <h3>Build Your Score</h3>
              <p>Earn 10 points for each correct answer. Build up streaks for bonus points!</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rules-section">
        <h2>Difficulty Levels</h2>
        <div className="difficulty-grid">
          <div className="difficulty-card easy">
            <h3>Easy</h3>
            <p>Lowercase letters only (a-z)</p>
            <p>Perfect for beginners learning basic Braille</p>
          </div>
          
          <div className="difficulty-card medium">
            <h3>Medium</h3>
            <p>Lowercase + Capital letters</p>
            <p>Includes capital sign (⠠) before letters</p>
          </div>
          
          <div className="difficulty-card hard">
            <h3>Hard</h3>
            <p>Letters + Numbers</p>
            <p>Includes number sign (⠼) before digits</p>
          </div>
        </div>
      </section>

      <section className="rules-section">
        <h2>Scoring System</h2>
        <div className="scoring-info">
          <div className="score-item">
            <span className="score-icon">+</span>
            <div>
              <h4>Correct Answer</h4>
              <p>+10 points per correct answer</p>
            </div>
          </div>
          
          <div className="score-item">
            <span className="score-icon">*</span>
            <div>
              <h4>Streak Bonus</h4>
              <p>Consecutive correct answers build your streak</p>
            </div>
          </div>
          
          <div className="score-item">
            <span className="score-icon">!</span>
            <div>
              <h4>Time Challenge</h4>
              <p>Answer quickly to maximize your score within the time limit</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rules-section">
        <h2>Tips for Success</h2>
        <div className="tips-list">
          <div className="tip-item">
            <span className="tip-icon">·</span>
            <p><strong>Study the Reference:</strong> Use the Braille Alphabet reference to learn the patterns</p>
          </div>
          
          <div className="tip-item">
            <span className="tip-icon">·</span>
            <p><strong>Start Easy:</strong> Begin with easy difficulty to learn the basic patterns</p>
          </div>
          
          <div className="tip-item">
            <span className="tip-icon">·</span>
            <p><strong>Pattern Recognition:</strong> Focus on the dot positions - top row (1,4), middle row (2,5), bottom row (3,6)</p>
          </div>
          
          <div className="tip-item">
            <span className="tip-icon">·</span>
            <p><strong>Practice Regularly:</strong> Consistent practice improves speed and accuracy</p>
          </div>
        </div>
      </section>

      <section className="rules-section">
        <h2>Understanding Braille Patterns</h2>
        <div className="braille-explanation">
          <div className="braille-cell-diagram">
            <div className="cell-visual">
              <div className="dot-positions">
                <span className="dot-label">1</span>
                <span className="dot-label">4</span>
                <span className="dot-label">2</span>
                <span className="dot-label">5</span>
                <span className="dot-label">3</span>
                <span className="dot-label">6</span>
              </div>
            </div>
            <div className="cell-explanation">
              <p>Each Braille character is made up of a cell with 6 possible dot positions, numbered 1-6.</p>
              <p>Different combinations of raised dots create different letters, numbers, and symbols.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rules;