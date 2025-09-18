import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Configure Vite to serve static files from the root public directory
  publicDir: path.resolve(__dirname, "../public"),
  build: {
    // Don't copy public directory contents during build
    copyPublicDir: false,
  },
})
