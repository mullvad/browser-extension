import vuePlugin from 'eslint-plugin-vue';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import unusedImports from 'eslint-plugin-unused-imports';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import prettier from 'eslint-config-prettier';

import globals from 'globals';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  prettier,
  ...vueTsEslintConfig(),

  {
    plugins: {
      '@typescript-eslint': tsPlugin,
      vue: vuePlugin,
      'unused-imports': unusedImports,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        'vue/setup-compiler-macros': 'readonly',
      },

      ecmaVersion: 2021,
      sourceType: 'module',
    },

    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      ...vuePlugin.configs['vue3-recommended'].rules,
      quotes: ['error', 'single', { allowTemplateLiterals: true }],

      semi: ['error', 'always'],
      'unused-imports/no-unused-imports': 'error',
      'vue/attribute-hyphenation': 'off',
      'vue/html-self-closing': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/script-setup-uses-vars': 'error',

      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'ignore',
          multiline: 'ignore',
        },
      ],
    },
  },
  {
    ignores: ['**/dist', '**/node_modules'],
  },
];
