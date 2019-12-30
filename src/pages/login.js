import React from "react"
import styled from "styled-components"

import SEO from "../components/seo"

import LoginForm from "../components/loginForm"

const LoginPage = () => {
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
