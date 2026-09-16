import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Project site on GitHub Pages is served from /bricolkids-app/, not the domain root.
  // Local dev keeps serving from / so `npm run dev` URLs stay simple.
  base: command === 'build' ? '/bricolkids-app/' : '/',
  plugins: [react()],
}))
