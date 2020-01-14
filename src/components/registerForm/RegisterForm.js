import React, { useState } from "react"
import styled from "styled-components"

import { useMutation } from "@apollo/react-hooks"

import { setAuth, logoutUser } from "../../auth"
import sanitizeErrors from "../../utils/sanitizeErrors"
import Button from "../button"
import { useStore } from "../../store"

import Input from "../styles/input"

import { REGISTER_USER_MUTATION } from "../../apollo/mutation"

export default () => {
  // dispatch to manage login state & store user info
  const [, dispatch] = useStore()

  // 'values' for controlling state of inputs
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  })

  // 'formError' for managing the forms error messages
  const [formError, setFormError] = useState("")

  const [executeRegisterUser, { loading }] = useMutation(REGISTER_USER_MUTATION)
  // console.log({ ...res })

  // control the form input values with state
  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = e => {
    // prevent default form submission
    e.preventDefault()
    setFormError("")

    const { username, email, password } = values

    // prevent request with empty username or password
    if (username === "" || email === "" || password === "") {
      setFormError("Please enter a username and password")
      return
    }

    // remove any existing auth tokens from local storage
    logoutUser(dispatch)

    // execute login mutation with the input values from the state
    executeRegisterUser({ variables: { username, email, password } })
      .then(res => {
        // console.log(res)
        if (res?.data?.registerUser?.user) {
          // success. user registered.
          setFormError(
            `Account created. Email sent to ${res?.data?.registerUser?.user?.email}.`
          )
        }
      })
      .catch(error => {
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
        <label htmlFor="email">Email </label>
        <Input
          autoComplete="off"
          type="text"
          name="email"
          id="email"
          onChange={handleChange}
          value={values.email}
        />
        <label htmlFor="username">Username </label>
        <Input
          autoComplete="off"
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={values.username}
        />

        <label htmlFor="password">Password </label>
        <Input
          autoComplete="off"
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={values.password}
        />
        <Button
          loading={loading}
          variant="action"
          type="submit"
          form="loginForm"
          value="Log in"
        >
          Sign up
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
  align-items: flex-start;
`
