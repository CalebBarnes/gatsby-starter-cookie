import gql from "graphql-tag"

import { USER_FRAGMENT } from "../fragments"

const REGISTER_USER_MUTATION = gql`
  ${USER_FRAGMENT}
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
        ...UserFragment
      }
    }
  }
`
export default REGISTER_USER_MUTATION
