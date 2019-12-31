import React from "react"
import { useQuery, useMutation } from "urql"
import gql from "graphql-tag"

import { useStore } from "../state/store"
import { getAuth } from "./"

import { queryUser } from "./queryUser"

export const useAuthServices = () => {
  const [store, dispatch] = useStore()
  console.log({ store })
  const authStorage = getAuth()
  const id = authStorage?.id

  const [res, executeQuery] = useQuery({
    query: queryUser,
    variables: { id },
    requestPolicy: "network-only",
  })
  console.log({ res })

  // console.log({ id })

  // if (authStorage?.authToken && authStorage?.refreshToken) {
  //   console.log("tokens exist")
  //   console.log({ ...authStorage })
  //   // executeQuery()
  //   // executeQuery({ id })
  //   //   .then(response => {
  //   //     console.log("then", response)
  //   //     // const { error, data } = response
  //   //     // if (error?.graphQLErrors) {
  //   //     //   // handle form errors
  //   //     //   error.graphQLErrors.map(err => console.log({ GraphQLError: err }))
  //   //     //   return
  //   //     // }
  //   //     // if (data && data.login) {
  //   //     //   // store the auth/refresh tokens
  //   //     //   setAuth(data)
  //   //     //   // store user info in context store
  //   //     //   dispatch({ type: "SET_USER_INFO", payload: data.login.user })
  //   //     //   // update logged in state
  //   //     //   dispatch({ type: "SET_LOGGED_IN", payload: true })
  //   //     // }
  //   //   })
  //   //   .catch(error => {
  //   //     console.log({ error })
  //   //     // setFormError(
  //   //     //   "Something went wrong. Please try again later or contact support."
  //   //     // )
  //   //   })
  // }
}

export default useAuthServices
