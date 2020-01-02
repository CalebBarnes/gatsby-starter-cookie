import React, { useEffect } from "react"
import { useQuery, useMutation, useLazyQuery } from "../apollo"

import { useStore } from "../state/store"
import { getAuth, logoutUser } from "./"

import { VIEWER } from "../apollo/query"
import { REFRESH_TOKEN } from "../apollo/mutation"

export const useAuthServices = path => {
  const [{ isLoggedIn }, dispatch] = useStore()

  const authStorage = getAuth()
  const id = authStorage?.id

  const [executeViewerQuery, { data, error, loading, called }] = useLazyQuery(
    VIEWER,
    {
      variables: { id },
      skip: !id,
      onCompleted(response) {
        const { viewer } = response || {}
        // store user info in context store

        if (viewer) {
          dispatch({
            type: "SET_USER_INFO",
            payload: viewer,
          })

          // update logged in state
          dispatch({
            type: "SET_LOGGED_IN",
            payload: true,
          })
        }
      },
      onError(error) {
        console.log({ error })
        logoutUser(dispatch)
      },
    }
  )

  if (
    !isLoggedIn &&
    authStorage?.id &&
    authStorage?.authToken &&
    authStorage?.refreshToken &&
    !called
  ) {
    executeViewerQuery()
  }

  useEffect(() => {
    console.log({ path })

    console.log("do refreshToken here")
  }, [path])
}

export default useAuthServices
