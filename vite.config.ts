/// <reference types="vitest" />
import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import checker from 'vite-plugin-checker'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: './',
    plugins: [
      react(),
      checker({
        typescript: true
      }),
      svgr({
        svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
        include: "**/*.svg",
      })
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      mockReset: true,
      logHeapUsage: true,
      reporters: [
        'default'
      ],
      setupFiles: [
        resolve(__dirname, 'src/setupTests.jsx')
      ],
      coverage: {
        exclude: [
          ...configDefaults.exclude,
          'build', 'mock-server', 'src/__mocks__', '.eslintrc.cjs', 'src/strings']
      }
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:3456'
        }
      }
    },
    build: {
      outDir: 'build'
    }
  }
})
