import React, { useState } from "react"
import styled from "styled-components"

import { useMutation } from "@apollo/react-hooks"

import { setAuth, logoutUser } from "../../auth"
import sanitizeErrors from "../../utils/sanitizeErrors"
import Button from "../button"
import Input from "../styles/input"
import { useStore } from "../../store"

import { LOGIN_USER_MUTATION } from "../../apollo/mutation"

export default ({ onSuccess, onError }) => {
  // dispatch to manage login state & store user info
  const [, dispatch] = useStore()

  // 'values' for controlling state of inputs
  const [values, setValues] = useState({ username: "", password: "" })

  // 'formError' for managing the forms error messages
  const [formError, setFormError] = useState("")

  const [executeLogin, res] = useMutation(LOGIN_USER_MUTATION)
  // console.log({ ...res })

  // control the form input values with state
  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = e => {
    // prevent default form submission
    e.preventDefault()
    setFormError("")

    const { username, password } = values

    // prevent request with empty username or password
    if (username === "" || password === "") {
      setFormError("Please enter a username and password")
      return
    }

    // remove any existing auth tokens from local storage
    logoutUser(dispatch)

    // execute login mutation with the input values from the state
    executeLogin({ variables: { username, password } })
      .then(res => {
        // console.log({ res })
        if (res?.data?.login) {
          typeof onSuccess === "function" && onSuccess()
          // store the auth/refresh tokens
          setAuth(res.data.login)

          // store user info in context store
          dispatch({ type: "SET_USER_INFO", payload: res.data?.login?.user })

          // update logged in state
          dispatch({ type: "SET_LOGGED_IN", payload: true })
        }
      })
      .catch(error => {
        typeof onError === "function" && onError()
        if (error?.graphQLErrors) {
          // handle form errors
          error.graphQLErrors.map(err =>
            setFormError(sanitizeErrors(err?.message))
          )
        } else {
          setFormError(
            "Something went wrong. Please try again later or contact support."
          )
        }
      })
  }

  return (
    <Container>
      {formError && <ErrorMessage>{formError}</ErrorMessage>}
      <Form onSubmit={handleSubmit} id="loginForm">
        <Input
          placeholder="Email"
          autoComplete="username"
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={values.username}
        />

        <Input
          placeholder="Password"
          autoComplete="current-password"
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={values.password}
        />
        <Button
          loading={res.loading}
          variant="action"
          type="submit"
          form="loginForm"
          value="Log in"
        >
          Log in
        </Button>
      </Form>
    </Container>
  )
}

const Container = styled.div``

const ErrorMessage = styled.p``

const Form = styled.form`
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    flex-direction: row;
    input {
      margin: 1px 25px 0 0;
    }
  }
`
