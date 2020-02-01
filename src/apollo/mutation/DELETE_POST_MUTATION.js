import gql from "graphql-tag"

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($id: ID!) {
    deletePost(input: { clientMutationId: "deletePostMutationId", id: $id }) {
      deletedId
      post {
        title
      }
    }
  }
`
export default DELETE_POST_MUTATION
