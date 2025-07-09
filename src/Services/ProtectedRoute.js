import React from "react";
import { authenticateUser } from "./AuthService";
import AuthLogin from "../Components/Auth/AuthLogin";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  console.log("Component: ", Component);

  // redirect to login page if not logged in
  return authenticateUser() ? <Component {...rest} /> : <AuthLogin />;
};

export default ProtectedRoute;
