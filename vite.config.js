import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import { register } from 'module'

// https://vite.dev/config/
export default defineConfig({
  plugin: [react(), VitePWA({
    registerType : 'autoUpdate'
  }) ],
  
})
