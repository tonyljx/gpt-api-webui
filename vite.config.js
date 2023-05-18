import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // 将所有以 /api 开头的请求代理到 http://localhost:3000/api
      '/api': {
        target: 'http://localhost:5000',
        ws: true,  // 开启WebSocket代理
        changeOrigin: true,
      },
      '/info': {
        target: 'http://localhost:6000',
        ws: true,
        changeOrigin: true,
      },
      '/upload':{
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
    cors: true,
  }
})
