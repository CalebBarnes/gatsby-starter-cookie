import isBrowser from "./isBrowser"

const setLocalStorage = (key, value) => {
  if (!isBrowser) {
    return
  }

  if (!key || !value || typeof value !== "object") {
    console.warn("setLocalStorage requires a key and an object")
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
}

export default setLocalStorage
