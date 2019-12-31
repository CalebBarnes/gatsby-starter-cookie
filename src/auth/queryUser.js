import gql from "graphql-tag"

export const queryUser = gql`
  query UserQuery {
    viewer {
      email
      firstName
      lastName
      username
      avatar {
        url
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
`
