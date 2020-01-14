import React, { useRef, useEffect } from "react"
import styled, { css } from "styled-components"
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock"

import { useStore } from "../../store"

import ClickAwayListener from "./ClickAwayListener"
// import useLockBodyScroll from "../../utils/useLockBodyScroll"

import * as theme from "../../theme"

export default props => {
  const { onClose, onOpen, open, children } = props

  const dialogRef = useRef(null)

  useEffect(() => {
    if (open) {
      disableBodyScroll(dialogRef)
      typeof onOpen === "function" && onOpen()
    } else {
      enableBodyScroll(dialogRef)
      typeof onClose === "function" && onClose()
    }

    return () => {
      clearAllBodyScrollLocks()
    }
  }, [open])

  return (
    <Dialog {...props}>
      <ClickAwayListener onClickAway={onClose} open={open}>
        <Card className="dialog-card" open={open}>
          {children}
        </Card>
      </ClickAwayListener>
    </Dialog>
  )
}

const Dialog = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;

  transition: all 0.2s cubic-bezier(0.46, 0.03, 0.52, 0.96);

  ${({ open }) =>
    open &&
    css`
      pointer-events: all;
      opacity: 1;
    `}
`

const Card = styled.div`
  border-radius: 5px;
  background: ${props => props.backgroundColor || "#202020"};
  padding: 20px;

  transition: all 0.2s cubic-bezier(0.46, 0.03, 0.52, 0.96);

  transform: scale(0.95);

  ${({ open }) =>
    open &&
    css`
      transform: scale(1);
    `}
`
