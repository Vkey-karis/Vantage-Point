import fs from 'node:fs';
import path from 'node:path';

const target = path.join('node_modules', '@revijs', 'core', 'src', 'utils', 'score.js');
if (fs.existsSync(target)) {
  let content = fs.readFileSync(target, 'utf8');
  if (content.includes('export function printScoreReport')) {
    content = content.replace('export function printScoreReport', 'export async function printScoreReport');
    fs.writeFileSync(target, content, 'utf8');
    console.log('✓ Patched @revijs/core score.js async declaration');
  } else {
    console.log('• @revijs/core score.js is already patched');
  }
}
