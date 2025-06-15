import js from '@eslint/js';
import globals from 'globals';
import unicorn from 'eslint-plugin-unicorn';
import eslintPluginImport from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      js,
      unicorn,
      import: eslintPluginImport,
    },
    ignores: ['dist', 'node_modules'],
    extends: [
      'js/recommended',
      'plugin:unicorn/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
    ],
    rules: {
      eqeqeq: 'error',
      'no-console': 'error',
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-implicit-globals': 'error',
      'no-shadow': 'error',
      'no-empty-function': 'error',
      'no-magic-numbers': ['error', { ignoreArrayIndexes: true, enforceConst: true }],
      'no-nested-ternary': 'error',
      complexity: ['error', 10],
      'max-lines-per-function': ['error', 30],
      'consistent-return': 'error',
      'dot-notation': 'error',
      'import/extensions': ['error', 'always'],
    },
  },
]);
