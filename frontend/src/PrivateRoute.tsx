import React, { PropsWithChildren } from "react";
import { Navigate, Route } from "react-router-dom";

interface PrivateRouteProps {}

function PrivateRoute({ children }: PropsWithChildren<PrivateRouteProps>) {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/signin" replace={true} />
  );
}

export default PrivateRoute;
