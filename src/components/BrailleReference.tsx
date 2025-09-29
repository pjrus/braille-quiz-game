import React from 'react';
import BraillePattern from './BraillePattern';
import { BRAILLE_LOWERCASE, BRAILLE_CAPITALS, NUMBERS_BRAILLE, BRAILLE_SIGNS } from '../data/brailleData';
import './BrailleReference.css';

const BrailleReference: React.FC = () => {
  return (
    <div className="reference-container">
      <h1>📚 Braille Alphabet Reference</h1>
      
      <div className="reference-intro">
        <p>Learn and reference all Braille characters used in the quiz. Each character shows the dot pattern and its corresponding letter, number, or symbol.</p>
      </div>

      <section className="reference-section">
        <h2>🔤 Lowercase Letters (a-z)</h2>
        <div className="reference-braille-grid">
          {BRAILLE_LOWERCASE.map((char) => (
            <div key={char.letter} className="braille-item">
              <div className="braille-display">
                <BraillePattern 
                  brailleCharacter={char} 
                  size="medium"
                />
              </div>
              <div className="braille-info">
                <div className="braille-letter">{char.letter}</div>
                <div className="braille-unicode">{char.unicode}</div>
                <div className="braille-name">{char.displayName}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reference-section">
        <h2>🔠 Capital Letters (A-Z)</h2>
        <div className="capital-explanation">
          <div className="explanation-card">
            <div className="capital-example">
              <div className="braille-display">
                <BraillePattern 
                  brailleCharacter={BRAILLE_SIGNS.find(s => s.letter === 'CAPITAL_SIGN') || BRAILLE_SIGNS[1]} 
                  size="small"
                />
              </div>
              <span className="plus-sign">+</span>
              <div className="braille-display">
                <BraillePattern 
                  brailleCharacter={{
                    letter: 'a',
                    braillePattern: BRAILLE_CAPITALS[0].braillePattern,
                    unicode: BRAILLE_CAPITALS[0].unicode,
                    type: 'letter'
                  }} 
                  size="small"
                />
              </div>
              <span className="equals-sign">=</span>
              <span className="result">Capital A</span>
            </div>
            <p>Capital letters are formed by placing the capital sign (⠠) before the lowercase letter pattern.</p>
          </div>
        </div>
        
        <div className="reference-braille-grid">
          {BRAILLE_CAPITALS.map((char) => (
            <div key={char.letter} className="braille-item">
              <div className="braille-display">
                <div className="capital-sequence">
                  <BraillePattern 
                    brailleCharacter={BRAILLE_SIGNS.find(s => s.letter === 'CAPITAL_SIGN') || BRAILLE_SIGNS[1]} 
                    size="small"
                  />
                  <BraillePattern 
                    brailleCharacter={{
                      letter: char.letter.toLowerCase(),
                      braillePattern: char.braillePattern,
                      unicode: char.unicode,
                      type: 'letter'
                    }} 
                    size="small"
                  />
                </div>
              </div>
              <div className="braille-info">
                <div className="braille-letter">{char.letter}</div>
                <div className="braille-unicode">⠠{char.unicode}</div>
                <div className="braille-name">{char.displayName}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reference-section">
        <h2>🔢 Numbers (0-9)</h2>
        <div className="number-explanation">
          <div className="explanation-card">
            <div className="number-example">
              <div className="braille-display">
                <BraillePattern 
                  brailleCharacter={BRAILLE_SIGNS.find(s => s.letter === 'NUMBER_SIGN') || BRAILLE_SIGNS[0]} 
                  size="small"
                />
              </div>
              <span className="plus-sign">+</span>
              <div className="braille-display">
                <BraillePattern 
                  brailleCharacter={{
                    letter: '1',
                    braillePattern: NUMBERS_BRAILLE[0].braillePattern,
                    unicode: NUMBERS_BRAILLE[0].unicode,
                    type: 'number'
                  }} 
                  size="small"
                />
              </div>
              <span className="equals-sign">=</span>
              <span className="result">Number 1</span>
            </div>
            <p>Numbers are formed by placing the number sign (⠼) before the corresponding letter pattern.</p>
          </div>
        </div>
        
        <div className="reference-braille-grid">
          {NUMBERS_BRAILLE.map((char) => (
            <div key={char.letter} className="braille-item">
              <div className="braille-display">
                <div className="number-sequence">
                  <BraillePattern 
                    brailleCharacter={BRAILLE_SIGNS.find(s => s.letter === 'NUMBER_SIGN') || BRAILLE_SIGNS[0]} 
                    size="small"
                  />
                  <BraillePattern 
                    brailleCharacter={{
                      letter: char.letter,
                      braillePattern: char.braillePattern,
                      unicode: char.unicode,
                      type: 'number'
                    }} 
                    size="small"
                  />
                </div>
              </div>
              <div className="braille-info">
                <div className="braille-letter">{char.letter}</div>
                <div className="braille-unicode">⠼{char.unicode}</div>
                <div className="braille-name">{char.displayName}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reference-section">
        <h2>🔣 Special Signs</h2>
        <div className="reference-braille-grid">
          {BRAILLE_SIGNS.map((char) => (
            <div key={char.letter} className="braille-item">
              <div className="braille-display">
                <BraillePattern 
                  brailleCharacter={char} 
                  size="medium"
                />
              </div>
              <div className="braille-info">
                <div className="braille-letter special">{char.letter}</div>
                <div className="braille-unicode">{char.unicode}</div>
                <div className="braille-name">{char.displayName}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reference-section">
        <h2>💡 Quick Tips</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>🎯 Pattern Recognition</h3>
            <p>Focus on the shape and position of the dots. Each pattern is unique and follows logical progressions.</p>
          </div>
          
          <div className="tip-card">
            <h3>📍 Dot Positions</h3>
            <p>Remember: dots 1-3 are on the left, dots 4-6 are on the right. Top to bottom: 1&4, 2&5, 3&6.</p>
          </div>
          
          <div className="tip-card">
            <h3>🔄 Practice Order</h3>
            <p>Start with letters a-j (basic patterns), then k-t (add dot 3), finally u-z (add dot 6).</p>
          </div>
          
          <div className="tip-card">
            <h3>🧠 Memory Tricks</h3>
            <p>Many letters follow patterns: B=A+dot2, C=A+dot4, D=A+dot4+dot5, etc.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrailleReference;