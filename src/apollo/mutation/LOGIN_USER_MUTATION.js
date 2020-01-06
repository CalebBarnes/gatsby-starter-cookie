import gql from "graphql-tag"

export const LOGIN_USER_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(
      input: {
        username: $username
        password: $password
        clientMutationId: "bingo"
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
          isRestricted
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
