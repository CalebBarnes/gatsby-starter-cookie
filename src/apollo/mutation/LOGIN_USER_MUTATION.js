import gql from "graphql-tag"

import { USER_FRAGMENT } from "../fragments"

export const LOGIN_USER_MUTATION = gql`
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
        id
        email
        firstName
        lastName
        username
        avatar {
          url
        }
        capKey
        capabilities
        description
        isJwtAuthSecretRevoked
        jwtAuthExpiration
        locale
        slug
        userId
      }
    }
  }
`
export default LOGIN_USER_MUTATION
