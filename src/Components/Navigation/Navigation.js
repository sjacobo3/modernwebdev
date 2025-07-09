import { Link } from "react-router-dom";
import { authenticateUser, logoutUser } from "../../Services/AuthService";

const Navigation = () => {
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
            }}
          >
            <Link to="/auth/login">Logout</Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navigation;
