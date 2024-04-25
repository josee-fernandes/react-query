import { QueryClientProvider, useQuery } from '@tanstack/react-query'
import request from 'graphql-request'

import { graphql } from './gql'
import { client } from './lib/react-query'

const q = graphql(`
  query getUsers {
    users: retrieveUsers {
      email
      name
    }
  }
`)

const Page = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => request(import.meta.env.VITE_API_BASE_URL, q),
  })

  if (error) return <h1>Request error: {error.message}</h1>

  return (
    <div>
      {isLoading ? 'Loading ... ' : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

export const App = () => {
  return (
    <QueryClientProvider client={client}>
      <Page />
    </QueryClientProvider>
  )
}
