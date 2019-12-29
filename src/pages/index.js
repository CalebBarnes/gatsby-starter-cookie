import React from "react"
import styled from "styled-components"
import { useQuery } from "urql"
import Parser from "html-react-parser"
import gql from "graphql-tag"

import SEO from "../components/seo"

const IndexPage = () => {
  const testQuery = gql`
    query {
      users {
        nodes {
          userId
          username
          nickname
          firstName
          lastName
          email
        }
      }
      posts {
        nodes {
          author {
            firstName
            lastName
          }
          title
          date
          content
        }
      }
    }
  `

  const [{ fetching, stale, data, error }, executeQuery] = useQuery({
    query: testQuery,
  })

  console.log({ fetching, stale, data, error })

  return (
    <Container>
      <SEO title="Home" />

      {fetching && <p>Loading...</p>}
      {data?.posts && <h3>Posts:</h3>}
      {data &&
        data.posts &&
        data.posts.nodes.map((post, index) => (
          <div key={index}>
            <h1>{post.title}</h1>
            {Parser(post.content)}
            <p>{post.date}</p>
            <p>
              Posted by: {post?.author?.firstName} {post?.author?.lastName}
            </p>
          </div>
        ))}

      {data?.users && <h3>Users:</h3>}
      {data &&
        data.users &&
        data.users.nodes.map((user, index) => (
          <div key={index}>
            <p>
              {user.userId}: {user.firstName} {user.lastName}
            </p>
            <p>{user.nickname}</p>
            <p>{user.email}</p>
            <p>{user.email}</p>
          </div>
        ))}

      <button
        onClick={() => executeQuery({ requestPolicy: "cache-and-network" })}
      >
        Query with urql
      </button>
    </Container>
  )
}

export default IndexPage

const Container = styled.div``
