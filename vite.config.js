import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 8080
  },

  plugins: [
    react(),
    tailwindcss()
  ],

  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          axios: ['axios'],
          firebase: ['firebase'],
          icons: ['remixicon']
        }
      }
    }
  }
})