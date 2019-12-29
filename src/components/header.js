import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"

import Edges from "./edges"

import { useStore } from "../state/store"

const Component = props => {
  const {
    site: {
      siteMetadata: { title: siteTitle },
    },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [{ isLoggedIn, userInfo }] = useStore()

  return (
    <Header {...props}>
      <Edges>
        <Flex>
          <h1>
            <Link to="/">{siteTitle}</Link>
          </h1>
          <h4>
            {isLoggedIn && userInfo?.battletag && (
              <PageLink to="/fetch">{userInfo?.battletag}</PageLink>
            )}
          </h4>
        </Flex>
      </Edges>
    </Header>
  )
}

export default Component

const PageLink = styled(Link)`
  margin-left: 10px;
`

const Header = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
  color: white;
  > div {
    padding: 1.45rem 0;
  }
  h1,
  h4 {
    margin: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`
