import gql from "graphql-tag"

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($authorId: ID!, $title: String!, $content: String) {
    createPost(
      input: {
        status: PUBLISH
        clientMutationId: "createPostMutationId"
        authorId: $authorId
        title: $title
        content: $content
      }
    ) {
      clientMutationId
      post {
        title
        content
      }
    }
  }
`
export default CREATE_POST_MUTATION
