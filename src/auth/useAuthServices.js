import React, { useEffect } from "react"
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks"

import { useStore } from "../state/store"
import { getAuth, logoutUser, updateToken } from "./"

import { VIEWER_QUERY } from "../apollo/query"
import { REFRESH_TOKEN_MUTATION } from "../apollo/mutation"

export const useAuthServices = path => {
  const [{ isLoggedIn }, dispatch] = useStore()

  const authStorage = getAuth()

  const [executeViewerQuery, { data, error, loading, called }] = useLazyQuery(
    VIEWER_QUERY,
    {
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
      onError(err) {
        console.log({ err })

        // if invalid authToken
        // execute refresh auth token
        // instead of logging out user
        // logoutUser(dispatch)
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

  const [executeTokenRefresh] = useMutation(REFRESH_TOKEN_MUTATION, {
    onCompleted(response) {
      console.log({ tokenRefreshResponse: response })
      if (response?.refreshJwtAuthToken?.authToken) {
        updateToken(response?.refreshJwtAuthToken?.authToken)
      }
    },
    onError(error) {
      console.log({ error })
      // invalid token
      if (error?.networkError?.statusCode === 403) {
        if (error?.networkError?.result?.data?.refreshJwtAuthToken?.authToken) {
          // new auth token recieved
          updateToken(
            error.networkError.result.data.refreshJwtAuthToken.authToken
          )
          // get user
          executeViewerQuery()
        } else {
          logoutUser(dispatch)
        }
      }
    },
  })

  useEffect(() => {
    if (authStorage?.authToken && authStorage?.refreshToken) {
      executeTokenRefresh({
        variables: {
          refreshToken: authStorage?.refreshToken,
        },
      })
    }
  }, [path])
}

export default useAuthServices
