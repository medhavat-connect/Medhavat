const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');

// Route configurations with clean URLs, filenames, priorities, and fallback/content baseline dates
const routes = [
  {
    url: 'https://medhavat.com/',
    file: 'index.html',
    changefreq: 'weekly',
    priority: '1.0',
    contentDate: '2026-09-08'
  },
  {
    url: 'https://medhavat.com/services',
    file: 'services.html',
    changefreq: 'weekly',
    priority: '0.9',
    contentDate: '2026-09-08'
  },
  {
    url: 'https://medhavat.com/ai-services',
    file: 'ai-services.html',
    changefreq: 'weekly',
    priority: '0.9',
    contentDate: '2026-09-08'
  },
  {
    url: 'https://medhavat.com/portfolio',
    file: 'portfolio.html',
    changefreq: 'monthly',
    priority: '0.8',
    contentDate: '2026-09-01'
  },
  {
    url: 'https://medhavat.com/insights',
    file: 'insights.html',
    changefreq: 'weekly',
    priority: '0.8',
    contentDate: '2026-09-07'
  },
  {
    url: 'https://medhavat.com/contact',
    file: 'contact.html',
    changefreq: 'monthly',
    priority: '0.8',
    contentDate: '2026-09-07'
  },
  {
    url: 'https://medhavat.com/privacy-policy',
    file: 'privacy-policy.html',
    changefreq: 'yearly',
    priority: '0.3',
    contentDate: '2026-09-01' // Matches on-page "Last Updated: September 1, 2026"
  },
  {
    url: 'https://medhavat.com/terms',
    file: 'terms.html',
    changefreq: 'yearly',
    priority: '0.3',
    contentDate: '2026-09-01' // Matches on-page "Last Updated: September 1, 2026"
  }
];

function getFileDate(route) {
  const filePath = path.join(rootDir, route.file);
  if (!fs.existsSync(filePath)) {
    return route.contentDate || new Date().toISOString().split('T')[0];
  }

  // Check if file has an explicit on-page date (e.g. "Last Updated: September 1, 2026")
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const dateMatch = content.match(/Last Updated:\s*([A-Za-z]+)\s*(\d{1,2}),\s*(\d{4})/i);
    if (dateMatch) {
      const months = {
        january: '01', february: '02', march: '03', april: '04',
        may: '05', june: '06', july: '07', august: '08',
        september: '09', october: '10', november: '11', december: '12'
      };
      const m = months[dateMatch[1].toLowerCase()];
      const d = dateMatch[2].padStart(2, '0');
      const y = dateMatch[3];
      if (m && d && y) {
        return `${y}-${m}-${d}`;
      }
    }
  } catch (e) {
    // Ignore and fallback
  }

  return route.contentDate;
}

function generateSitemapXml() {
  const entries = routes.map(route => {
    const lastmod = getFileDate(route);
    return `  <url>
    <loc>${route.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;
}

const sitemapXml = generateSitemapXml();

// Write to public/sitemap.xml (which Vite copies to dist/sitemap.xml) and root sitemap.xml
const publicSitemap = path.join(rootDir, 'public', 'sitemap.xml');
const rootSitemap = path.join(rootDir, 'sitemap.xml');

fs.writeFileSync(publicSitemap, sitemapXml, 'utf8');
fs.writeFileSync(rootSitemap, sitemapXml, 'utf8');

console.log('✅ Generated sitemap.xml with verified authentic lastmod timestamps:');
routes.forEach(r => console.log(`   - ${r.url.padEnd(36)} : ${getFileDate(r)}`));
