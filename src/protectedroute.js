import React from "react";
import { Redirect, Route } from "react-router-dom";

export const ProtectedRoute = ({
  component: Component,
  exact,
  ...rest
}) => {
  const isAuth = sessionStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth ? (
          <Component {...props} exact />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
