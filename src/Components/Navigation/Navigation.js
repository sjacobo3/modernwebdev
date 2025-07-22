import Parse from "parse";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { logoutUser, authenticateUser } from "../../Services/AuthService";

import NavigationView from "./NavigationView";

const pages = ['Home', 'Reviews'];

const Navigation = () => {
  
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(authenticateUser());

  useEffect(() => {
    setIsAuthenticated(!!Parse.User.current());
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageNav = (page) => {
    handleCloseNavMenu();
    navigate(page.toLowerCase());
  };

  const setSettings = () => {
    if (isAuthenticated) {
      return ["Profile", "Logout"];
    }
    return ["Login", "Register"];
  };

  const settings = setSettings();

  const handleUserActions = (action) => {
    handleCloseUserMenu();
    if (action === "Logout") {
      logoutUser().then(() => {
        setIsAuthenticated(false);
        navigate("/home");
      });
    }
    else if (action === "Login") {
      navigate("/auth/login");
    }
    else if (action === "Register") {
      navigate("/auth/register");
    }
    else if (action === "Profile") {
      navigate("/profile");
    }
  }

  const getUser = () => {
    return Parse.User.current();
  };
  const userInitial =
    getUser() && getUser().get("firstName") && getUser().get("lastName")
      ? getUser().get("firstName").charAt(0) + getUser().get("lastName").charAt(0)
      : "?";

  return (
    <NavigationView
      pages={pages}
      settings={settings}
      anchorElNav={anchorElNav}
      anchorElUser={anchorElUser}
      handleOpenNavMenu={handleOpenNavMenu}
      handleCloseNavMenu={handleCloseNavMenu}
      handleOpenUserMenu={handleOpenUserMenu}
      handleCloseUserMenu={handleCloseUserMenu}
      handlePageNav={handlePageNav}
      userInitial={userInitial}
      handleUserActions={handleUserActions}
    />
  )
}

export default Navigation;
