import { CodegenConfig } from '@graphql-codegen/cli'
import { loadEnv } from 'vite'

process.env = { ...process.env, ...loadEnv('development', process.cwd()) }

const config: CodegenConfig = {
  schema: process.env.VITE_API_BASE_URL,
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client',
    },
  },
}

export default config
