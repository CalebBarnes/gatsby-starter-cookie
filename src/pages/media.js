import React, { useState } from "react"
import styled from "styled-components"
import { useLazyQuery, useMutation } from "@apollo/react-hooks"
import { BounceLoader } from "react-spinners"
// import moment from "moment"

import SEO from "../components/seo"
import Button from "../components/button"
import Input from "../components/styles/input"
import MEDIA_ITEMS_QUERY from "../apollo/query/MEDIA_ITEMS_QUERY"
import MediaItemThumb from "../components/templateParts/mediaItemThumb"

// import { DELETE_POST_MUTATION } from "../apollo/mutation"
import Card from "../components/card"

import { useStore } from "../store"

const IndexPage = () => {
  const [
    {
      userState: { isLoggedIn },
    },
  ] = useStore()

  const [
    executeQuery,
    { data, error, loading, called, fetchMore },
  ] = useLazyQuery(MEDIA_ITEMS_QUERY, {
    variables: {
      first: 100,
    },
    onError(err) {
      console.log({ err })
    },
  })

  console.log({ data, error, loading, called })

  !called && executeQuery()

  const [search, setSearch] = useState("")

  const onSearch = () => {
    executeQuery({
      variables: { search, first: 100 },
    })
  }

  const onKeyPress = e => {
    if (e.key === "Enter") {
      onSearch()
    }
  }

  const onChange = e => {
    if (!e.target.value) {
      executeQuery({ shouldResubscribe: true })
    }
    setSearch(e.target.value)

    // executeQuery({ variables: { search }, shouldResubscribe: true })
  }

  return (
    <div>
      <SEO title="Home" />
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <SearchBar
          type="text"
          placeholder="Search"
          value={search}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />

        {isLoggedIn && (
          <Button variant="action" to="/create-post">
            New Post
          </Button>
        )}
      </div>
      <Container>
        {error?.graphQLErrors && (
          <Errors>
            {error.graphQLErrors.map(({ message }, index) => (
              <p key={index}>{message}</p>
            ))}
          </Errors>
        )}

        {loading && !data && (
          <Loader>
            <BounceLoader color="rgba(255,255,255,0.1)" />
          </Loader>
        )}

        {data?.mediaItems?.edges &&
          data.mediaItems.edges.map(({ node }) => {
            return <MediaItemThumb key={node.id} {...node} />
          })}

        {/* {posts?.edges && posts.edges.length
          ? posts.edges.map(({ node: { featuredImage, ...rest } }, index) => {
              return (
                <Post
                  posts={posts.edges}
                  key={index}
                  index={index}
                  image={featuredImage?.node}
                  {...rest}
                  onDelete={deletePostById}
                />
              )
            })
          : !loading && !error && <p>No results</p>} */}

        <Post
          style={{ height: 0, margin: 0 }}
          noPlaceholder
          canBeDeleted={false}
        />
        <Post
          style={{ height: 0, margin: 0 }}
          noPlaceholder
          canBeDeleted={false}
        />
      </Container>
      {/* {posts?.pageInfo?.endCursor && (
        <Button
          variant="outline"
          loading={loading}
        //   onClick={loadMore}
          disabled={!posts?.pageInfo?.endCursor}
        >
          Load more
        </Button>
      )} */}
    </div>
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
    width: calc(100% / 2 - 10px);
  }
  @media (min-width: 980px) {
    width: calc(100% / 3 - 15px);
  }
`

const Loader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px;
  padding-top: 120px;
`

const SearchBar = styled(Input)`
  width: 100%;
  max-width: 700px;
  margin-bottom: 30px;
`

const Errors = styled.div`
  > p {
    color: red;
  }
`
