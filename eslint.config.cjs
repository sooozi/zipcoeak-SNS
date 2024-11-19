const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const prettierPlugin = require('eslint-plugin-prettier');
const typescriptParser = require('@typescript-eslint/parser'); // 올바른 파서 가져오기

/** @type {import('eslint').Linter.Config} */
module.exports = [
    {
        files: ['*.js', '*.ts', '*.tsx'],
        languageOptions: {
            parser: typescriptParser, // flat config 형식에 맞게 수정
            parserOptions: {
                ecmaVersion: 2020, // 최신 ECMAScript 버전
                sourceType: 'module', // 모듈 시스템 사용
                ecmaFeatures: {
                    jsx: true, // JSX 문법을 파싱하도록 설정
                },
            },
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            react: reactPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            'react/react-in-jsx-scope': 'off', // React 18에서는 자동으로 jsx가 포함됨
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
            'react/prop-types': 'off', // TypeScript 사용 시 PropTypes는 불필요
            'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
            'prettier/prettier': 'error', // Prettier 규칙
        },
        settings: {
            react: {
                version: '18',
            },
        },
    },
];
