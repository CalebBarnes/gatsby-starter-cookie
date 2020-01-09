import React from "react"
import styled from "styled-components"
import { navigate } from "gatsby"

import SEO from "../components/seo"

import { useStore } from "../store"

const LoginPage = () => {
  const [
    {
      userState: { isLoggedIn },
    },
  ] = useStore()

  isLoggedIn && navigate("/")

  return (
    <Container>
      <SEO title="Create an account" />
      <h1>Get started</h1>
    </Container>
  )
}

export default LoginPage

const Container = styled.div``
