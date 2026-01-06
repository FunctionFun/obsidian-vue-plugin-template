import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/vue-app/main.ts',
      name: 'VueObsidianComponent',
      formats: ['iife'],
      fileName: (format) => `vue-app.${format}.js`,
    },
    rollupOptions: {
      output: {
        assetFileNames: 'styles.css',
      },
    },
    outDir: 'dist/vue',
    emptyOutDir: true,
    sourcemap: mode === 'development',
    watch: mode === 'development' ? {} : undefined,
  },
}));