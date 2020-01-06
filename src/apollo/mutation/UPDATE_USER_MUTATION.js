import gql from "graphql-tag"

const UPDATE_USER_MUTATION = gql`
  mutation(
    $id: ID!,
    $password: String, 
    nickname: String, 
    nicename: String, 
    firstName: String, 
    lastName: String
    ) {
    updateUser(
      input: {
        id: $id,
        clientMutationId: "uniqueId",
        password: $password,
        nickname: $nickname,
        nicename: $nicename,
        firstName: $firstName,
        lastName: $lastname,
        locale: $locale,
        email: $email,
        displayName: $displayName,
        description: $description
      }
    ) {
      user {
        username
      }
    }
  }
`
