import { setLocalStorage, getLocalStorage } from "../utils"

const key = "appTokens"

/**
 * Stores auth tokens in local storage
 * @param {object} data
 */
export const setAuth = data => {
  const { clientMutationId, authToken, refreshToken, id, user } = data || {}
  setLocalStorage(key, {
    clientMutationId,
    authToken,
    refreshToken,
    id: id || user?.id,
  })
}

/**
 * Returns the auth tokens from local storage
 * @returns {object} Object
 */
export const getAuth = () => {
  return getLocalStorage(key)
}

/**
 * Updates the auth token in the local storage
 * @param {string} authToken
 */
export const updateToken = authToken => {
  const auth = getAuth()
  setAuth({ ...auth, authToken })
}

/**
 * Deletes auth tokens from local storage
 * and updates the context user data and logged in state
 * @param {function} dispatch
 */
export const logoutUser = dispatch => {
  if (typeof dispatch !== "function") {
    console.error(`logoutUser requires the 'dispatch' function`)
    return
  }

  // delete auth keys from local storage
  setLocalStorage(key, null)

  // remove user info from store
  dispatch({ type: "SET_USER_INFO", payload: null })

  // update logged in state
  dispatch({ type: "SET_LOGGED_IN", payload: false })
}

export const getAuthToken = () => {
  const { authToken } = getAuth()
  console.log({ authToken })
  return authToken
}
