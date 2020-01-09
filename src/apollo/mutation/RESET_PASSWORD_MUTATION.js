import gql from "graphql-tag"

import { USER_FRAGMENT } from "../fragments"

export const RESET_PASSWORD_MUTATION = gql`
  ${USER_FRAGMENT}
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
        ...userFragment
      }
    }
  }
`

export default RESET_PASSWORD_MUTATION
