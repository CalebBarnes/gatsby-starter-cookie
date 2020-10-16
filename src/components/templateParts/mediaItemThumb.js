import React from "react"
import styled from "styled-components"

export default props => {
  const { sourceUrl, altText, ...rest } = props

  console.log({ props })

  return (
    <Container {...rest}>
      <img src={sourceUrl} />
    </Container>
  )
}

const Container = styled.div``
