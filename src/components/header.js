import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"

import Edges from "./edges"
import Button from "./button"

import { useStore } from "../store"
import { logoutUser } from "./../auth"

import ProfileBar from "./ProfileBar"

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

  const [
    {
      userState: { isLoggedIn },
    },
  ] = useStore()

  return (
    <Header {...props}>
      <Edges>
        <Flex>
          <h1>
            <Link to="/">{siteTitle}</Link>
          </h1>

          <Nav>
            <LeftMenu>
              <NavButton to="/users">Users</NavButton>
            </LeftMenu>
            <RightMenu>
              {!isLoggedIn && (
                <>
                  <NavButton to="/login">Log in</NavButton>

                  <NavButton variant="action" to="/register">
                    Get started
                  </NavButton>
                </>
              )}

              {isLoggedIn && <ProfileBar />}
            </RightMenu>
          </Nav>
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

const LeftMenu = styled.div`
  display: flex;
`

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  width: 100%;
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
