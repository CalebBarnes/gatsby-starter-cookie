import gql from "graphql-tag"

import { USER_FRAGMENT } from "../fragments"

export const LOGIN_USER_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation LoginMutation($username: String!, $password: String!) {
    login(
      input: {
        username: $username
        password: $password
        clientMutationId: "loginUserMutationId"
      }
    ) {
      clientMutationId
      authToken
      refreshToken
      user {
        ...userFragment
      }
    }
  }
`
export default LOGIN_USER_MUTATION
