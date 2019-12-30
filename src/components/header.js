import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"

import Edges from "./edges"
import Button from "./button"

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

          <Nav>
            <RightMenu>
              <NavButton to="/users">Users</NavButton>

              <NavButton to="/login">Log in</NavButton>

              <NavButton variant="action" to="/">
                Get started
              </NavButton>
            </RightMenu>
          </Nav>

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

const NavButton = styled(Button)`
  margin-left: 25px;
`

const RightMenu = styled.div`
  display: flex;
`

const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

const PageLink = styled(Link)`
  margin-left: 10px;
`

const Header = styled.header`
  margin-bottom: 1.45rem;

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
