import React from "react"
import styled from "styled-components"

export default props => {
  const { headline, body, url, image } = props

  return (
    <Card {...props}>
      {headline && <h1>{headline}</h1>}

      {body && <p>{body}</p>}
    </Card>
  )
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
`
