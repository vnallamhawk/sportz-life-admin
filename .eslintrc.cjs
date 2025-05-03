// .eslintrc.cjs
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    // Basic JavaScript/TypeScript rules
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }
    ],
    
    // React specific rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': ['error', { allow: ['warn', 'error'] }],

  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // TypeScript specific rules
        '@typescript-eslint/explicit-module-boundary-types': 'off'
      }
    }
  ]
};