import gql from "graphql-tag"

import { USER_FRAGMENT } from "../fragments"

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetUserPassword(
    $key: String!
    $username: String!
    $password: String!
  ) {
    resetUserPassword(
      input: {
        key: $key
        login: $username
        password: $password
        clientMutationId: "changePasswordMutationId"
      }
    ) {
      clientMutationId
      user {
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
  }
`

export default RESET_PASSWORD_MUTATION
