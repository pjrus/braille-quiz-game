import React from 'react';
import type { BrailleCharacter } from '../types/braille';
import BraillePattern from './BraillePattern';
import './BrailleSequence.css';

interface BrailleSequenceProps {
  brailleCharacters: BrailleCharacter[];
  size?: 'small' | 'medium' | 'large';
  showUnicode?: boolean;
}

const BrailleSequence: React.FC<BrailleSequenceProps> = ({
  brailleCharacters,
  size = 'medium',
  showUnicode = false,
}) => {
  return (
    <div className={`braille-sequence braille-sequence--${size}`}>
      <div className="braille-sequence-patterns">
        {brailleCharacters.map((char, index) => (
          <div key={`${char.letter}-${index}`} className="braille-sequence-item">
            <BraillePattern
              brailleCharacter={char}
              size={size}
              showUnicode={showUnicode}
            />
            {char.type === 'symbol' && (
              <div className="braille-sequence-label">
                {char.displayName}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {showUnicode && (
        <div className="braille-sequence-unicode">
          {brailleCharacters.map(char => char.unicode).join('')}
        </div>
      )}
    </div>
  );
};

export default BrailleSequence;