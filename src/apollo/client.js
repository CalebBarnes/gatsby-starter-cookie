import ApolloClient from "apollo-boost"

import { getAuth } from "../auth"

export const client = new ApolloClient({
  uri: "https://calebbarnes-4dbaeb.easywp.com/graphql",
  request: operation => {
    const { authToken } = getAuth()
    operation.setContext({
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : "",
      },
    })
  },
})

export default client
