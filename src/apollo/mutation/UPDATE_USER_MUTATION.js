import gql from "graphql-tag"

import { USER_FRAGMENT } from "../fragments"

const UPDATE_USER_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation(
    $id: ID!
    $password: String
    $nickname: String
    $nicename: String
    $firstName: String
    $lastName: String
    $locale: String
    $email: String
    $displayName: String
    $description: String
  ) {
    updateUser(
      input: {
        id: $id
        clientMutationId: "updateUserMutationId"
        password: $password
        nickname: $nickname
        nicename: $nicename
        firstName: $firstName
        lastName: $lastname
        locale: $locale
        email: $email
        displayName: $displayName
        description: $description
      }
    ) {
      user {
        ...UserFragment
      }
    }
  }
`

export default UPDATE_USER_MUTATION
