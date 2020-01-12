import React from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/react-hooks"
import { BounceLoader } from "react-spinners"
// import moment from "moment"

import SEO from "../components/seo"
// import Button from "../components/button"
import { POSTS_QUERY } from "../apollo/query"

import Card from "../components/card"

const IndexPage = () => {
  const { data, error, loading, called } = useQuery(POSTS_QUERY)
  const { posts } = data || {}

  return (
    <Container>
      <SEO title="Home" />
      {error && <p style={{ color: "red" }}>Something went wrong.</p>}
      {loading && !data && <BounceLoader color="rgba(255,255,255,0.1)" />}
      {posts?.nodes &&
        posts.nodes.map(({ featuredImage, ...rest }, index) => {
          return <Post key={index} image={featuredImage?.uri} {...rest} />
        })}
    </Container>
  )
}

export default IndexPage

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Post = styled(Card)`
  width: calc(100%);

  @media (min-width: 680px) {
    width: calc(100% / 2 - 15px);
  }

  @media (min-width: 980px) {
    width: calc(100% / 3 - 15px);
  }
`
