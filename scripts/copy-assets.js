import fs from 'node:fs';
import path from 'node:path';

const srcDir = 'dist';
const destDir = 'dist-prerendered';

if (fs.existsSync(srcDir) && fs.existsSync(destDir)) {
  // 1. Copy assets, images, and public files from dist to dist-prerendered
  for (const item of fs.readdirSync(srcDir)) {
    if (item === 'index.html') continue; // keep the prerendered HTML
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    fs.cpSync(srcPath, destPath, { recursive: true });
  }
  console.log('✓ Successfully copied static assets (JS, CSS, images) from dist to dist-prerendered');

  // 2. Extract latest JS and CSS asset tags from dist/index.html
  const distIndexHtml = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
  const scriptMatch = distIndexHtml.match(/<script[^>]*src="\/assets\/[^"]*"[^>]*><\/script>/);
  const cssMatch = distIndexHtml.match(/<link[^>]*href="\/assets\/[^"]*"[^>]*>/);

  if (scriptMatch && cssMatch) {
    const newScriptTag = scriptMatch[0];
    const newCssTag = cssMatch[0];

    // Helper to recursively update HTML files in dist-prerendered
    function updateHtmlTags(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name !== 'assets' && entry.name !== 'images') {
            updateHtmlTags(fullPath);
          }
        } else if (entry.name.endsWith('.html')) {
          let html = fs.readFileSync(fullPath, 'utf8');
          // Replace script and css bundle tags with the latest Vite hashes
          html = html.replace(/<script[^>]*src="\/assets\/[^"]*"[^>]*><\/script>/g, newScriptTag);
          html = html.replace(/<link[^>]*href="\/assets\/[^"]*"[^>]*>/g, newCssTag);
          fs.writeFileSync(fullPath, html, 'utf8');
        }
      }
    }

    updateHtmlTags(destDir);
    console.log('✓ Synchronized latest Vite asset bundle hashes in all prerendered HTML files');
  }
}
