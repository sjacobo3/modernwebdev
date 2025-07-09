import { Link, useNavigate } from "react-router-dom";
import { authenticateUser, logoutUser } from "../../Services/AuthService";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <div className="navigation">
      <div className="nav-logo"></div>
      <div className="nav-bar">
        <div className="nav-item">
          <Link to="/">Home</Link>
        </div>

        <div className="nav-item">
          <Link to="/reviews">Reviews</Link>
        </div>

        {authenticateUser() ? (
          <div
            className="nav-item"
            onClick={async () => {
              await logoutUser();
              navigate("/login");
            }}
          >
            Logout
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navigation;
