# Medhavat — Intellectual Tech. Real Business Growth.

> High-performance enterprise digital transformation platform engineered for scaling businesses. Built with zero-framework vanilla web technologies, hardware-accelerated binary matrix canvas dynamics (`CursorWave`), a 2×2 matrix Theme HUD (Eco-Data spectrum), full GDPR/DPDP data compliance, and an industry-leading SEO, AEO (Answer Engine Optimization), and AI-search discoverability architecture.

---

## 📊 Current Project Status

- **Production Status**: Live & Production Ready.
- **Canonical Domain**: `https://medhavat.com` (enforcing clean extensionless URLs, HTTPS, and browser caching via `.htaccess`).
- **Core Pages (8/8 Complete)**:
  1. **Home (`/`)**: Digital transformation positioning, philosophy, metrics, and core services overview.
  2. **Services (`/services`)**: Full 8-service suite with detailed Features, Advantages, and Business Benefits (FAB).
  3. **AI Services (`/ai-services`)**: Deep-dive into autonomous AI agents, enterprise document RAG, predictive algorithms, and accordion FAQ.
  4. **Portfolio (`/portfolio`)**: 4 enterprise case studies (HealthTech EHR, MedhaDoc RAG, Scalable Commerce, AI Brand Identity).
  5. **Insights (`/insights`)**: 6 engineering teardowns, RAG architecture blueprints, and performance perspectives.
  6. **Contact (`/contact`)**: Direct leadership consultation, multi-step project qualification inquiry form, and WhatsApp connect.
  7. **Privacy Policy (`/privacy-policy`)**: GDPR and Indian DPDP Act 2023 compliance notice with complete data retention table.
  8. **Terms & Conditions (`/terms`)**: Enterprise MSA/SOW terms, 100% custom IP ownership transfer, and Pune jurisdiction.
