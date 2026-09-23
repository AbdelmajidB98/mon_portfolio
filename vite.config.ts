import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { existsSync } from 'node:fs';
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: { __HAS_CV__: JSON.stringify(existsSync('public/cv/Abdelmajid-Bouchoucha-CV.pdf')) },
  build: {
    rollupOptions: {
      output: { manualChunks: { motion: ['framer-motion'], i18n: ['i18next', 'react-i18next'] } },
    },
  },
});
