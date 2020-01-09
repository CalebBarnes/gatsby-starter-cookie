import gql from "graphql-tag"

export const SEND_PASSWORD_RESET_EMAIL_MUTATION = gql`
  mutation SendPasswordResetEmail($username: String!) {
    sendPasswordResetEmail(
      input: {
        username: $username
        clientMutationId: "sendPasswordResetEmailId"
      }
    ) {
      user {
        username
        email
      }
    }
  }
`

export default SEND_PASSWORD_RESET_EMAIL_MUTATION
