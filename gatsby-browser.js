import React from "react"

import UrqlProvider from "./src/urql"

export const wrapRootElement = ({ element }) => (
  <UrqlProvider children={element} />
)
