import vuePlugin from 'eslint-plugin-vue';
import ts from 'typescript-eslint';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...vuePlugin.configs['flat/recommended'],
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.webextensions,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    rules: {
      'vue/attribute-hyphenation': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/attributes-order': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  { ignores: ['**/dist/'] },
];
