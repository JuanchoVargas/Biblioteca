import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  base: "/",
	// base: "/ansv/pnsv/",
  server: {
		port: 3000,
	},
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
	// 202207021543: Vue3/React+Vite (Rollup) - DevExtreme fails in production -> https://t.ly/GhVsd
	build: {
		outDir: "dist",
		rollupOptions: {
			treeshake: false,
		},
	},
})

