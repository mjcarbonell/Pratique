import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/

export default defineConfig({
  server: {
    mimeTypes: {
      '.js': 'application/javascript'
    },
  },
  plugins: [react()],
  build: {
    outDir: 'dist', // ensure the output directory is 'dist'
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
})