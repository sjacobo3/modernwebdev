import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isUserAuthenticated } from "./AuthService";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated()) {
      navigate("/auth/login");
    }
  }, [navigate]);

  // redirect to login page if not logged in
  return <Component />;
};

export default ProtectedRoute;
