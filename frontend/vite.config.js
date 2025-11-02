import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
      open: true, // Auto-open browser
      cors: true // Enable CORS
    },
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_URL || 'http://127.0.0.1:8000')
    }
  }
})
