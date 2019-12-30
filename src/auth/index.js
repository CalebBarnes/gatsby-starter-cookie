import { setLocalStorage, getLocalStorage } from "../utils"

const key = "test-555"

export const setAuth = data => {
  const { clientMutationId, authToken, refreshToken } = data?.login
  setLocalStorage(key, { clientMutationId, authToken, refreshToken })
}

export const getAuth = () => {
  return getLocalStorage(key)
}
