import type { BrailleCharacter } from '../types/braille';

// Special Braille signs
export const BRAILLE_SIGNS: BrailleCharacter[] = [
  { letter: 'NUMBER_SIGN', braillePattern: [false, false, true, true, true, true], unicode: '⠼', type: 'symbol', displayName: 'Number Sign' },
  { letter: 'CAPITAL_SIGN', braillePattern: [false, false, false, false, false, true], unicode: '⠠', type: 'symbol', displayName: 'Capital Sign' },
];

export const BRAILLE_LOWERCASE: BrailleCharacter[] = [
  { letter: 'a', braillePattern: [true, false, false, false, false, false], unicode: '⠁', type: 'letter', displayName: 'lowercase a' },
  { letter: 'b', braillePattern: [true, true, false, false, false, false], unicode: '⠃', type: 'letter', displayName: 'lowercase b' },
  { letter: 'c', braillePattern: [true, false, false, true, false, false], unicode: '⠉', type: 'letter', displayName: 'lowercase c' },
  { letter: 'd', braillePattern: [true, false, false, true, true, false], unicode: '⠙', type: 'letter', displayName: 'lowercase d' },
  { letter: 'e', braillePattern: [true, false, false, false, true, false], unicode: '⠑', type: 'letter', displayName: 'lowercase e' },
  { letter: 'f', braillePattern: [true, true, false, true, false, false], unicode: '⠋', type: 'letter', displayName: 'lowercase f' },
  { letter: 'g', braillePattern: [true, true, false, true, true, false], unicode: '⠛', type: 'letter', displayName: 'lowercase g' },
  { letter: 'h', braillePattern: [true, true, false, false, true, false], unicode: '⠓', type: 'letter', displayName: 'lowercase h' },
  { letter: 'i', braillePattern: [false, true, false, true, false, false], unicode: '⠊', type: 'letter', displayName: 'lowercase i' },
  { letter: 'j', braillePattern: [false, true, false, true, true, false], unicode: '⠚', type: 'letter', displayName: 'lowercase j' },
  { letter: 'k', braillePattern: [true, false, true, false, false, false], unicode: '⠅', type: 'letter', displayName: 'lowercase k' },
  { letter: 'l', braillePattern: [true, true, true, false, false, false], unicode: '⠇', type: 'letter', displayName: 'lowercase l' },
  { letter: 'm', braillePattern: [true, false, true, true, false, false], unicode: '⠍', type: 'letter', displayName: 'lowercase m' },
  { letter: 'n', braillePattern: [true, false, true, true, true, false], unicode: '⠝', type: 'letter', displayName: 'lowercase n' },
  { letter: 'o', braillePattern: [true, false, true, false, true, false], unicode: '⠕', type: 'letter', displayName: 'lowercase o' },
  { letter: 'p', braillePattern: [true, true, true, true, false, false], unicode: '⠏', type: 'letter', displayName: 'lowercase p' },
  { letter: 'q', braillePattern: [true, true, true, true, true, false], unicode: '⠟', type: 'letter', displayName: 'lowercase q' },
  { letter: 'r', braillePattern: [true, true, true, false, true, false], unicode: '⠗', type: 'letter', displayName: 'lowercase r' },
  { letter: 's', braillePattern: [false, true, true, true, false, false], unicode: '⠎', type: 'letter', displayName: 'lowercase s' },
  { letter: 't', braillePattern: [false, true, true, true, true, false], unicode: '⠞', type: 'letter', displayName: 'lowercase t' },
  { letter: 'u', braillePattern: [true, false, true, false, false, true], unicode: '⠥', type: 'letter', displayName: 'lowercase u' },
  { letter: 'v', braillePattern: [true, true, true, false, false, true], unicode: '⠧', type: 'letter', displayName: 'lowercase v' },
  { letter: 'w', braillePattern: [false, true, false, true, true, true], unicode: '⠺', type: 'letter', displayName: 'lowercase w' },
  { letter: 'x', braillePattern: [true, false, true, true, false, true], unicode: '⠭', type: 'letter', displayName: 'lowercase x' },
  { letter: 'y', braillePattern: [true, false, true, true, true, true], unicode: '⠽', type: 'letter', displayName: 'lowercase y' },
  { letter: 'z', braillePattern: [true, false, true, false, true, true], unicode: '⠵', type: 'letter', displayName: 'lowercase z' },
];

