import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    define: {
      'process.env.VITE_OPENAI_KEY': JSON.stringify(env.VITE_OPENAI_KEY),
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
    server: {
      mimeTypes: {
        '.js': 'application/javascript'
      }
    }
  };
});
