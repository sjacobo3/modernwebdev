import Parse from "parse";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../Services/AuthService";

import NavigationView from "./NavigationView";

const pages = ['Home', 'Reviews', 'Profile'];
const settings = ["Login", "Register"];

const Navigation = () => {
  
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = authenticateUser();
    setIsAuthenticated(isAuthenticated);
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

  const handleUserActions = (action) => {
    handleCloseUserMenu();
    
    if (action === "Login") {
      navigate("/auth/login");
    }
    else if (action === "Register") {
      navigate("/auth/register");
    }
  }

  const getUserInitial = () => {
    const user = Parse.User.current();

    return user ? user.get("firstName").charAt(0) + user.get("lastName").charAt(0) : "?";
  }

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
      userInitial={getUserInitial()}
      isAuthenticated={isAuthenticated}
      handleUserActions={handleUserActions}
    />
  )
}

export default Navigation;
