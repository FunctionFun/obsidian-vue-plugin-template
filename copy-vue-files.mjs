import { copyFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
      console.log(`Copied: ${file}`);
    }
    
    console.log('Vue files copied successfully to dist/');
  } catch (error) {
    console.error('Error copying Vue files:', error);
  }
}

copyVueFiles();