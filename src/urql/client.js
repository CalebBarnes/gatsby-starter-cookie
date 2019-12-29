import { createClient } from "urql"

export const client = createClient({
  url: "https://calebbarnes-4dbaeb.easywp.com/graphql",
})
