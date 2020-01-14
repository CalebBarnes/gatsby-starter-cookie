import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"

import Dialog from "../components/common/Dialog"

import { useStore } from "../store"
import LoginForm from "./loginForm"
import RegisterForm from "./registerForm"

import Button from "./button"

import * as theme from "../theme"

export default props => {
  const [
    {
      appState: { loginDialog, registerDialog },
    },
    dispatch,
  ] = useStore()

  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    loginDialog && setActiveTab(0)
    registerDialog && setActiveTab(1)
  }, [loginDialog, registerDialog])

  return (
    <LoginRegisterDialog
      open={loginDialog || registerDialog}
      onClose={() => {
        dispatch({ type: "SET_LOGIN_DIALOG", payload: false })
        dispatch({ type: "SET_REGISTER_DIALOG", payload: false })
      }}
    >
      <Tabs>
        <Tab
          active={loginDialog}
          onClick={() => {
            dispatch({ type: "SET_LOGIN_DIALOG", payload: true })
            dispatch({ type: "SET_REGISTER_DIALOG", payload: false })
          }}
        >
          Log in
        </Tab>
        <Tab
          active={registerDialog}
          onClick={() => {
            dispatch({ type: "SET_LOGIN_DIALOG", payload: false })
            dispatch({ type: "SET_REGISTER_DIALOG", payload: true })
          }}
        >
          Sign up
        </Tab>
      </Tabs>

      {activeTab === 0 ? <LoginForm /> : <RegisterForm />}
    </LoginRegisterDialog>
  )
}

const LoginRegisterDialog = styled(Dialog)``

const Tabs = styled.div`
  display: flex;
  margin-bottom: 30px;
`
const Tab = styled(Button)`
  ${({ active }) =>
    active &&
    css`
      border-bottom: 2px solid ${theme.colors.primary};
    `}
`
