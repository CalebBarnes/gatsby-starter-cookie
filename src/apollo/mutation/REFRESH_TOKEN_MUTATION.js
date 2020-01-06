import gql from "graphql-tag"

export const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshJwtAuthToken(
      input: { jwtRefreshToken: $refreshToken, clientMutationId: "bingo" }
    ) {
      clientMutationId
      authToken
    }
  }
`
export default REFRESH_TOKEN_MUTATION
