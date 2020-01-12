import React, { useState } from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/react-hooks"
import moment from "moment"

import Parser from "html-react-parser"

import SEO from "../components/seo"
import Button from "../components/button"
import { POSTS_QUERY } from "../apollo/query"

import { getAuth } from "../auth/"

import { useFetch } from "../utils"

const IndexPage = () => {
  const { data, error, loading, called } = useQuery(POSTS_QUERY)

  console.log({ data })
  return (
    <Container>
      <SEO title="Home" />
    </Container>
  )
}

export default IndexPage

const Container = styled.div``
