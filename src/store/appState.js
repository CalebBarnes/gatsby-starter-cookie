import produce from "immer"

export const appState = {
  loginDialog: false,
  progress: false,
  menu: false,
}

export const appReducer = (state, action) => {
  const { payload } = action

  return produce(state, draft => {
    switch (action.type) {
      case "SET_MENU":
        draft.menu = payload
        break

      case "TOGGLE_MENU":
        draft.menu = !draft.menu
        break

      case "SET_PROGRESS":
        draft.progress = payload
        break

      case "SET_LOGIN_DIALOG":
        draft.loginDialog = payload
        break

      default:
    }
  })
}
