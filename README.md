# knz.dev

DevOps Engineer with over 12 years of expertise in AWS, Cloudflare, Docker, and Linux systems.

## Project Overview

The website features a minimalist design with a unique twist: content is presented in a JSON structure, inspired by how developers interact with code and data structures. At its core lies a philosophical quote:

```json
{
    "they call us dreamers": [{
        "but we are the ones": "who dont sleep"
    }]
}
```

This quote reflects the DevOps engineer's mentality — people often labeled as dreamers who, in reality, are the ones keeping systems running through their constant dedication and readiness.

## Tech Stack

- Static HTML5 with minimalist design
- CSS3 with dark mode support
- [Bun](https://bun.sh) as package manager and script runtime
- [html-minifier-terser](https://github.com/terser/html-minifier-terser) for HTML/CSS/JS minification
- GitHub Actions for automated builds
- Cloudflare Pages for hosting

## Project Structure

```
.
├── .github/workflows/    # CI workflows
├── dist/                 # Minified build output (served by Cloudflare Pages)
├── scripts/minify.js     # Build script
├── index.html            # Source HTML
├── package.json
└── bun.lock
```

## Local Development

Install dependencies:

```bash
bun install
```

Build the minified output to `dist/`:

```bash
bun run build
```

## Deployment

Two pieces work together:

1. **GitHub Actions (`.github/workflows/minify.yml`)**: Runs on every push to `main` that touches `index.html`, the build script, `package.json`, `bun.lock`, or the workflow itself. It runs `bun run build` and commits the resulting `dist/index.html` back to `main`.
2. **Cloudflare Pages**: Connected to the `main` branch of this repository. Build command is left empty since the `dist/` folder is already prebuilt by GitHub Actions. Output directory is set to `dist/`.

The custom domain `knz.dev` is served through Cloudflare Pages.

## Versioning

This project follows Semantic Versioning (MAJOR.MINOR.PATCH):
- MAJOR for fundamental changes
- MINOR for new features (backward compatible)
- PATCH for bug fixes (backward compatible)

## Version History

### v0.2.0 (April 2026)
- Migrated hosting to Cloudflare Pages
- Replaced unmaintained `html-minifier` with `html-minifier-terser`
- Removed `chokidar` and `fs-extra` dependencies in favor of Bun built-ins
- Rewrote `scripts/minify.js` as ESM
- Reduced install footprint to a single devDependency

### v0.1.0 (February 2025)
- Initial setup with minimalist design
- Interactive, collapsible JSON content structure
- Dark mode support
- Automated build process with GitHub Actions

## License

© 2026 knz.dev. See [LICENSE](LICENSE) for details.
