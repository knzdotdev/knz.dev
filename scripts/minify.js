import { minify } from "html-minifier-terser";

const SOURCE = "index.html";
const OUTPUT = "dist/index.html";

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

const source = await Bun.file(SOURCE).text();
const minified = await minify(source, options);
await Bun.write(OUTPUT, minified);

const sourceSize = Buffer.byteLength(source);
const minifiedSize = Buffer.byteLength(minified);
const reduction = ((sourceSize - minifiedSize) / sourceSize) * 100;

console.log(`Minified: ${(sourceSize / 1024).toFixed(2)}KB → ${(minifiedSize / 1024).toFixed(2)}KB (-${reduction.toFixed(2)}%)`);
