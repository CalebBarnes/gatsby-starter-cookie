import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import { PulseLoader } from "react-spinners"

export default props => {
  const { to, href, children, ...rest } = props

  const Button = !!to ? StyledLink : !!href ? StyledAnchor : StyledButton

  return (
    <Container {...rest}>
      <Button>
        <span className="children">{children}</span>
        <Loader className="pulse-loader">
          <PulseLoader size={5} sizeUnit="px" />
        </Loader>
      </Button>
    </Container>
  )
}

const Loader = styled.div`
  position: absolute;
  left: calc(50% - 13.5px);
  top: calc(50% - 13px);
`

const Container = styled(({ loading, ...rest }) => <div {...rest} />)`
  ${({ loading }) =>
    loading
      ? css`
          .pulse-loader {
            opacity: 1;
          }
          .children {
            opacity: 0;
          }
        `
      : css`
          .pulse-loader {
            opacity: 0;
          }
          .children {
            opacity: 1;
          }
        `}
`

const Component = styled(({ someProp, ...rest }) => <div {...rest} />)`
  color: ${({ someProp }) => (someProp ? "red" : "blue")};
`

const ButtonStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  all: unset;
  background: lightgrey;
  padding: 10px 30px;
  cursor: pointer;
  &:hover,
  &:focus {
    background: darkgrey;
  }
`

const StyledLink = styled(Link)`
  ${ButtonStyles}
  position: relative;
`
const StyledAnchor = styled.a`
  ${ButtonStyles}
  position: relative;
`
const StyledButton = styled.button`
  ${ButtonStyles}
  position: relative;
`
