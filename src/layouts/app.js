// import "isomorphic-fetch"
import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"

import GlobalStyle from "../theme/globalStyle"
import { StoreProvider } from "../store"
import Layout from "./layout"

import { client } from "../apollo"

export default ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <GlobalStyle />
        <Layout>{children}</Layout>
      </StoreProvider>
    </ApolloProvider>
  )
}
