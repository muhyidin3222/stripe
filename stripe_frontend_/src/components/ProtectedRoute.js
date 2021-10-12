import React from "react";
import { useSelector } from 'react-redux'
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated, isVerifying } = useSelector(state => state.auth)
  return (
    <Route
      {...rest}
      render={props =>
        isVerifying ? (
          <div />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
      }
    />
  )
}

export default ProtectedRoute;