import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    fastRefresh: false,
  }),
  VitePWA({
    manifest: '/manifest.json',
    inject: {
      manifest: true,
    },
  }),
  ],
  optimizeDeps: {
    include: ['@maptiler/sdk']
  }
})
