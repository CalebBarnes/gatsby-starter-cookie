import { createClient, fetchExchange, dedupExchange, cacheExchange } from "urql"
import { getAuth } from "../auth"

export const client = createClient({
  url: "https://calebbarnes-4dbaeb.easywp.com/graphql",
  fetchOptions: () => {
    const auth = getAuth()
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: auth?.authToken ? `Bearer ${auth.authToken}` : ``,
      },
    }
  },
  exchanges: [fetchExchange, dedupExchange, cacheExchange],
})
