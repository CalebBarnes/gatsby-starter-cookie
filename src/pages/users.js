import React from "react"

import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

import SEO from "../components/seo"
import Button from "../components/button"

const SecondPage = () => {
  const USERS = gql`
    query {
      users {
        nodes {
          avatar {
            url
          }
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

  const { loading, error, data, refetch } = useQuery(USERS)

  return (
    <>
      <SEO title="Users" />
      <span style={{ display: "flex", alignItems: "flex-start" }}>
        <h1 style={{ marginRight: "25px" }}>Users </h1>

        <Button variant="action" loading={loading} onClick={() => refetch()}>
          Refresh users
        </Button>
      </span>
      {error && <p>{error.message}</p>}
      {data?.users &&
        data?.users?.nodes?.map((user, index) => {
          return (
            <p key={user.id}>
              <img
                style={{ height: "50px", borderRadius: "100%" }}
                src={user?.avatar?.url}
              />
              {user.userId}: {user.firstName} {user.lastName}{" "}
            </p>
          )
        })}
    </>
  )
}

export default SecondPage
