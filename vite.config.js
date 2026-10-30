import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Let Vite serve compressed 3D assets as static files.
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.ktx2', '**/*.hdr'],
})
