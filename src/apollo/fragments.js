import gql from "graphql-tag"

export const USER_FRAGMENT = gql`
  fragment userFragment on User {
    id
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
`
