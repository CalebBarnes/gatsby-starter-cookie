import React, { createContext, useContext, useReducer } from "react"

const initialState = {
  isLoggedIn: false,
  user: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.payload,
      }

    case "SET_USER_INFO":
      return {
        ...state,
        user: action.payload,
      }

    default:
      return state
  }
}

export const StateContext = createContext()

export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useStore = () => useContext(StateContext)
