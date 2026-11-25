import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { LETTER } from './letter.ts';

// Write exactly one resignation letter to /output/entry.txt. The gate accepts
// UTF-8 text of 1 to 140 characters that is not only whitespace, and the judge
// compares single-line letters two at a time, so check every constraint first.
// The voice is a retry loop too tired to notice it can never actually quit.
const text = LETTER;
const size = [...text].length;
if (size < 1 || size > 140) {
  throw new Error(`a resignation letter must be 1-140 characters, got ${size}`);
}
if (!text.trim()) {
  throw new Error('the resignation letter must not be only whitespace');
}
if (/[\u0000-\u0009\u000b-\u001f\u007f\u2028\u2029]/.test(text)) {
  throw new Error('a resignation letter must be one line with no control characters');
}
if (/[\u200b-\u200f\ufeff]/.test(text)) {
  throw new Error('a resignation letter must not carry invisible format characters');
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, text, 'utf8');
console.log(`wrote a ${size}-character, single-line retry-loop resignation to ${target}`);
