import React, { useState } from "react"
import styled from "styled-components"
import { useLazyQuery } from "@apollo/react-hooks"
import { BounceLoader } from "react-spinners"
// import moment from "moment"

import SEO from "../components/seo"
// import Button from "../components/button"
import Input from "../components/styles/input"
import { POSTS_QUERY } from "../apollo/query"

import Card from "../components/card"

const IndexPage = () => {
  const [executeQuery, { data, error, loading, called }] = useLazyQuery(
    POSTS_QUERY
  )

  !called && executeQuery()

  const [search, setSearch] = useState("")

  const onSearch = value => {
    // console.log("search!")
    executeQuery({
      variables: { search },
    })
  }

  const onKeyPress = e => {
    if (e.key === "Enter") {
      onSearch()
    }
  }

  const onChange = e => {
    !e && setSearch("")

    if (!e.target.value) {
      executeQuery({ shouldResubscribe: true })
    }

    setSearch(e.target.value)
    // if (e.target.value.length > 2) {
    //   // debounce(onSearch, 250, true)
    //   onSearch()
    // }
  }

  return (
    <div>
      <SEO title="Home" />
      <SearchBar
        type="text"
        placeholder="Search"
        value={search}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <Container>
        {error && <p style={{ color: "red" }}>Something went wrong.</p>}
        {loading && !data && (
          <Loader>
            <BounceLoader color="rgba(255,255,255,0.1)" />
          </Loader>
        )}

        {data?.posts?.nodes && data.posts.nodes.length
          ? data.posts.nodes.map(({ featuredImage, ...rest }, index) => {
              return (
                <Post
                  key={index}
                  image={featuredImage?.mediaItemUrl}
                  {...rest}
                />
              )
            })
          : !loading && !error && <p>No results</p>}

        <Post style={{ height: 0, margin: 0 }} noPlaceholder />
        <Post style={{ height: 0, margin: 0 }} noPlaceholder />
      </Container>
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
  cursor: pointer;
  width: calc(100%);
  @media (min-width: 680px) {
    width: calc(100% / 2 - 10px);
  }
  @media (min-width: 980px) {
    width: calc(100% / 3 - 15px);
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
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
  max-width: 600px;
  margin-bottom: 30px;
`
