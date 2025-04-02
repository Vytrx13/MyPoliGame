import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173, // adjust if needed
    proxy: {
      '/games': {
        target: 'http://backend:3001',
                 changeOrigin: true,
                 secure:false,
      },
      '/auth': {
        target: 'http://backend:3001',
                 changeOrigin: true,
                 secure:false,
      },
      '/listas': {
        target: 'http://localhost:3001',
                 changeOrigin: true,
                 secure:false,
      },
      
    },
    allowedHosts: true,
    cors: true,
  },
});
