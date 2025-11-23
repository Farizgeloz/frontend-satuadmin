import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  //base: '/frontend-satuadmin/', // <- penting untuk GitHub Pages
  server: {
    port: 3003,      // bisa ganti port permanen
    strictPort: true // error kalau port dipakai, bukan pindah otomatis
  }
})
