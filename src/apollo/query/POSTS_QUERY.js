import gql from "graphql-tag"

import { USER_FRAGMENT } from "../fragments"
import { COMMENT_FIELDS } from "../fragments"

const POSTS_QUERY = gql`
  query PostsQuery(
    $search: String
    $author: Int
    $categoryId: Int
    $categoryIn: [ID]
    $categoryNotIn: [ID]
    $categoryName: String
    $hasPassword: Boolean
    $password: String
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    posts(
      first: $first
      last: $last
      before: $before
      after: $after
      where: {
        search: $search
        author: $author
        categoryId: $categoryId
        categoryIn: $categoryIn
        categoryName: $categoryName
        categoryNotIn: $categoryNotIn
        hasPassword: $hasPassword
        password: $password
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          title
          content
          postId
          date
          dateGmt
          featuredImage {
            node {
              sizes
              srcSet
              sourceUrl
              altText
              caption
            }
          }
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

export default POSTS_QUERY
