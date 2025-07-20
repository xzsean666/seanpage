import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
  from,
} from '@apollo/client/core'
import type { ApolloQueryResult, FetchResult } from '@apollo/client/core'
import type { DocumentNode } from 'graphql'

interface GraphQLClientConfig {
  uri: string
  links?: ApolloLink[] // Add an optional array of Apollo Links
}

class GraphQLClient {
  private apolloClient: ApolloClient<any>

  constructor(config: GraphQLClientConfig) {
    const httpLink = new HttpLink({
      uri: config.uri,
    })

    // Combine provided links with the HTTP link
    let link: ApolloLink
    if (config.links && config.links.length > 0) {
      link = from([...config.links, httpLink])
    } else {
      link = httpLink
    }

    this.apolloClient = new ApolloClient({
      link: link,
      cache: new InMemoryCache(),
    })
  }

  public async query<T>(
    query: DocumentNode,
    variables?: Record<string, any>
  ): Promise<ApolloQueryResult<T>> {
    try {
      const result = await this.apolloClient.query<T>({
        query,
        variables,
      })
      return result
    } catch (error: any) {
      console.error('GraphQL Query Error:', error)
      throw new Error(
        error.message || 'An unknown GraphQL query error occurred.'
      )
    }
  }

  public async mutate<T>(
    mutation: DocumentNode,
    variables?: Record<string, any>
  ): Promise<FetchResult<T>> {
    try {
      const result = await this.apolloClient.mutate<T>({
        mutation,
        variables,
      })
      return result
    } catch (error: any) {
      console.error('GraphQL Mutation Error:', error)
      throw new Error(
        error.message || 'An unknown GraphQL mutation error occurred.'
      )
    }
  }

  // You can add a subscribe method here if you need GraphQL subscriptions
  // public async subscribe<T>(subscription: DocumentNode, variables?: Record<string, any>): Observable<FetchResult<T>> {
  //   try {
  //     const observable = this.apolloClient.subscribe<T>({
  //       query: subscription,
  //       variables,
  //     });
  //     return observable;
  //   } catch (error: any) {
  //     console.error('GraphQL Subscription Error:', error);
  //     throw new Error(error.message || 'An unknown GraphQL subscription error occurred.');
  //   }
  // }
}

export default GraphQLClient
