import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
    plugins: [
        cssInjectedByJsPlugin(),
    ],
    build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'Sankey',
          fileName: 'sankey',
        },
        rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'], // React и JSX Runtime как внешние
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime', // Глобальная переменная для JSX Runtime
        },
      },
      },
    }
})