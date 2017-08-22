import React from "react"
import { Redirect, Route } from "react-router-dom"
import localStorage from "local-storage"

const AuthenticatedRoute = ({ component: Component, render, ...rest }) =>
  <Route
    {...rest}
    render={props => {
      if (localStorage.get("JWT")) {
        if (render) {
          return render()
        } else {
          return <Component {...props} />
        }
      } else {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    }}
  />

export default AuthenticatedRoute
