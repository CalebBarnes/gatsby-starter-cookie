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

  const [executeFetch, { data, error, loading, called }] = useFetch(
    `https://calebbarnes-4dbaeb.easywp.com/wp-json/custom/v1/avatar`,
    {
      headers: {
        authorization: () =>
          auth?.authToken ? `Bearer ${auth.authToken}` : ``,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      mimeType: "multipart/form-data",
      data: formData,
      onCompleted: res => {
        console.log({ res })
      },
      onError: error => {
        console.log({ error })
      },
    }
  )

  const handleChange = e => {
    const {
      target: { files },
    } = e

    Array.from(files).forEach(file => {
      formData.append(
        "avatar",
        file,
        Math.random()
          .toString(36)
          .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15)
      )

      const reader = new FileReader()

      reader.onloadend = e => {
        // console.log(e)
        setFile(e.target.result)
      }

      reader.readAsDataURL(file)
    })

    console.log(formData.getAll("avatar"))
  }

  const handleSubmit = e => {
    e.preventDefault()
    isLoggedIn && user && file && executeFetch()
  }

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
