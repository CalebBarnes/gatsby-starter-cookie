import React, { useState } from "react"
import styled from "styled-components"

import { useMutation } from "urql"
import gql from "graphql-tag"

import { setAuth, getAuth } from "../../auth"

import sanitizeErrors from "./sanitizeErrors"
import Button from "../button"

export default () => {
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

  const [res, executeLogin] = useMutation(loginMutation)

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
      .then(result => {
        console.log({ ...result })
        const { error, data } = result

        if (error?.graphQLErrors) {
          // Handle form errors
          error.graphQLErrors.map(err =>
            setFormError(sanitizeErrors(err.message))
          )
          return
        }

        if (data) {
          // Store auth token
          setAuth(data)
        }

        // if (data?.user) {
        //   // Store user info in context store
        // }
      })
      .catch(error => {
        console.log({ error })
        setFormError(
          "Something went wrong. Please try again later or contact support."
        )
      })
  }

  return (
    <Container>
      {formError && <ErrorMessage>{formError}</ErrorMessage>}
      <form onSubmit={handleSubmit} id="loginForm">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={values.username}
        />

        <label htmlFor="password">Password: </label>
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

const Container = styled.div``

const ErrorMessage = styled.p``
