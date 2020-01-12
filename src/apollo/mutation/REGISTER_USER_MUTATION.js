import gql from "graphql-tag"

import { USER_FRAGMENT } from "../fragments"

const REGISTER_USER_MUTATION = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String
    $lastName: String
  ) {
    registerUser(
      input: {
        clientMutationId: "registerUserMutationId"
        username: $username
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
      }
    ) {
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
export default REGISTER_USER_MUTATION
