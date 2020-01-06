import gql from "graphql-tag"

const USERS_QUERY = gql`
  query {
    users {
      edges {
        node {
          {
            avatar {
              url
            }
            id
            userId
            username
            nickname
            firstName
            lastName
            email
          }
        }
      } 
    }
  }
`
export default USERS_QUERY
