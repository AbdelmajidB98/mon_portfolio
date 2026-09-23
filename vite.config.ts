import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';

const cvPath = resolve('public/cv/Abdelmajid-Bouchoucha-CV.pdf');

function serveLocalCv(request: IncomingMessage, response: ServerResponse, next: () => void) {
  const url = new URL(request.url ?? '/', 'http://localhost');
  if (url.pathname !== '/api/cv') return next();

  const action = url.searchParams.get('action');
  if (action !== 'view' && action !== 'download') {
    response.writeHead(404).end();
    return;
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  if (!existsSync(cvPath)) {
    response.writeHead(404).end();
    return;
  }

  const pdf = readFileSync(cvPath);
  response.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `${action === 'view' ? 'inline' : 'attachment'}; filename="CV_AbdelmajidBouchoucha.pdf"`,
    'Content-Length': pdf.byteLength,
    'Cache-Control': 'private, no-store',
  });
  response.end(request.method === 'HEAD' ? undefined : pdf);
}

const localCv: Plugin = {
  name: 'local-cv-preview',
  configureServer(server) {
    server.middlewares.use(serveLocalCv);
  },
  configurePreviewServer(server) {
    server.middlewares.use(serveLocalCv);
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), localCv],
  define: { __HAS_CV__: JSON.stringify(existsSync(cvPath)) },
  build: {
    rollupOptions: {
      output: { manualChunks: { motion: ['framer-motion'], i18n: ['i18next', 'react-i18next'] } },
    },
  },
});
