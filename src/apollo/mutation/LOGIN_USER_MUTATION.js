import gql from "graphql-tag"

import { USER_FRAGMENT } from "../fragments"

export const LOGIN_USER_MUTATION = gql`
  ${USER_FRAGMENT}
  mutation LoginMutation($username: String!, $password: String!) {
    login(
      input: {
        clientMutationId: "loginUserMutationId"
        username: $username
        password: $password
      }
    ) {
      clientMutationId
      authToken
      refreshToken
      user {
        ...UserFragment
      }
    }
  }
`
export default LOGIN_USER_MUTATION
