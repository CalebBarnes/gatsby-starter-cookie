import React from "react"
import styled from "styled-components"
import { navigate } from "gatsby"

import SEO from "../components/seo"
import RegisterForm from "../components/registerForm"

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
      <h1>Sign up</h1>
      <RegisterForm />
    </Container>
  )
}

export default LoginPage

const Container = styled.div``
