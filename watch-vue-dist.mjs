import { copyFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import chokidar from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const vueDistDir = join(__dirname, 'dist', 'vue');
const distDir = join(__dirname, 'dist');

function copyVueFiles() {
  if (!existsSync(vueDistDir)) {
    console.log('Vue dist directory does not exist, skipping copy');
    return;
  }

  try {
    const files = readdirSync(vueDistDir);
    
    for (const file of files) {
      const srcPath = join(vueDistDir, file);
      const destPath = join(distDir, file);
      copyFileSync(srcPath, destPath);
    }
    
    console.log('Vue files copied successfully to dist/');
  } catch (error) {
    console.error('Error copying Vue files:', error);
  }
}

console.log('Watching dist/vue for changes...');

const watcher = chokidar.watch(vueDistDir, {
  ignoreInitial: false,
  awaitWriteFinish: {
    stabilityThreshold: 100,
    pollInterval: 50
  }
});

watcher
  .on('add', copyVueFiles)
  .on('change', copyVueFiles)
  .on('error', error => console.error(`Watcher error: ${error}`));