import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import * as Loaders from "react-spinners"

export default props => {
  const {
    value,
    disabled,
    type,
    form,
    to,
    href,
    children,
    variant,
    loader = "PulseLoader",
    ...rest
  } = props

  const Button = !!to ? StyledLink : !!href ? StyledAnchor : StyledButton

  const loaderColor = () => {
    switch (variant) {
      case "action":
        return "white"

      case "cancel":
        return "white"

      default:
        return "#3A3A3A"
    }
  }

  const Loader = Loaders[loader]

  console.log({ Loaders })
  console.log({ Loader })

  return (
    <Button
      {...rest}
      value={value}
      type={type}
      form={form}
      variant={variant}
      to={to}
      disabled={disabled}
    >
      <span className="children">{children}</span>
      {props?.loading && (
        <LoaderContainer className="pulse-loader">
          <Loader size={5} sizeUnit="px" color={loaderColor()} />
          {/* <PulseLoader size={5} sizeUnit="px" color={loaderColor()} /> */}
        </LoaderContainer>
      )}
    </Button>
  )
}

const LoaderContainer = styled.div`
  position: absolute;
  left: calc(50% - 13.5px);
  top: calc(50% - 13px);
`

const buttonStyles = css`
  border-radius: 3px;
  display: inline-block;
  vertical-align: center;
  position: relative;
  cursor: pointer;
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

  ${({ tall }) =>
    tall
      ? css`
          padding: 19px 14px;
        `
      : css`
          padding: 9px 14px;
        `}

  ${({ variant }) => {
    switch (variant) {
      case "outline":
        return css`
          border: 1px solid rgb(189, 197, 211);
          &:hover {
            background: #eef0f4;
          }
        `

      case "cancel":
        return css`
          border: 1px solid #da1f15;
          background: #f62c20;
          .children {
            color: white;
          }
          &:hover {
            background: #da1f15;
          }
        `

      case "action":
        return css`
          border: 1px solid #145eda;
          background: #156dff;
          .children {
            color: white;
          }
          &:hover {
            background: #145eda;
          }
        `

      default:
        return css`
          border: 1px solid transparent;
          &:hover {
            background: #eef0f4;
          }
        `
    }
  }}
`

const buttonReset = css`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;

  color: inherit;
  font: inherit;

  line-height: normal;

  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  -webkit-appearance: none;

  /* Remove excess padding and border in Firefox 4+ */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`

const StyledLink = styled(Link)`
  ${buttonStyles}
  position: relative;
`
const StyledAnchor = styled.a`
  ${buttonStyles}
  position: relative;
`
const StyledButton = styled.button`
  ${buttonReset}
  ${buttonStyles}
  position: relative;
`
