import React from "react"
import styled from "styled-components"
import { navigate } from "gatsby"

import SEO from "../components/seo"

import LoginForm from "../components/loginForm"

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
      <SEO title="Log in" />
      <h1>Log in</h1>
      <LoginForm />
    </Container>
  )
}

export default LoginPage

const Container = styled.div``
