// export const uri = "//localhost/wordpress/graphql"
export const uri = "https://calebbarnes-4dbaeb.easywp.com/graphql"

export const defaults = {
  isConnected: true,
}

export const resolvers = {
  Mutation: {
    updateNetworkStatus: (_, { isConnected }, { cache }) => {
      cache.writeData({ data: { isConnected } })
      return null
    },
  },
}
