import globals from 'globals'
import pluginJs from "@eslint/js";
import tsEslint from "typescript-eslint";
import pluginReact  from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";

export default [
    pluginJs.configs.recommended,
    ...tsEslint.configs.recommended,
    {
        files: ["src/**/*.{ts,tsx}"],
        ignores: ['dist', 'node_modules', 'src/test/*', "**/*.config.js", "tsconfig.json"],
        languageOptions: {
            parser: tsEslint.parser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: {
                  jsx: true,
                },
              },
        },
        plugins: {
            react: pluginReact,
            prettier: pluginPrettier,
        },
        settings: {
            react: {
                version: "detect",
            }
        },
        rules: {
            ...pluginReact.configs.recommended.rules,
            'semi': ['error', 'never'],
            "prefer-const": "error",
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-explicit-any': 'error',
            'quotes': ['error', 'single'],
            'linebreak-style': ['error', 'unix'],
            'max-len': ['error', { code: 100, ignoreUrls: true }],
            'indent': ['error', 4, { SwitchCase: 1 }],
            'no-warning-comments': ['warn', { terms: ['todo', 'fixme'], location: 'start' }],
            "no-multi-spaces": ["error", {
                "exceptions": { "Property": true, "ImportAttribute": true }
            }],
            "key-spacing": ["error", { "beforeColon": false, "afterColon": true }]
        }
    },
]