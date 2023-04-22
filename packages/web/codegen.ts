import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../../schema.graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    'src/graphqlTypes.ts': {
      plugins: ['typescript'],
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: 'graphqlTypes.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        avoidOptionals: { field: true },
        nonOptionalTypename: true,
      },
    },
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
