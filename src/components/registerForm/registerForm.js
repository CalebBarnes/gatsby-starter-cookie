import React, { useState } from "react"
import styled from "styled-components"

import { useMutation } from "@apollo/react-hooks"

import { setAuth, logoutUser } from "../../auth"
import sanitizeErrors from "./sanitizeErrors"
import Button from "../button"
import { useStore } from "../../state/store"

import { REGISTER_USER_MUTATION } from "../../apollo/mutation"

export default () => {
  // dispatch to manage login state & store user info
  const [, dispatch] = useStore()

  // 'values' for controlling state of inputs
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
  })

  // 'formError' for managing the forms error messages
  const [formError, setFormError] = useState("")

  const [executeRegister, res] = useMutation(REGISTER_USER_MUTATION)
  // console.log({ ...res })

  // control the form input values with state
  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = e => {
    // prevent default form submission
    e.preventDefault()
    setFormError("")

    const { username, password, email } = values

    // prevent request with empty username or password
    if (!username || !password || !email) {
      setFormError("Please enter a username and password")
      return
    }

    // remove any existing auth tokens from local storage
    logoutUser(dispatch)

    // execute login mutation with the input values from the state
    executeRegister({ variables: { username, password, email } })
      .then(res => {
        console.log("then")
        console.log({ res })
      })
      .catch(error => {
        console.log("error")
        console.log({ error })

        // if (error?.graphQLErrors) {
        //   // handle form errors
        //   error.graphQLErrors.map(err =>
        //     setFormError(sanitizeErrors(err?.message))
        //   )
        // } else {
        //   setFormError(
        //     "Something went wrong. Please try again later or contact support."
        //   )
        // }
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

        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={handleChange}
          value={values.email}
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
