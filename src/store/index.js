import React, { createContext, useContext, useReducer } from "react"

import { appState, appReducer } from "./appState"
import { userState, userReducer } from "./userState"

export const StateContext = createContext({})

export const StoreProvider = props => {
  const initialState = {
    appState,
    userState
  }

  const reducer = ({ appState, userState }, action) => ({
    appState: appReducer(appState, action),
    userState: userReducer(userState, action)
  })

  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {props.children}
    </StateContext.Provider>
  )
}

export const useStore = () => useContext(StateContext)
