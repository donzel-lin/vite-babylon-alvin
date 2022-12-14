module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue']
  },
  plugins: [
    'vue'
  ],
  rules: {
    semi: [2, 'never'],
    '@typescript-eslint/triple-slash-reference': [0, 'always'],
    'vue/multi-word-component-names': [0, 'always'],
    'no-unused-vars': 'off',
    'no-debugger': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    "@typescript-eslint/explicit-function-return-type":  [0, 'always'],
    "@typescript-eslint/promise-function-async": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/restrict-plus-operands": "off"
  }
}
