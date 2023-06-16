module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  root: true,
  ignorePatterns: ['**/_package/**', '**.js', '**.config**'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-extra-boolean-cast': 'off'
  }
};
