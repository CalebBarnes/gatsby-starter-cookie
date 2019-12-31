import React from "react"
import gql from "graphql-tag"
import { useQuery } from "urql"

import SEO from "../components/seo"
import Button from "../components/button"

const SecondPage = () => {
  const usersQuery = gql`
    query {
      users {
        nodes {
          id
          userId
          username
          nickname
          firstName
          lastName
          email
        }
      }
    }
  `

  const [{ fetching, stale, data, error }, executeQuery] = useQuery({
    query: usersQuery,
  })

  // console.log({ fetching, stale, data, error })
  return (
    <>
      <SEO title="Users" />
      <span style={{ display: "flex" }}>
        <h1>Users </h1>
        <Button
          variant="action"
          loading={fetching}
          onClick={() => executeQuery({ requestPolicy: "network-only" })}
          style={{ marginLeft: "25px" }}
        >
          Refresh users
        </Button>
      </span>
      {data?.users &&
        data?.users?.nodes?.map((user, index) => {
          return (
            <p key={user.id}>
              {user.userId}: {user.firstName} {user.lastName}
            </p>
          )
        })}
    </>
  )
}

export default SecondPage
