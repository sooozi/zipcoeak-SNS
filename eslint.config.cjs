const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const prettierPlugin = require('eslint-plugin-prettier');
const typescriptParser = require('@typescript-eslint/parser');

/** @type {import('eslint').Linter.Config} */
module.exports = [
    {
        files: ['*.js', '*.ts', '*.tsx'],
        ignores: ['dist/**'], // dist 폴더 제외
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            react: reactPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-inferrable-types': 'warn',
            '@typescript-eslint/ban-ts-comment': 'warn',
            '@typescript-eslint/consistent-type-definitions': [
                'error',
                'interface',
            ],
            'react/prop-types': 'off',
            'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
            'prettier/prettier': 'error',
        },
        settings: {
            react: {
                version: '18',
            },
        },
        // ignorePatterns: ['dist/**'], // dist 폴더 제외
    },
];
