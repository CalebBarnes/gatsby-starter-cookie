import React, { useState } from "react"
import styled from "styled-components"

import { useMutation } from "@apollo/react-hooks"
import Input from "../components/styles/input"

import { CREATE_POST_MUTATION } from "../apollo/mutation"
import { useStore } from "../store"

import Button from "../components/button"

export default ({ onError }) => {
  const [
    {
      userState: { user },
    },
  ] = useStore()

  const { userId } = user || {}

  const [values, setValues] = useState({
    title: "",
    content: "",
  })

  // control the form input values with state
  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value })
  }

  const [executeCreatePost, res] = useMutation(CREATE_POST_MUTATION)

  const handleSubmit = e => {
    // prevent default form submission
    e.preventDefault()
    const { title, content } = values
    executeCreatePost({ variables: { title, content, authorId: userId } })
      .then(res => {
        console.log({ res })
      })
      .catch(error => {
        console.log({ error })
        typeof onError === "function" && onError()
      })
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} id="createPostForm">
        <Input
          placeholder="Post Title"
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          value={values.title}
        />

        <Input
          placeholder="Post Content"
          type="content"
          name="content"
          id="content"
          onChange={handleChange}
          value={values.content}
        />
        <Button
          loading={res.loading}
          variant="action"
          type="submit"
          form="createPostForm"
          value="Submit post"
        >
          Submit post
        </Button>
      </Form>
    </Container>
  )
}

const Container = styled.div``

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
