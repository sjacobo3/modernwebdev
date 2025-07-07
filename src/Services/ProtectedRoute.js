import React from "react";
import { authenticateUser } from "./AuthService";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, flag, ...rest }) => {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate(-1); //prev page
  };
  console.log("rest: ", rest);

  return authenticateUser() ? (
    <Component {...rest} />
  ) : (
    <div>
      <p>Unaurthorized!</p> <button onClick={goBackHandler}>Go Back.</button>
    </div>
  );
};

export default ProtectedRoute;
