// import js from '@eslint/js'
import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
import tsEslint from 'typescript-eslint'

export default [
    {
        files: ["src/**/*.{ts,tsx}"],
        ignores: ['dist', 'node_modules', "**/*.config.js", "tsconfig.json"],
        plugins: {
            '@typescript-eslint': tsEslint,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
            parser: tsEslint.parser,
        },
        "rules": {
            // React Hooks Rules
            // ...reactHooks.configs.recommended.rules,
          
            // React Refresh Rules
            // 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
          
            // Общие правила
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Предупреждения для неиспользуемых переменных
    
            // 'react/jsx-uses-react': 'error',
            // 'react/jsx-uses-vars': 'error',
            // '@typescript-eslint/explicit-function-return-type': 'warn', // Напоминание о возвращаемом типе
            // '@typescript-eslint/no-explicit-any': 'error', // Запрет использования `any`
            'quotes': ['error', 'single'], // Использование одинарных кавычек
            'semi': 'off',
    
            'linebreak-style': ['error', 'unix'], // LF перенос строк
            'max-len': ['error', { code: 100, ignoreUrls: true }], // Длина строки 100 символов
            'indent': ['error', 4, { SwitchCase: 1 }], // Отступы 4 пробела
            'no-warning-comments': ['warn', { terms: ['todo', 'fixme'], location: 'start' }], // Не игнорировать TODO
            // 'jsx-a11y/anchor-has-content': 'error' // Форматирование атрибутов в JSX
        }
    },
]
//  

//     extends: [
//         js.configs.recommended,
//         ...tseslint.configs.recommended, // ✅ Это подтянет все настройки TypeScript
//         'plugin:react/recommended',
//     ],
//     files: ['**/*.{ts,tsx}'],

//     plugins: [
//         'react',
//         'react-hooks',
//         'react-refresh',
//     ],
//     rules: {
//         // React Hooks Rules
//         ...reactHooks.configs.recommended.rules,
      
//         // React Refresh Rules
//         'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      
//         // Общие правила
//         'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Предупреждения для неиспользуемых переменных

//         'react/jsx-uses-react': 'error',
//         'react/jsx-uses-vars': 'error',
//         '@typescript-eslint/explicit-function-return-type': 'warn', // Напоминание о возвращаемом типе
//         '@typescript-eslint/no-explicit-any': 'error', // Запрет использования `any`
//         'quotes': ['error', 'single'], // Использование одинарных кавычек

//         'linebreak-style': ['error', 'unix'], // LF перенос строк
//         'max-len': ['error', { code: 100, ignoreUrls: true }], // Длина строки 100 символов
//         'indent': ['error', 4, { SwitchCase: 1 }], // Отступы 4 пробела
//         'no-warning-comments': ['warn', { terms: ['todo', 'fixme'], location: 'start' }], // Не игнорировать TODO
//         'jsx-a11y/anchor-has-content': 'error' // Форматирование атрибутов в JSX
//       },
//   },
// )
