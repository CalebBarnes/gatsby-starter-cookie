import { setLocalStorage, getLocalStorage } from "../utils"

const key = "test-555"

/**
 * Stores auth tokens in local storage
 * @param {object} data
 */
export const setAuth = data => {
  const {
    clientMutationId,
    authToken,
    refreshToken,
    user: { id },
  } = data?.login
  setLocalStorage(key, { clientMutationId, authToken, refreshToken, id })
}

/**
 * Returns the auth tokens from local storage
 */
export const getAuth = () => {
  return getLocalStorage(key)
}

/**
 * Deletes auth tokens from local storage
 * and updates the store user data and logged in state
 * @param {function} dispatch
 */
export const logoutUser = dispatch => {
  // delete auth keys from local storage
  setLocalStorage(key, null)

  // remove user info from store
  dispatch({ type: "SET_USER_INFO", payload: null })

  // update logged in state
  dispatch({ type: "SET_LOGGED_IN", payload: false })
}
