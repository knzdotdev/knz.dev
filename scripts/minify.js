const minifier = require('html-minifier');
const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');

// Configuration for HTML minifier
const minifierOptions = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyCSS: true,
    minifyJS: true,
    useShortDoctype: true
};

// Paths
const sourcePath = 'index.html';
const distPath = 'dist';
const outputPath = path.join(distPath, 'index.html');

// Ensure dist directory exists
fs.ensureDirSync(distPath);

// Minification function
async function minifyHTML() {
    try {
        console.log('🔄 Starting minification...');
        
        // Read the source file
        const sourceHTML = await fs.readFile(sourcePath, 'utf8');
        
        // Minify the HTML
        const minifiedHTML = minifier.minify(sourceHTML, minifierOptions);
        
        // Write the minified file
        await fs.writeFile(outputPath, minifiedHTML);
        
        // Calculate size reduction
        const originalSize = Buffer.from(sourceHTML).length;
        const minifiedSize = Buffer.from(minifiedHTML).length;
        const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
        
        console.log('✅ Minification complete!');
        console.log(`📊 Size reduction: ${reduction}%`);
        console.log(`   Original: ${(originalSize / 1024).toFixed(2)}KB`);
        console.log(`   Minified: ${(minifiedSize / 1024).toFixed(2)}KB`);
        
    } catch (error) {
        console.error('❌ Error during minification:', error);
    }
}

// Check if watch mode is enabled
const isWatchMode = process.argv.includes('--watch');

if (isWatchMode) {
    console.log('👀 Watch mode enabled. Monitoring for changes...');
    
    // Watch for changes in the source file
    chokidar.watch(sourcePath).on('change', async () => {
        console.log('🔄 File change detected. Minifying...');
        await minifyHTML();
    });
} else {
    // Single run
    minifyHTML();
} 