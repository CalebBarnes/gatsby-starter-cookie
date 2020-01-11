import React from "react"
import styled from "styled-components"
import { useStore } from "../store"

import moment from "moment"

import Parser from "html-react-parser"

import { useLazyQuery } from "@apollo/react-hooks"

import { POSTS_QUERY } from "../apollo/query"

export default props => {
  const [
    {
      userState: { isLoggedIn, user },
    },
    dispatch,
  ] = useStore()

  console.log(user)

  const [executePostsQuery, { data, error, loading, called }] = useLazyQuery(
    POSTS_QUERY
  )

  console.log(data)

  isLoggedIn &&
    user &&
    !called &&
    executePostsQuery({ variables: { author: user?.userId } })

  return (
    <Container>
      <h1>Account</h1>
      {user && (
        <div>
          <img src={user?.avatar?.url} />
          <h5>{user?.email}</h5>
          <h5>{user?.username}</h5>
        </div>
      )}
      {loading && <p>loading posts</p>}

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

const Container = styled.div``