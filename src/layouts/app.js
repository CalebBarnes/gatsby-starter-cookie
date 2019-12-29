import React from "react"

import GlobalStyle from "../theme/globalStyle"
import { StateProvider } from "../state/store"
import Layout from "./layout"

export default ({ children }) => (
  <StateProvider>
    <GlobalStyle />
    <Layout>{children}</Layout>
  </StateProvider>
)
