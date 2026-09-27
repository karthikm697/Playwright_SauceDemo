// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier, // turn off ESLint rules that would fight with Prettier
  {
    ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**'],
  },
);
