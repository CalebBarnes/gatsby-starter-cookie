import gql from "graphql-tag"

const REGISTER_USER_MUTATION = gql`
  mutation registerUser(
    $username: String!
    $password: String!
    $email: String!
    $firstName: String
    $lastName: String
  ) {
    registerUser(
      input: {
        clientMutationId: "uniqueId"
        firstName: $firstName
        lastName: $lastName
        email: $email
        username: $username
        password: $password
      }
    ) {
      clientMutationId
      user {
        email
        username
      }
    }
  }
`
export default REGISTER_USER_MUTATION
