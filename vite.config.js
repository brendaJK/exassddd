import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "Bazar de Brenda",
        short_name: "Bazar",
        description: "Una tienda con todo lo que necesitas",
        start_url: '/',
        display: 'standalone',
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          // Asegúrate de tener estas imágenes dentro de la carpeta "public"
          {
            src: "/windows11/SmallTile.scale-100.png",
            sizes: "71x71",
            type: "image/png"
          },
          {
            src: "/windows11/SmallTile.scale-125.png",
            sizes: "89x89",
            type: "image/png"
          },
          {
            src: "/windows11/SmallTile.scale-150.png",
            sizes: "107x107",
            type: "image/png"
          },
          {
            src: "/windows11/SmallTile.scale-200.png",
            sizes: "142x142",
            type: "image/png"
          },
          {
            src: "/windows11/SmallTile.scale-400.png",
            sizes: "284x284",
            type: "image/png"
          },
          {
            src: "/windows11/Square150x150Logo.scale-100.png",
            sizes: "150x150",
            type: "image/png"
          },
          {
            src: "/windows11/Square150x150Logo.scale-125.png",
            sizes: "188x188",
            type: "image/png"
          },
          {
            src: "/windows11/Square150x150Logo.scale-150.png",
            sizes: "225x225",
            type: "image/png"
          },
          {
            src: "/windows11/Square150x150Logo.scale-200.png",
            sizes: "300x300",
            type: "image/png"
          },
          {
            src: "/windows11/Square150x150Logo.scale-400.png",
            sizes: "600x600",
            type: "image/png"
          },
          {
            src: "/android/android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/android/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/ios/512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/ios/1024.png",
            sizes: "1024x1024",
            type: "image/png"
          },
        ],
      }
    })
  ],
})
