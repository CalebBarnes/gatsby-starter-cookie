import React from "react"
import styled from "styled-components"
import { useQuery } from "../apollo"

import Parser from "html-react-parser"
import { gql } from "apollo-boost"

import SEO from "../components/seo"

import Button from "../components/button"

const IndexPage = () => {
  const POSTS = gql`
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

  const { data, error, loading, refetch } = useQuery(POSTS)

  return (
    <Container>
      <SEO title="Home" />

      {error && <p>{error.message}</p>}

      <span style={{ display: "flex", alignItems: "flex-start" }}>
        {data?.posts && <h1 style={{ marginRight: "25px" }}>Posts</h1>}

        <Button loading={true} variant="action" onClick={() => refetch()}>
          Refresh Posts
        </Button>
      </span>

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
    </Container>
  )
}

export default IndexPage

const Container = styled.div``
