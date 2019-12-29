import React from "react"
import styled from "styled-components"
import media from "styled-media-query"

const Component = props => <Edges {...props} />

export default Component

const Edges = styled.div`
margin: 0 auto;

  ${media.greaterThan(`small`)`
    width: 96%;
  `}

  /* 
  ${media.greaterThan(`medium`)`
    width: 97%;
  `} */

  ${media.greaterThan(`large`)`
    width: 95%;
    max-width: 1280px;
  `}
`
