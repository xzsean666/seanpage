import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 新增导入

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: './postcss.config.cjs',
  },
  build: {
    cssMinify: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 Vue 相关代码单独打包
          'vue-vendor': ['vue'],
          // 如果将来添加路由
          // 'router': ['vue-router'],
          // 如果将来添加状态管理
          // 'store': ['pinia'],
        },
      },
    },
  },
})
