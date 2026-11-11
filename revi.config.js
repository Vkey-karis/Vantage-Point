// revi.config.js
export default {
  routes: [
    '/',
    '/blog',
    '/blog/how-much-does-a-professional-website-cost-in-kenya-in-2026',
  ],
  engine: 'browser',
  outputDir: 'dist-prerendered',
  distDir: 'dist',

  // Wait for React + Sanity to signal completion
  readyFlag: true,
  waitFor: 1500, // Fallback wait time in ms

  // SEO & Output Options
  injectMeta: true,
  sitemap: true,
  score: true,
  report: true,

  headless: true,
  port: 4173,
};
