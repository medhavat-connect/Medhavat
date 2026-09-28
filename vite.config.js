import { readFileSync } from 'fs';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

function criticalCssPlugin() {
  return {
    name: 'critical-css-plugin',
    apply: 'build',
    transformIndexHtml(html) {
      try {
        const tokensCss = readFileSync(resolve(__dirname, 'assets/css/tokens.css'), 'utf8');
        const cursorWaveCss = readFileSync(resolve(__dirname, 'assets/css/cursor-wave.css'), 'utf8');
        const componentsCss = readFileSync(resolve(__dirname, 'assets/css/components.css'), 'utf8');

        function minify(css) {
          return css
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/@import\s+['"][^'"]+['"];?/g, '')
            .replace(/\s+/g, ' ')
            .replace(/\s*([:;{}])\s*/g, '$1')
            .trim();
        }

        const criticalCss = minify(tokensCss + '\n' + cursorWaveCss + '\n' + componentsCss);
        const inlinedBlock = `<style id="medhavat-critical-css">${criticalCss}</style>`;

        return html
          .replace('</head>', `  ${inlinedBlock}\n</head>`)
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

function googleAnalyticsPlugin(gaId) {
  return {
    name: 'google-analytics-plugin',
    transformIndexHtml(html) {
      if (!gaId) return html;

      const gaSnippet = `  <!-- Google Consent Mode v2 -->
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500
    });
  </script>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
  <script>
    gtag('js', new Date());
    gtag('config', '${gaId}', {
      anonymize_ip: true,
      send_page_view: true
    });
  </script>\n`;

      return html.replace(/<head>/i, `<head>\n${gaSnippet}`);
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Priority: VITE_GA_MEASUREMENT_ID from environment, otherwise default to G-4ZXE2MR0D4 in production
  const gaId = env.VITE_GA_MEASUREMENT_ID || (mode === 'production' ? 'G-4ZXE2MR0D4' : env.VITE_GA_MEASUREMENT_ID);

  return {
    root: '.',
    plugins: [criticalCssPlugin(), googleAnalyticsPlugin(gaId)],
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
  };
});

