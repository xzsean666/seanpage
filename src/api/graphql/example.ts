import GraphQLClient from './GraphQLClient'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { gql } from '@apollo/client'

interface GreetingData {
  greeting: string
}

// 1. Define your GraphQL endpoint
const GRAPHQL_URI = 'http://localhost:4000/graphql' // TODO: Replace with your actual GraphQL endpoint

// 2. Create Apollo Links for interceptor-like behavior

// Auth Link: Adds an Authorization header to every request
const authLink = setContext((_, { headers }) => {
  // In a real application, you might fetch a token from localStorage or a Pinia store
  const authToken = localStorage.getItem('authToken')
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : '',
    },
  }
})

// Error Link: Handles GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) {
    console.error(`[Network error]: ${networkError.message}`)
  }
})

// 3. Create an instance of GraphQLClient with the defined links
const graphqlApi = new GraphQLClient({
  uri: GRAPHQL_URI,
  links: [authLink, errorLink],
})

// 4. Example GraphQL Query
const GET_GREETING_QUERY = gql`
  query GetGreeting {
    greeting
  }
`

async function runGraphQLQueries() {
  try {
    console.log('Attempting to fetch greeting...')
    const result = await graphqlApi.query<GreetingData>(GET_GREETING_QUERY)

    if (result.errors) {
      console.error('GraphQL Errors in Result:', result.errors)
      // You can choose to throw an error here or handle it gracefully
      // throw new Error('Query completed with GraphQL errors.');
    }

    if (result.data) {
      console.log('Greeting from GraphQL API:', result.data.greeting)
    } else {
      console.log('No data returned for greeting query.')
    }
  } catch (error) {
    console.error('Error fetching greeting:', error)
  }
}

// 5. Export the API instance and the example function (optional)
export { graphqlApi, runGraphQLQueries }
