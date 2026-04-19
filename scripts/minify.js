import { minify } from "html-minifier-terser";
import pkg from "../package.json" with { type: "json" };

const SOURCE = "index.html";
const OUTPUT = "dist/index.html";
const VERSION_TOKEN = "__VERSION__";

const options = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyCSS: true,
  minifyJS: true,
  useShortDoctype: true,
};

function runGit(args) {
  const proc = Bun.spawnSync(["git", ...args]);
  if (proc.exitCode !== 0) return null;
  return new TextDecoder().decode(proc.stdout).trim() || null;
}

function resolveVersion() {
  if (process.env.SITE_VERSION) return process.env.SITE_VERSION;

  const base = pkg.version;

  // CI: use GitHub Actions run number as monotonic build counter
  if (process.env.GITHUB_RUN_NUMBER) {
    const sha = (process.env.GITHUB_SHA ?? "").slice(0, 7);
    const suffix = sha ? `.${sha}` : "";
    return `${base}+build.${process.env.GITHUB_RUN_NUMBER}${suffix}`;
  }

  // Local: derive from git history
  const count = runGit(["rev-list", "--count", "HEAD"]);
  const sha = runGit(["rev-parse", "--short", "HEAD"]);
  if (count && sha) return `${base}+build.${count}.${sha}`;

  return `${base}+dev`;
}

const version = resolveVersion();
const rawSource = await Bun.file(SOURCE).text();

if (!rawSource.includes(VERSION_TOKEN)) {
  console.warn(`warning: token ${VERSION_TOKEN} not found in ${SOURCE}`);
}

const source = rawSource.replaceAll(VERSION_TOKEN, version);
const minified = await minify(source, options);
await Bun.write(OUTPUT, minified);

const sourceSize = Buffer.byteLength(source);
const minifiedSize = Buffer.byteLength(minified);
const reduction = ((sourceSize - minifiedSize) / sourceSize) * 100;

console.log(`Version: ${version}`);
console.log(`Minified: ${(sourceSize / 1024).toFixed(2)}KB → ${(minifiedSize / 1024).toFixed(2)}KB (-${reduction.toFixed(2)}%)`);
