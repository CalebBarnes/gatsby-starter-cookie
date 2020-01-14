import React, { useEffect, useRef } from "react"

import PropTypes from "prop-types"

const ClickAwayListener = props => {
  const { onClickAway, open, ...rest } = props

  const useClickAwayListener = ref => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        open && typeof onClickAway === "function" && onClickAway()
      }
    }

    useEffect(() => {
      // Bind the event listener
      typeof window !== `undefined` &&
        document.addEventListener("mousedown", handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        typeof window !== `undefined` &&
          document.removeEventListener("mousedown", handleClickOutside)
      }
    })
  }

  const wrapperRef = useRef(null)
  useClickAwayListener(wrapperRef)

  return <div ref={wrapperRef} {...rest} />
}

ClickAwayListener.propTypes = {
  children: PropTypes.element.isRequired,
}

ClickAwayListener.defaultProps = {
  open: true,
}

export default ClickAwayListener
