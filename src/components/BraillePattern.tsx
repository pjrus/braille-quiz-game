import React from 'react';
import type { BrailleCharacter } from '../types/braille';
import './BraillePattern.css';

interface BraillePatternProps {
  brailleCharacter: BrailleCharacter;
  size?: 'small' | 'medium' | 'large';
  showUnicode?: boolean;
}

const BraillePattern: React.FC<BraillePatternProps> = ({
  brailleCharacter,
  size = 'medium',
  showUnicode = false,
}) => {
  const { braillePattern, unicode } = brailleCharacter;

  return (
    <div className={`braille-pattern braille-pattern--${size}`}>
      <div className="braille-grid">
        <div className="braille-column">
          <div
            className={`braille-dot ${braillePattern[0] ? 'braille-dot--active' : ''}`}
            data-position="1"
          />
          <div
            className={`braille-dot ${braillePattern[1] ? 'braille-dot--active' : ''}`}
            data-position="2"
          />
          <div
            className={`braille-dot ${braillePattern[2] ? 'braille-dot--active' : ''}`}
            data-position="3"
          />
        </div>
        <div className="braille-column">
          <div
            className={`braille-dot ${braillePattern[3] ? 'braille-dot--active' : ''}`}
            data-position="4"
          />
          <div
            className={`braille-dot ${braillePattern[4] ? 'braille-dot--active' : ''}`}
            data-position="5"
          />
          <div
            className={`braille-dot ${braillePattern[5] ? 'braille-dot--active' : ''}`}
            data-position="6"
          />
        </div>
      </div>
      {showUnicode && (
        <div className="braille-unicode">
          {unicode}
        </div>
      )}
    </div>
  );
};

export default BraillePattern;