const createQueryString = object => {
  if (!object || typeof object !== `object`) {
    console.warn("createQueryString requires an object")
    return
  }

  const queryString = Object.keys(object)
    .map(key => key + "=" + object[key])
    .join("&")

  return queryString
}

export default createQueryString
