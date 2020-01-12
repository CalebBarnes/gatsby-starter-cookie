import gql from "graphql-tag"

// import { USER_FRAGMENT } from "../fragments"

export const VIEWER_QUERY = gql`
  query ViewerQuery {
    viewer {
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
  }
`

export default VIEWER_QUERY