export const BRAILLE_CAPITALS: BrailleCharacter[] = [
  { letter: 'A', braillePattern: [true, false, false, false, false, false], unicode: '⠁', type: 'capital', displayName: 'Capital A' },
  { letter: 'B', braillePattern: [true, true, false, false, false, false], unicode: '⠃', type: 'capital', displayName: 'Capital B' },
  { letter: 'C', braillePattern: [true, false, false, true, false, false], unicode: '⠉', type: 'capital', displayName: 'Capital C' },
  { letter: 'D', braillePattern: [true, false, false, true, true, false], unicode: '⠙', type: 'capital', displayName: 'Capital D' },
  { letter: 'E', braillePattern: [true, false, false, false, true, false], unicode: '⠑', type: 'capital', displayName: 'Capital E' },
  { letter: 'F', braillePattern: [true, true, false, true, false, false], unicode: '⠋', type: 'capital', displayName: 'Capital F' },
  { letter: 'G', braillePattern: [true, true, false, true, true, false], unicode: '⠛', type: 'capital', displayName: 'Capital G' },
  { letter: 'H', braillePattern: [true, true, false, false, true, false], unicode: '⠓', type: 'capital', displayName: 'Capital H' },
  { letter: 'I', braillePattern: [false, true, false, true, false, false], unicode: '⠊', type: 'capital', displayName: 'Capital I' },
  { letter: 'J', braillePattern: [false, true, false, true, true, false], unicode: '⠚', type: 'capital', displayName: 'Capital J' },
  { letter: 'K', braillePattern: [true, false, true, false, false, false], unicode: '⠅', type: 'capital', displayName: 'Capital K' },
  { letter: 'L', braillePattern: [true, true, true, false, false, false], unicode: '⠇', type: 'capital', displayName: 'Capital L' },
  { letter: 'M', braillePattern: [true, false, true, true, false, false], unicode: '⠍', type: 'capital', displayName: 'Capital M' },
  { letter: 'N', braillePattern: [true, false, true, true, true, false], unicode: '⠝', type: 'capital', displayName: 'Capital N' },
  { letter: 'O', braillePattern: [true, false, true, false, true, false], unicode: '⠕', type: 'capital', displayName: 'Capital O' },
  { letter: 'P', braillePattern: [true, true, true, true, false, false], unicode: '⠏', type: 'capital', displayName: 'Capital P' },
  { letter: 'Q', braillePattern: [true, true, true, true, true, false], unicode: '⠟', type: 'capital', displayName: 'Capital Q' },
  { letter: 'R', braillePattern: [true, true, true, false, true, false], unicode: '⠗', type: 'capital', displayName: 'Capital R' },
  { letter: 'S', braillePattern: [false, true, true, true, false, false], unicode: '⠎', type: 'capital', displayName: 'Capital S' },
  { letter: 'T', braillePattern: [false, true, true, true, true, false], unicode: '⠞', type: 'capital', displayName: 'Capital T' },
  { letter: 'U', braillePattern: [true, false, true, false, false, true], unicode: '⠥', type: 'capital', displayName: 'Capital U' },
  { letter: 'V', braillePattern: [true, true, true, false, false, true], unicode: '⠧', type: 'capital', displayName: 'Capital V' },
  { letter: 'W', braillePattern: [false, true, false, true, true, true], unicode: '⠺', type: 'capital', displayName: 'Capital W' },
  { letter: 'X', braillePattern: [true, false, true, true, false, true], unicode: '⠭', type: 'capital', displayName: 'Capital X' },
  { letter: 'Y', braillePattern: [true, false, true, true, true, true], unicode: '⠽', type: 'capital', displayName: 'Capital Y' },
  { letter: 'Z', braillePattern: [true, false, true, false, true, true], unicode: '⠵', type: 'capital', displayName: 'Capital Z' },
];

export const NUMBERS_BRAILLE: BrailleCharacter[] = [
  { letter: '1', braillePattern: [true, false, false, false, false, false], unicode: '⠁', type: 'number', displayName: 'Number 1' },
  { letter: '2', braillePattern: [true, true, false, false, false, false], unicode: '⠃', type: 'number', displayName: 'Number 2' },
  { letter: '3', braillePattern: [true, false, false, true, false, false], unicode: '⠉', type: 'number', displayName: 'Number 3' },
  { letter: '4', braillePattern: [true, false, false, true, true, false], unicode: '⠙', type: 'number', displayName: 'Number 4' },
  { letter: '5', braillePattern: [true, false, false, false, true, false], unicode: '⠑', type: 'number', displayName: 'Number 5' },
  { letter: '6', braillePattern: [true, true, false, true, false, false], unicode: '⠋', type: 'number', displayName: 'Number 6' },
  { letter: '7', braillePattern: [true, true, false, true, true, false], unicode: '⠛', type: 'number', displayName: 'Number 7' },
  { letter: '8', braillePattern: [true, true, false, false, true, false], unicode: '⠓', type: 'number', displayName: 'Number 8' },
  { letter: '9', braillePattern: [false, true, false, true, false, false], unicode: '⠊', type: 'number', displayName: 'Number 9' },
  { letter: '0', braillePattern: [false, true, false, true, true, false], unicode: '⠚', type: 'number', displayName: 'Number 0' },
];

// Legacy export for backward compatibility
export const BRAILLE_CHARACTERS = BRAILLE_LOWERCASE;