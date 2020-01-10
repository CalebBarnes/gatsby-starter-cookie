import gql from "graphql-tag"

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
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

export const COMMENT_FIELDS = gql`
  fragment CommentFields on Comment {
    commentId
    date
    dateGmt
    id
    karma
    content
    approved
    author {
      __typename
      ... on CommentAuthor {
        name
        id
      }
    }
  }
`
