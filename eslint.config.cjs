// eslint.config.cjs
const js = require('@eslint/js');
const prettier = require('eslint-config-prettier');
const globals = require('globals');
const security = require('eslint-plugin-security');

module.exports = [

  {
    ignores: [
      'dist/**',
      'node_modules/**',
    ],
  },

  js.configs.recommended,

  prettier,

  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      security,
    },
    rules: {
      ...security.configs.recommended.rules,
    },
  },
];
