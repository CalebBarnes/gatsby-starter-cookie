import gql from "graphql-tag"

// import { USER_FRAGMENT } from "../fragments"
// import { COMMENT_FIELDS } from "../fragments"

const MEDIA_ITEMS_QUERY = gql`
  query MediaItemsQuery(
    $search: String
    $author: Int
    $hasPassword: Boolean
    $password: String
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    mediaItems(
      first: $first
      last: $last
      before: $before
      after: $after
      where: {
        search: $search
        author: $author
        hasPassword: $hasPassword
        password: $password
      }
    ) {
      edges {
        cursor
        node {
          id
          title
          altText
          mediaItemUrl
          sourceUrl
          date
          dateGmt
          author {
            node {
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
          commentCount
        }
      }
    }
  }
`

export default MEDIA_ITEMS_QUERY
