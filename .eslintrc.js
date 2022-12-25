module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'sonarjs'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended'
  ],
  root: true,
  env: {
    node: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'comma-dangle': 0,
    '@typescript-eslint/explicit-member-accessibility': ['error'],
    '@typescript-eslint/no-var-requires': 'off',
    'max-len': ['error', { code: 100, ignorePattern: '^import' }],
    'require-await': 'error',
    'no-return-await': 'error',
    'arrow-parens': ['warn', 'always'],
    'eqeqeq': ['error', 'always'],
    'curly': 'error',
    'no-undef-init': 'error',
    'prefer-const': 'error',
    'no-eq-null': 'error',
    'no-console': 'error',
    'max-depth': ['error', 3],
    'no-control-regex': 0,
    '@typescript-eslint/no-floating-promises': ['error'],
    'no-continue': 'warn',
    'no-else-return': ['error',  { allowElseIf: true }],
    'no-duplicate-imports': 'error',
    'sonarjs/no-duplicate-string': ['error', 5],
    'lines-between-class-members': ['error', 'always'],
    'max-lines-per-function': ['error', { 'max': 50, 'skipBlankLines': true, 'skipComments': true }],
    'max-lines': ['warn', { 'max': 1000, 'skipBlankLines': false, 'skipComments': false }],
    '@typescript-eslint/no-explicit-any': ['error', { 'ignoreRestArgs': true }],
  }
};