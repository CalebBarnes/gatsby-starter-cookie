import React from "react"

import styled from "styled-components"

import Header from "../components/header"
import Footer from "../components/footer"
import Edges from "../components/edges"

import useAuthServices from "../auth/useAuthServices"

import { useStore } from "../state/store"

export default ({ children }) => {
  useAuthServices(children?.props?.path)

  const [state] = useStore()

  console.log({ ...state })

  return (
    <Container>
      <div>
        <Header />
        <Edges>{children}</Edges>
      </div>
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`
