import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function captureOne(browser, { url, output, width, height, label }) {
  console.log(`\nCapturing: ${label}`);
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  try {
    // Use 'domcontentloaded' + extra wait instead of networkidle2 so slow sites don't fail
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise(r => setTimeout(r, 4000)); // let images / fonts settle
    await page.screenshot({ path: output, fullPage: false });
    console.log(`  ✓ Saved: ${output}`);
  } catch (err) {
    console.error(`  ✗ Error: ${err.message}`);
  } finally {
    await page.close();
  }
}

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

await captureOne(browser, {
  url: 'https://dyelevents.netlify.app/',
  output: path.join(__dirname, 'public', 'images', 'demo-dyel.png'),
  width: 1280,
  height: 800,
  label: 'Dyel Events (Corporate) — Laptop',
});

await browser.close();
console.log('\nDone.');
