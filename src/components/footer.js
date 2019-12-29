import React from "react"
import styled from "styled-components"
// import { useStaticQuery, graphql, Link } from "gatsby"

import Edges from "./edges"

const Component = props => {
  return (
    <Footer {...props}>
      <Edges>
        <p>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </p>
      </Edges>
    </Footer>
  )
}

export default Component

const Footer = styled.footer`
  background: rebeccapurple;
  color: white;
  p {
    margin: 0;
    padding: 10px;
  }
`
