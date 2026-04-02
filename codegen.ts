import type { CodegenConfig } from '@graphql-codegen/cli';

const schemaUrl = process.env.VITE_GRAPHQL_SCHEMA_URL ?? 'http://localhost:8080/graphql';

const config: CodegenConfig = {
  schema: schemaUrl,
  documents: ['src/shared/api/graphql/**/*.graphql'],
  generates: {
    'src/shared/api/__generated__/': {
      preset: 'client',
      plugins: [],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
