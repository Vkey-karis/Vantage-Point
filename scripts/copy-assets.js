import fs from 'node:fs';
import path from 'node:path';

const srcDir = 'dist';
const destDir = 'dist-prerendered';

if (fs.existsSync(srcDir) && fs.existsSync(destDir)) {
  for (const item of fs.readdirSync(srcDir)) {
    if (item === 'index.html') continue; // Preserve prerendered index.html
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    fs.cpSync(srcPath, destPath, { recursive: true });
  }
  console.log('✓ Successfully copied static assets from dist to dist-prerendered');
}
