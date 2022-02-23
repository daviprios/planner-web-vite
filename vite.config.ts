import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  resolve: {
    alias: {
      '$types': path.resolve('./src/types'),
      '$data': path.resolve('./src/data'),
      '$logic': path.resolve('./src/logic'),

      '$app': path.resolve('./src/app'),
      '$provider': path.resolve('./src/app/provider'),
      '$styles': path.resolve('./src/app/styles'),
      '$lang': path.resolve('./src/app/lang'),
      '$views': path.resolve('./src/app/views'),
      '$components': path.resolve('./src/app/components'),
      '$svg': path.resolve('./src/app/assets/svgs'),
    }
  },
  assetsInclude: ['**/*.svg'],
})
