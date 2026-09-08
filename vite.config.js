import { readFileSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';

function criticalCssPlugin() {
  return {
    name: 'critical-css-plugin',
    apply: 'build',
    transformIndexHtml(html) {
      try {
        const tokensCss = readFileSync(resolve(__dirname, 'assets/css/tokens.css'), 'utf8')
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\s+/g, ' ')
          .trim();

        const inlinedTokens = `<style id="critical-tokens">${tokensCss}</style>`;

        return html
          .replace('</head>', `  ${inlinedTokens}\n</head>`)
          .replace(
            /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
            '<link rel="preload" as="style" href="$1" crossorigin onload="this.onload=null;this.rel=\'stylesheet\'">\n  <noscript><link rel="stylesheet" crossorigin href="$1"></noscript>'
          );
      } catch (e) {
        return html;
      }
    }
  };
}

export default defineConfig({
  root: '.',
  plugins: [criticalCssPlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        aiServices: resolve(__dirname, 'ai-services.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        insights: resolve(__dirname, 'insights.html'),
        contact: resolve(__dirname, 'contact.html'),
        privacyPolicy: resolve(__dirname, 'privacy-policy.html'),
        terms: resolve(__dirname, 'terms.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
