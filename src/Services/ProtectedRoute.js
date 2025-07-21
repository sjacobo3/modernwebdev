import { useEffect } from "react";
import { authenticateUser } from "./AuthService";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticateUser()) {
      navigate("/auth/login");
    }
  }, [navigate]);

  // redirect to login page if not logged in
  return <Component />;
};

export default ProtectedRoute;
