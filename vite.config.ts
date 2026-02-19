import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/wp': {
        target: 'http://wordpress-oswkcckcokc4o40ss8ssco8g.16.16.27.94.sslip.io/wp-json/wp/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/wp/, ''),
      },
    },
  },
})
