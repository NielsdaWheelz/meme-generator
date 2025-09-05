import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://swapi.dev',
        changeOrigin: true,
        secure: false, // Ignore SSL certificate errors for development
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
