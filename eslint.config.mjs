import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },

  // JavaScript recommended rules
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.browser,
    }
  },

  // TypeScript recommended rules
  {
    files: ['**/*.{ts,mts,cts}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // Vue recommended rules
  ...pluginVue.configs['flat/recommended'],
  {
    rules : {
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: [
            'Footer',
            'Header',
            'Heatmap',
            'Dashboard',
            'Home',
          ],
        },
      ],
      'vue/no-reserved-component-names': [
        'error',
        {
          htmlElementCaseSensitive: true,
        },
      ],
    },
  },

  // TypeScript support inside Vue single-file components
  {
    files: ['**/*.vue'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    languageOptions: {
      parser: vueParser,
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
      }
    }
  },

  // Unused arguments prefixed with "_" are intentional (TypeScript files)
  {
    files: ['**/*.{ts,mts,cts,vue}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  // TODO: remove once the audit logging in main.js is restored or refactored.
  // The commented-out audit code leaves vm, info, to and from unused for now.
  {
    files: ['src/main.js'],
    rules: {
      'no-unused-vars': 'off',
    },
  },
);