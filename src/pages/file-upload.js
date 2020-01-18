import React, { useState } from "react"
import styled from "styled-components"

import { useFetch } from "../utils"
import { getAuth } from "../auth"

import Button from "../components/button"

import { useStore } from "../store"

import { isBrowser } from "../utils/"

export default () => {
  const [
    {
      userState: { user, isLoggedIn },
    },
  ] = useStore()

  const auth = getAuth()

  const [file, setFile] = useState()

  const formData = isBrowser && new FormData()

  const handleChange = e => {
    const {
      target: { files },
    } = e

    const reader = new FileReader()
    reader.onloadend = e => {
      setFile(e.target.result)
    }
    reader.readAsDataURL(files[0])

    formData.append("file", files[0], files[0].name)

    console.log(files[0])
    for (var [key, value] of formData.entries()) {
      console.log(key, value)
    }

    // console.log(formData.getAll("file"))
  }

  const handleSubmit = e => {
    e.preventDefault()

    isLoggedIn && user && file && executeFetch()
  }

  const [executeFetch, { data, error, loading, called }] = useFetch(
    `https://calebbarnes-4dbaeb.easywp.com/wp-json/custom/v1/avatar`,
    {
      headers: {
        authorization: auth?.authToken ? `Bearer ${auth.authToken}` : ``,
      },
      method: "POST",
      mode: "no-cors",
      body: formData,
      onCompleted: res => {
        console.log({ res })
      },
      onError: error => {
        console.log({ error })
      },
    }
  )

  return (
    <div>
      <h1>File Upload</h1>

      {error && <p>{error.message}</p>}

      <img src={file} style={{ width: "200px" }} />

      <form onSubmit={handleSubmit} id="fileUploadForm">
        <label htmlFor="username">File: </label>
        <input type="file" name="file" id="file" onChange={handleChange} />
      </form>

      <Button
        loading={loading}
        variant="action"
        type="submit"
        form="fileUploadForm"
        value="upload"
      >
        Upload
      </Button>
    </div>
  )
}
