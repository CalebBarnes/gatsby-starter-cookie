import gql from "graphql-tag"

export const LOGIN_USER = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(
      input: {
        username: $username
        password: $password
        clientMutationId: "KgsyASs"
      }
    ) {
      clientMutationId
      authToken
      refreshToken
      user {
        id
        email
        firstName
        lastName
        username
        avatar {
          url
          isRestricted
        }
        capKey
        capabilities
        description
        isJwtAuthSecretRevoked
        jwtAuthExpiration
        locale
        slug
        userId
      }
    }
  }
`

export const REFRESH_TOKEN = gql`
  mutation refreshToken($jwtRefreshToken: String!, $clientMutationId: String!) {
    refreshJwtAuthToken(
      input: {
        jwtRefreshToken: $jwtRefreshToken
        clientMutationId: $clientMutationId
      }
    ) {
      authToken
      clientMutationId
    }
  }
`
