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
      clientMutationId: "registerUserMutationId"
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      user {
        ...userFragment
      }
    }
  }
`
export default REGISTER_USER_MUTATION
