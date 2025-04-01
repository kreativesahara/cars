import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dynamically set the backend URL based on the environment
const BACKEND_URL = process.env.API_URL || "http://localhost:3100";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      external: [
        'drizzle-orm/pg-core',
      ],
    },
  },
});