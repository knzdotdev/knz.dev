# knz.dev

DevOps Engineer with over 12 years of expertise in AWS, Cloudflare, Docker, and Linux systems.

## Project Overview

The website features a minimalist design with a unique twist: Content is presented in a json structure, inspired by how developers interact with code and data structures. At its core lies a philosophical quote:

```json
{
    "they call us dreamers": [{
        "but we are the ones": "who dont sleep"
    }]
}
```

This quote reflects the DevOps engineer's mentality - people often labeled as dreamers who, in reality, are the ones keeping systems running through their constant dedication and readiness.

## Technical Stack

- HTML5 with minimalist design
- CSS3 with dark mode support
- Bun for dependency management and scripts
- GitHub Actions for automated builds

## Build Process

The project uses Bun for package management and build processes. The HTML is automatically minified using GitHub Actions.

### Local Development

1. Install dependencies:
```bash
bun install
```

2. Run minification (one-time):
```bash
bun run build
```

3. Watch mode for development:
```bash
bun run watch
```

### Automated Builds

The project uses GitHub Actions for automated minification:
- Triggers on changes to `index.html`
- Automatically minifies HTML
- Commits minified version to `dist/` directory
- Can be manually triggered via GitHub Actions UI

## Project Structure

```
.
├── .github/workflows/  # GitHub Actions workflows
├── dist/              # Minified output
├── scripts/           # Build scripts
├── index.html         # Source HTML
└── package.json       # Project configuration
```

## Version History

### v0.1.0 (Current - February 2025)
- Initial setup with minimalist design
- Interactive, collapsible content structure
- Dark mode support
- Automated build process with GitHub Actions

### Planned Features
- Portfolio section showcasing DevOps best practices
- Tech blog integration
- AWS/Docker case studies
- Interactive Infrastructure-as-Code examples

## Development

This project follows Semantic Versioning (MAJOR.MINOR.PATCH):
- MAJOR version for fundamental changes
- MINOR version for new features (backward compatible)
- PATCH version for bug fixes (backward compatible)

## License

© 2025 knz.dev. See [LICENSE](LICENSE) for details.