import gql from "graphql-tag"

export const VIEWER_QUERY = gql`
  query ViewerQuery {
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
export default VIEWER_QUERY
