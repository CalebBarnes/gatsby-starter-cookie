import React from "react"
import { Provider, createClient } from "urql"

const client = createClient({
  url: "https://calebbarnes-4dbaeb.easywp.com/graphql",
})

export default props => <Provider value={client} {...props} />
