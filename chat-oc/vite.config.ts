import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    setupFiles: './src/setupTests.tsx',
    environment: 'jsdom'
  }
});
