import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sites = [
  {
    url: 'https://hoteltemplate254.netlify.app/',
    output: path.join(__dirname, 'public', 'images', 'demo-restaurant.png'),
    width: 1440,
    height: 900,
    label: 'Maison Étoile (Restaurant) — Desktop',
  },
  {
    url: 'https://e-commercedemovantage.netlify.app/',
    output: path.join(__dirname, 'public', 'images', 'demo-kinetics.png'),
    width: 390,
    height: 844,
    label: 'Kinetics Activewear (E-Commerce) — Mobile',
  },
  {
    url: 'https://dyelevents.netlify.app/',
    output: path.join(__dirname, 'public', 'images', 'demo-dyel.png'),
    width: 1280,
    height: 800,
    label: 'Dyel Events (Corporate) — Laptop',
  },
];

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  for (const site of sites) {
    console.log(`\nCapturing: ${site.label}`);
    console.log(`  URL: ${site.url}`);
    const page = await browser.newPage();

    await page.setViewport({ width: site.width, height: site.height, deviceScaleFactor: 2 });

    try {
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Extra wait for fonts/animations to settle
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: site.output, fullPage: false });
      console.log(`  ✓ Saved to: ${site.output}`);
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n✅ All screenshots complete.');
}

captureScreenshots().catch(console.error);
