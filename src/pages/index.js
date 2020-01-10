import React, { useState } from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/react-hooks"
import moment from "moment"

import Parser from "html-react-parser"

import SEO from "../components/seo"
import Button from "../components/button"
import { POSTS_QUERY } from "../apollo/query"

const IndexPage = () => {
  const { data, error, loading, refetch } = useQuery(POSTS_QUERY)

  return (
    <Container>
      <SEO title="Home" />

      {error && <p>{error.message}</p>}

      <span style={{ display: "flex", alignItems: "flex-start" }}>
        <h1 style={{ marginRight: "25px" }}>Posts</h1>

        <Button loading={loading} variant="action" onClick={() => refetch()}>
          Refresh
        </Button>
      </span>

      {data &&
        data.posts &&
        data.posts.nodes.map((post, index) => (
          <div key={index}>
            <h1>{post.title}</h1>
            {Parser(post.content)}
            <p>{moment(post.date).format("YYYY MMM Do")}</p>
            <p>
              Posted by: {post?.author?.firstName} {post?.author?.lastName}{" "}
              <img style={{ height: "30px" }} src={post?.author?.avatar?.url} />
            </p>
          </div>
        ))}
    </Container>
  )
}

export default IndexPage

const Container = styled.div``
