import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', '@tabler/icons-react', 'framer-motion'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
