import produce from "immer"

export const userState = {
  isLoggedIn: false,
  user: null
}

export const userReducer = (state, action) => {
  const { payload } = action

  return produce(state, draft => {
    switch (action.type) {
      case "SET_USER_INFO":
        draft.user = payload
        break

      case "SET_LOGGED_IN":
        draft.isLoggedIn = payload
        break

      default:
    }
  })
}
