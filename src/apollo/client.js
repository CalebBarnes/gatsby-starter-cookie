import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { onError } from "apollo-link-error"
import { withClientState } from "apollo-link-state"
import { ApolloLink, from } from "apollo-link"
import { setContext } from "apollo-link-context"
import { RetryLink } from "apollo-link-retry"

// import fetch from "unfetch"

import { getAuth } from "../auth"
import { uri, defaults, resolvers } from "./apollo-config"

const cache = new InMemoryCache()

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    // operation = the operation that errored
    // forward = the next link the in chain
    if (networkError) {
      switch (networkError.statusCode) {
        case 403:
          console.log("refresh the token and try again")
        // call refresh token function
        // call the operation again

        // await executeRefreshToken -> then call forward(operation)

        // return async () => {
        //   await executeRefreshToken()
        //   forward(operation)
        // }
      }
    }

    // if (graphQLErrors) {
    //   graphQLErrors.map(({ message, locations, path }) =>
    //     console.log(`[GraphQL error]:`, { message, locations, path })
    //   )
    //   // console.log("graphQLErrors", graphQLErrors)
    // }
    // if (networkError) {
    //   console.log({ networkError })
    //   //   logoutUser();

    // }
  }
)

const retryLink = new RetryLink({
  delay: {
    initial: 800,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => !!error,
  },
})

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
  // fetch,
})

const client = new ApolloClient({
  link: from([
    errorLink,
    retryLink,
    withClientState({
      defaults,
      resolvers,
      cache,
    }),
    authLink.concat(httpLink),
  ]),
  cache,
})

export default client
