import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    VitePWA({
  registerType: 'autoUpdate',

  manifest: {
    name: 'Apex BioHome',
    short_name: 'Apex',
    description: 'Monitoramento ambiental inteligente',
    theme_color: '#000000',
    background_color: '#000000',
    display: 'standalone',
    orientation: 'portrait',

    icons: [
      {
        src: '/logo192.png',
        sizes: '192x192',
        type: 'image/png',
      },

      {
        src: '/logo512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
}),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  server: {
    host: true,
  },
})
