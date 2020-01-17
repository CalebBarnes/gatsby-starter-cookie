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

  const formData = isBrowser && new FormData();

  //Testing sending other info to the server through the formData
  isLoggedIn && formData.append("id", user.userId);

  const [executeFetch, { data, error, loading, called }] = useFetch(
    `https://calebbarnes-4dbaeb.easywp.com/wp-json/custom/v1/avatar`,
    {
      headers: {
        //For some reason using the arrow function seams to put incorrect line breaks or something into the authorization header
        //which causes stuff to break.
        authorization: auth?.authToken ? `Bearer ${auth.authToken}` : ``
      },
      method: "POST",
      body: formData,
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

    const reader = new FileReader()

    reader.onloadend = e => {
      setFile(e.target.result)
    }

    reader.readAsDataURL(files[0])
    console.log(formData.getAll("avatar"))
  }

  const handleSubmit = e => {
    e.preventDefault();

    //Not sure why but accessing the file through the vdom like this seems to work
    const fileInput = document.getElementById('file');
    formData.append('file', fileInput.files[0], 'avatar.png');

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
