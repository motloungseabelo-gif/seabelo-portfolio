# Seabelo Blessing Motloung — Portfolio

Personal software developer portfolio at https://seabelomotloung.co.za/.

## Content
Five short pages: Home, Work, About, CV and Contact. The November 2026 update uses the supplied CV and professional portrait. Featured projects are CyberAware, Kayak Database Management System and FocusFlow. Contact details and project links come from the CV. The downloadable PDF is the unmodified supplied document.

## Visual system
Graphite, off-white and mint-cyan, with a subtle grid and a framed portrait. Small desktop-only portrait depth effects respect reduced motion. A lightweight SVG cursor displays SBM on fine-pointer devices; touch devices retain native behaviour. Native cursor fallback and visible keyboard focus are provided.

## Technical notes
Buildless HTML/CSS/JavaScript; no frameworks, remote fonts, external portrait requests or client-side dependencies. Local 480px and 960px WebP portraits, deferred JavaScript, reserved image dimensions, semantic navigation and a progressively enhanced mobile menu. Main content stays available without JavaScript. Each page has a canonical URL, unique metadata, Open Graph, Twitter metadata and structured data. Sitemap and robots are retained for the existing domain.

## Hosting
GitHub Pages publishes the repository root from main. Preserve CNAME. Legacy portfolio_site HTML routes redirect to the current root pages. No Sites project or hosting migration is required.

## Checks
Use node --check assets/script.js. Check local links, metadata, portrait and CV loading; verify desktop and mobile layouts, navigation, project anchors, keyboard access and reduced-motion behaviour before publishing.
