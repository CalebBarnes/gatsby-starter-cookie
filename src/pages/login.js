import React, { useState } from "react"
import styled from "styled-components"
import { useMutation } from "urql"
import gql from "graphql-tag"

import SEO from "../components/seo"
import Button from "../components/button"

const LoginPage = () => {
  const [values, setValues] = useState({ username: "", password: "" })
  const [formError, setFormError] = useState("")

  const loginMutation = gql`
    mutation LoginMutation($username: String!, $password: String!) {
      login(
        input: {
          username: $username
          password: $password
          clientMutationId: "KgsyASs"
        }
      ) {
        clientMutationId
        authToken
        refreshToken
        user {
          email
          firstName
          lastName
          username
        }
      }
    }
  `

  const [res, executeLogin] = useMutation({
    loginMutation,
  })

  console.log({ ...res })

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value })
  }

  //   console.log({ ...values })

  const handleSubmit = e => {
    e.preventDefault()
    setFormError("")

    const { username, password } = values

    if (username === "" || password === "") {
      setFormError("Please enter a username and password")
      return
    }
    executeLogin({ username, password })
  }

  return (
    <Container>
      <SEO title="Log in" />
      <h1>Log in</h1>
      {formError && <p>{formError}</p>}
      <form onSubmit={handleSubmit} id="loginForm">
        <label for="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={values.username}
        />

        <label for="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={values.password}
        />
      </form>

      <Button
        loading={res.fetching}
        variant="action"
        type="submit"
        form="loginForm"
        value="Log in"
      >
        Log in
      </Button>
    </Container>
  )
}

export default LoginPage

const Container = styled.div``
