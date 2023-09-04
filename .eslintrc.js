/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      plugins: ['prettier', '@typescript-eslint/eslint-plugin'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'prettier',
      ],
      env: {
        node: true,
      },
      rules: {
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
        'require-await': 'error',
        'prettier/prettier': 'warn',
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'no-nested-ternary': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
    {
      files: ['*.graphql'],
      /** @type {import("@graphql-eslint/eslint-plugin").ParserOptions} */
      parserOptions: {
        schema: './schema.graphql',
      },
      extends: ['plugin:@graphql-eslint/operations-recommended'],
      rules: {
        'prettier/prettier': 'warn',
      },
    },
  ],
};

if (process.env.DISABLE_ESLINT) {
  config.ignorePatterns = ['**/*.ts', '**/*.tsx'];
}

module.exports = config;
