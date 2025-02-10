import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'    
import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react"
import path from "path";
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url))

import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
    plugins: [
        cssInjectedByJsPlugin(),
        dts({
            outDir: 'dist/types',
            insertTypesEntry: true,
            staticImport: true,
        }),
        react(),
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
    },
    resolve: {
        alias: [
            { find: "utils", replacement: path.resolve(__dirname, "src/utils") },
            { find: "hooks", replacement: path.resolve(__dirname, "src/hooks") }
        ]
    }
})