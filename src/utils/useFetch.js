import { useState } from "react"

const initialState = {
  error: null,
  data: null,
  loading: false,
  called: false,
}

export const useFetch = (endpoint, args = {}) => {
  const {
    headers = null,
    token = null,
    method = "get",
    onCompleted,
    onError,
    body,
  } = args

  // console.log("useFetchargs:", { args })
  const [state, setState] = useState(initialState)

  const myHeaders = token
    ? { ...headers, authorization: `Bearer ${token}` }
    : headers

  const callback = async () => {
    setState({
      ...state,
      called: true,
      loading: true,
      error: null,
    })

    await fetch(endpoint, {
      headers: myHeaders,
      method,
      body,
    })
      .then(async response => {
        const json = await response.json()
        setState({
          ...state,
          loading: false,
          data: json,
          called: true,
          error: null,
        })
        typeof onCompleted === "function" && onCompleted(json) //optional callback function
      })
      .catch(error => {
        setState({ ...state, error, loading: false, called: true })
        typeof onError === "function" && onError(error) //optional callback function
      })
  }

  return [callback, state]
}

export default useFetch
