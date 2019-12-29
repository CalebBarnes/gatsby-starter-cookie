import React from "react"
import { Provider } from "urql"
import { client } from "./client"

const UrqlProvider = props => <Provider value={client} {...props} />

export default UrqlProvider
