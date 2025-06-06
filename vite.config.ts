import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@icons': path.resolve(__dirname, 'src/assets/icons'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/variables" as *;\n\n`
      }
    }
  }
});