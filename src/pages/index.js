import React from "react"
import styled from "styled-components"
import { useQuery } from "urql"
import Parser from "html-react-parser"
import gql from "graphql-tag"

import SEO from "../components/seo"

import Button from "../components/button"

const IndexPage = () => {
  const postsQuery = gql`
    query {
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
    query: postsQuery,
  })

  console.log({ fetching })

  return (
    <Container>
      <SEO title="Home" />

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

      <Button
        loading={fetching}
        variant="action"
        onClick={() => executeQuery({ requestPolicy: "network-only" })}
      >
        Query fresh data
      </Button>
    </Container>
  )
}

export default IndexPage

const Container = styled.div``
