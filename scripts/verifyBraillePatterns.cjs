const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'brailleData.ts');
const src = fs.readFileSync(filePath, 'utf8');

// crude regex to capture entries like { letter: 'a', braillePattern: [true, false, ...], unicode: '⠁', ... }
const entryRegex = /\{\s*letter:\s*'([^']+)'[\s\S]*?braillePattern:\s*(\[[^\]]+\])[\s\S]*?unicode:\s*'([^']+)'/g;

const mismatches = [];
let m;
while ((m = entryRegex.exec(src)) !== null) {
  const letter = m[1];
  const patternStr = m[2];
  const unicode = m[3];

  // parse pattern string into boolean array
  const bools = patternStr
    .replace(/true/g, 'true')
    .replace(/false/g, 'false')
    .replace(/'/g, '"');

  let pattern;
  try {
    pattern = JSON.parse(bools);
  } catch (err) {
    console.error('Failed to parse pattern for', letter, patternStr);
    continue;
  }

  // Get codepoint value for unicode char (first char)
  const ch = unicode[0];
  const code = ch.codePointAt(0);
  if (typeof code !== 'number') continue;
  const delta = code - 0x2800;

  // compute expected pattern from delta using bits 0..5
  const expected = [0,1,2,3,4,5].map(i => !!(delta & (1 << i)));

  // compare
  const ok = expected.length === pattern.length && expected.every((v,i) => v === pattern[i]);
  if (!ok) {
    mismatches.push({ letter, unicode, pattern, expected });
  }
}

if (mismatches.length === 0) {
  console.log('All braille entries matched their Unicode patterns.');
} else {
  console.log('Found mismatches:');
  mismatches.forEach(x => {
    console.log(`- ${x.letter}: pattern=${JSON.stringify(x.pattern)} expected=${JSON.stringify(x.expected)} unicode=${x.unicode}`);
  });
  process.exitCode = 2;
}
