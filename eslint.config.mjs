import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'prettier',
    'plugin:prettier/recommended',
    'eslint:all',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended'
  ),
  {
    plugins: {
      prettier,
      prettier,
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
    },

    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'],
            ['@components', './src/components'],
            ['@utils', './src/utils'],
            ['@ui', './src/app/components/ui'],
          ],

          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      'no-console': [
        'error',
        {
          allow: ['error', 'warn'],
        },
      ],

      'line-comment-position': [
        'off',
        {
          position: 'beside',
        },
      ],

      'no-inline-comments': 'off',
      'no-debugger': 'warn',
      'no-warning-comments': 'off',
      curly: ['error', 'all'],
      'one-var': ['error', 'never'],
      'max-depth': ['error', 3],
      'max-nested-callbacks': ['error', 4],
      'sort-imports': 'off',
      'sort-keys': 'off',
      'id-length': 'off',
      'no-undef': 'off',
      'no-undefined': 'off',
      'no-ternary': 'off',
      'spaced-comment': 'off',
      'no-magic-numbers': 'off',

      'max-lines-per-function': [
        'error',
        {
          max: 120,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      'react/no-unescaped-entities': [
        'error',
        {
          forbid: ['>', '}', '"'],
        },
      ],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],

    rules: {
      'no-undef': 'off',
      'no-magic-numbers': 'off',
    },
  },
];
