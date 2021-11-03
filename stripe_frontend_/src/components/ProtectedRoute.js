import React from "react";
import { useSelector } from 'react-redux'
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated, isVerifying } = useSelector(state => state.auth)
  console.log(isAuthenticated, isVerifying)
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
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