- **Build Engine**: Multi-page Vite v7.3 (`npm run build` compiles in ~300ms to `/dist`).
- **Structured Data**: 100% valid Schema.org `@graph` JSON-LD networks across all 8 pages (AST-verified, 0 errors).
- **AI Search Discoverability**: Fully compliant with [llmstxt.org](https://llmstxt.org) standard (`llms.txt`), AI bot permissions in `robots.txt`, and clean `sitemap.xml`.

---

## 🤖 CRITICAL INSTRUCTIONS FOR CODING AGENTS (STRICT PROTOCOL)

> [!IMPORTANT]
> **MANDATORY INSTRUCTIONS FOR ALL AI CODING AGENTS & COLLABORATORS**  
> Every automated coding agent, pair programmer, or developer modifying this repository **MUST** strictly adhere to the following 7 non-negotiable rules on every edit. These measures safeguard our organic search rankings, accessibility standards, and answer engine discoverability (ChatGPT Search, Perplexity, Claude, Google AI Overviews).

### Rule 1: Strict Copy Invariance (Zero Rewrite Policy)
- **NEVER** modify, rephrase, rewrite, shorten, summarize, or polish any visible on-page copy.
- This includes headings (`h1`–`h6`), paragraph text, bullet points, button labels, testimonials, badges, trust counters, and form labels.
- All copy is client-approved, stakeholder-signed, and legally final.
- All enhancements must occur strictly in **structure, markup, semantics, metadata, attributes, and supporting layers**.

### Rule 2: Semantic HTML & Accessibility Landmark Structure
- **Landmarks are mandatory** on every HTML page:
  - `<header class="nav" id="navbar" role="banner">`
  - `<nav class="nav__links" aria-label="Main Navigation" role="navigation">`
  - `<nav class="nav__drawer" aria-label="Mobile Navigation Menu" role="navigation">`
  - `<main id="main-content" role="main">`
  - `<footer class="footer" role="contentinfo">`
- **Heading Hierarchy (`H1` → `H2` → `H3`)**:
  - Exactly **one `<h1>`** per page.
  - Heading levels must nest logically without skipping levels.
  - If a card grid or content cluster uses `<h3>` headings without an immediate visible parent `<h2>`, you **must** insert an accessible, visually-hidden heading using the `.sr-only` class:
    ```html
    <h2 class="sr-only">Descriptive Section Topic</h2>
    ```
  - Footer column titles must **always be `<h3>`** with class `footer__col-title` (e.g. `<h3 class="footer__col-title">Navigation</h3>`), **never `<h4>`**.
  - Footer link groups must be wrapped in semantic `<nav aria-label="...">` elements.
- **Form Inputs**:
  - Always provide standard HTML5 `autocomplete` attributes on all form controls (`autocomplete="name"`, `autocomplete="email"`, `autocomplete="tel"`, `autocomplete="organization"`).

### Rule 3: Clean Canonical URLs & Internal Linking
- Medhavat enforces **clean, extensionless URLs** via Apache rewrite rules (`.htaccess`).
- **Standard URL Formats**:
  - Root: `https://medhavat.com/` (trailing slash)
  - Subpages: `https://medhavat.com/services`, `https://medhavat.com/ai-services`, `https://medhavat.com/portfolio`, `https://medhavat.com/insights`, `https://medhavat.com/contact`, `https://medhavat.com/privacy-policy`, `https://medhavat.com/terms` (NO trailing slash, NO `.html` extension).
- **Internal Links**:
  - **NEVER** link to `.html` files in `<a>` tags (e.g., use `<a href="/services">`, NEVER `<a href="./services.html">` or `<a href="/services.html">`).
- **Header Canonical & Hreflang**:
  - Every page must have `<link rel="canonical" href="https://medhavat.com/<clean-slug>">`.
  - Every page must include `<link rel="alternate" hreflang="en" href="...">` and `<link rel="alternate" hreflang="x-default" href="...">`.

### Rule 4: Schema.org JSON-LD Structured Data Integrity
- Every page must contain a rich, valid `<script type="application/ld+json">` utilizing the `@graph` array format.
- **Baseline Entities (All Pages)**:
  - `Organization` (Legal name, URL, Pune HQ, contact point, geo-coordinates, area served).
  - `WebSite` (Canonical URL, organization publisher reference).
  - `WebPage` (or specialized subtype like `ContactPage`, `CollectionPage`).
  - `BreadcrumbList` (Position 1: Home, Position 2: Current Page).
- **Page-Specific Schema Entities**:
  - `/services` → `ItemList` of `Service` entities covering all 8 offerings.
  - `/ai-services` → `Service` (Enterprise AI) + `FAQPage` containing **verbatim on-page Q&A text** (never invent or alter questions/answers).
  - `/portfolio` → `CollectionPage` + `ItemList` of `CreativeWork` for featured case studies.
  - `/insights` → `Blog` + `BlogPosting` for all engineering whitepapers.
  - `/contact` → `ContactPage` + `ProfessionalService` + `SpeakableSpecification`.
- **Validation**:
  - Always verify that JSON-LD blocks parse cleanly with valid syntax (no trailing commas, unescaped quotes, or broken brackets).

### Rule 5: AEO & AI Discoverability (`llms.txt` & Crawl Directives)
- We maintain the emerging Markdown standard for LLM crawlers at `public/llms.txt` (and root `llms.txt`).
- **Whenever a new service, page, or major technical capability is introduced**:
  - Update `public/llms.txt` and root `llms.txt` with a concise FAB description, verified trust signals, and clean endpoint link.
- **`robots.txt` Requirements**:
  - Both `public/robots.txt` and root `robots.txt` must explicitly allow modern AI search user-agents: `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Amazonbot`, and `Applebot-Extended`.
  - Must always declare `Sitemap: https://medhavat.com/sitemap.xml`.
- **`sitemap.xml` Requirements**:
  - Both `public/sitemap.xml` and root `sitemap.xml` must list all clean canonical URLs with valid `<lastmod>`, `<changefreq>`, and `<priority>`.

### Rule 6: Open Graph & Social Cards
- Every page `<head>` must include complete Open Graph and Twitter Card tags:
  - `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:image:width="1200"`, `og:image:height="630"`, `og:site_name="Medhavat"`, `og:locale="en_US"`.
  - `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`.
  - Default social card is `https://medhavat.com/assets/images/og-image.svg`.
  - Meta robots must declare: `content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"`.

### Rule 7: Performance & Core Web Vitals (CWV)
- **Zero CLS (Cumulative Layout Shift)**:
  - Primary webfonts must be preloaded in `<head>`:
    ```html
    <link rel="preload" href="./assets/fonts/PlusJakartaSans-Bold.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="./assets/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin>
    ```
  - All `<img>` tags must declare explicit `width` and `height` attributes.
- **Fast FCP / LCP**:
  - Above-the-fold logo image in the header must use `fetchpriority="high"`.
  - Below-the-fold images, footer logo, and iframes (e.g. Google Maps) must use `loading="lazy"`.
- **Build Integrity**:
  - Any new HTML page must be registered under `build.rollupOptions.input` in `vite.config.js` to ensure inclusion in production bundles.

---

## 📁 Repository Structure

```text
Medhavat/
├── .htaccess                       # Root Apache clean URL rewrite & caching rules
├── llms.txt                        # AI crawler context file (llmstxt.org standard)
├── robots.txt                      # Search & AI crawler directives + Sitemap pointer
├── sitemap.xml                     # XML sitemap with 8 canonical clean URLs
├── public/                         # Static assets copied directly to dist/ by Vite
│   ├── .htaccess                   # Production Apache rewrite rules
│   ├── llms.txt                    # Public LLM context file
│   ├── robots.txt                  # Public crawler permissions
│   ├── sitemap.xml                 # Public XML sitemap
│   └── og-image.svg                # 1200×630 high-res social card asset
├── assets/
│   ├── css/
│   │   ├── tokens.css              # Design tokens & 4x data-theme CSS variables
│   │   ├── cursor-wave.css         # Reset, typography, layout, .sr-only & canvas styles
│   │   ├── components.css          # Glassmorphic cards, buttons, badges & forms
│   │   ├── theme-hud.css           # Floating 2×2 Theme HUD styles & transitions
│   │   └── cookie-consent.css      # GDPR Cookie retention banner & modal styling
│   ├── js/
│   │   ├── cursor-wave.js          # Hardware-accelerated binary canvas & RGB lerper
│   │   ├── theme-hud.js            # HUD switcher UI, localStorage & event dispatch
│   │   ├── cookie-consent.js       # GDPR Cookie retention controller & modal logic
│   │   └── main.js                 # Global application bootstrap & event wiring
│   ├── fonts/                      # Self-hosted Plus Jakarta Sans & Inter fonts (.woff2)
│   └── images/
│       ├── medhavat-logo.svg       # Brand vector logo mark
│       ├── favicon.svg             # Vector favicon
│       └── og-image.svg            # Open Graph social preview vector
├── index.html                      # Home page (/)
├── services.html                   # Core digital transformation services (/services)
├── ai-services.html                # Enterprise AI, RAG & agent solutions (/ai-services)
├── portfolio.html                  # Case studies & client success stories (/portfolio)
├── insights.html                   # Engineering teardowns & perspectives (/insights)
├── contact.html                    # Consultation & project inquiry form (/contact)
├── privacy-policy.html             # GDPR / DPDP Privacy policy (/privacy-policy)
├── terms.html                      # Enterprise Terms of Service (/terms)
├── vite.config.js                  # Multi-page Vite configuration & rollup inputs
└── package.json                    # Scripts and project dependencies
```

---

## 🌟 Key Features & Architectural Highlights

### 1. 🎛️ Floating 2×2 Theme HUD Matrix
- **Matrix Configuration**: Switches between `(Day, Night) × (Coloured, Greyscale)`.
  - **Night + Coloured**: Dark slate canvas (`#07090e`) with the **Eco-Data** palette (`#1B3863`, `#155E75`, `#0D9488`, `#14B8A6`, `#4ADE80`).
  - **Night + Greyscale**: Sleek dark monochrome aesthetic.
  - **Day + Coloured**: Clean daylight canvas (`#f8fafc`) with corporate navy, ocean teal, and vibrant turquoise accents.
  - **Day + Greyscale**: Crisp light canvas with neutral slate typography and frosted glass cards.
- **Cinematic Transition Engine**:
  - **Dual-Layer Canvas RGB Morphing**: Interactive canvas background and binary digits morph over 900ms using cubic RGB/RGBA lerping (`lerpColor`).
  - **Origin-Aware Quantum Shockwave**: Radiates an energy ripple across the binary matrix directly from the clicked HUD swatch card.
  - **Silky CSS Color Dissolve**: 850ms `cubic-bezier(0.4, 0, 0.2, 1)` easing curve across backgrounds, borders, typography, card glow shadows, and glass backdrops.
- **Persistence**: Remembers user selection across page refreshes and navigation via `localStorage`.

### 2. ⚡ Zero-Dependency Binary Matrix Interactive Background (`CursorWave`)
- Full-page hardware-accelerated `<canvas>` layer rendering responsive binary `0` and `1` streams.
- Cursor influence swell, click shockwaves, and dynamic DOM element masking (`[data-cursor-wave-mask]`).
- Calibrated with soft, muted opacities to preserve text contrast in both Day and Night modes.

### 3. 🛡️ GDPR & DPDP Legal & Cookie Retention Suite
- **Privacy Policy ([`/privacy-policy`](./privacy-policy.html))**: Full compliance with the **EU GDPR** and **Indian DPDP Act 2023**, with a detailed data retention schedule table.
- **Terms & Conditions ([`/terms`](./terms.html))**: Enterprise service agreements covering Statements of Work (SOW), 100% custom IP ownership transfer, confidentiality, warranties, and Pune jurisdiction.
- **GDPR Cookie Consent Modal ([`cookie-consent.js`](./assets/js/cookie-consent.js))**:
  - Maximum retention disclosure (12 months).
  - Granular toggles: **Strictly Necessary**, **Functional & Themes**, **Performance & Analytics**, and **Marketing**.
  - Footer **"Cookie Settings"** trigger to inspect or revoke consent at any time.

---

## 🎨 Eco-Data Color System Reference

| Token Name | Hex Code | Role in Design System |
| :--- | :--- | :--- |
| **Color 1** | `#1B3863` | Deep Corporate Navy (Base & dark accents) |
| **Color 2** | `#155E75` | Ocean Teal (Primary brand accents) |
| **Color 3** | `#0D9488` | Deep Mint (Secondary accents & day primary) |
| **Color 4** | `#14B8A6` | Vibrant Turquoise (Interactive highlights & borders) |
| **Color 5** | `#4ADE80` | Data Green (Metrics, badges & glowing gradients) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation & Development
```bash
# Clone the repository
git clone https://github.com/wsmaisys/Medhavat.git
cd Medhavat

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

### Production Build & Preview
```bash
# Compile and bundle all 8 pages into /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License & Legal
© 2026 Medhavat Technologies. All rights reserved. Registered in Pune, Maharashtra, India.  
All client intellectual property, codebases, and custom deliverables are proprietary to their respective owners.
