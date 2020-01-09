import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
// import { onError } from "apollo-link-error"
import { withClientState } from "apollo-link-state"
import { ApolloLink } from "apollo-link"
import { setContext } from "apollo-link-context"
import fetch from "unfetch"
import { getAuth } from "../auth"

const uri = "https://calebbarnes-4dbaeb.easywp.com/graphql"

const cache = new InMemoryCache()

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const { authToken } = getAuth()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : "",
    },
  }
})

const httpLink = createHttpLink({
  uri,
  fetch,
})

const client = new ApolloClient({
  link: ApolloLink.from([
    // onError(({ graphQLErrors, networkError }) => {
    //   if (graphQLErrors) {
    //     graphQLErrors.map(({ message, locations, path }) =>
    //       console.log(`[GraphQL error]:`, { message, locations, path })
    //     )
    //     // console.log("graphQLErrors", graphQLErrors)
    //   }
    //   if (networkError) {
    //     console.log({ networkError })
    //     //   logoutUser();
    //   }
    // }),
    withClientState({
      defaults: {
        isConnected: true,
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache }) => {
            cache.writeData({ data: { isConnected } })
            return null
          },
        },
      },
      cache,
    }),
    authLink.concat(httpLink),
  ]),
  cache,
})

export default client
