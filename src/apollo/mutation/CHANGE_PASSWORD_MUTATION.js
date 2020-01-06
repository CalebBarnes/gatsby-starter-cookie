import gql from "graphql-tag"

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword(
    $key: String!
    $username: String!
    $password: String!
  ) {
    resetUserPassword(
      input: {
        key: $key
        login: $username
        password: $password
        clientMutationId: "uniqueId"
      }
    ) {
      clientMutationId
    }
  }
`

export default CHANGE_PASSWORD_MUTATION
