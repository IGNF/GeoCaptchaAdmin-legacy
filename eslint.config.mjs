import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

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
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
      }
    }
  }
);
