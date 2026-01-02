import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    rollupOptions:{
      output:{
        manualChunks:{
          mui: ['@mui/material','@emotion/react', '@emotion/styled','@fontsource/roboto'],
          react: ['react','react-dom','react-router'],
          opensheetmusicdisplay:['opensheetmusicdisplay'],
        }
      }
    }
  },
  server:{
    proxy:{
      '/api': 'http://localhost:5281'
    }
  }
})
