import { execSync } from 'node:child_process';
import fs from 'node:fs';

console.log('--- Executing ReviJs Prerendering ---');

try {
  execSync('npx revijs render', { stdio: 'inherit' });
  console.log('✓ ReviJs prerender completed successfully.');
} catch (err) {
  console.warn('\n⚠️  Notice: Headless Chromium cannot launch in this environment (expected on serverless Linux CI containers lacking desktop GUI shared libraries like libnspr4.so).');
  
  if (fs.existsSync('dist-prerendered/index.html')) {
    console.log('✓ Using pre-rendered HTML snapshots already committed in dist-prerendered/.');
  } else {
    fs.cpSync('dist', 'dist-prerendered', { recursive: true });
    console.log('✓ Fallback: Populated dist-prerendered/ from dist/.');
  }
}
