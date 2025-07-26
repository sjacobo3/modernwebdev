import Parse from "parse";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserAuthenticated } from "../../Services/AuthService";

import NavigationBar from "./NavigationBar";

const Navigation = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);

  const pages = ["Home", "Reviews", "Inbox"];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePageNav = (page) => {
    handleCloseNavMenu();
    navigate(page.toLowerCase());
  };

  const handleUserProfile = () => {
    navigate("/profile");
  };

  const getUserInitials = () => {
    const user = Parse.User.current();
    return isUserAuthenticated()
      ? user.get("firstName").charAt(0) + user.get("lastName").charAt(0)
      : "?";
  };

  return (
    <NavigationBar
      pages={pages}
      anchorElNav={anchorElNav}
      handleOpenNavMenu={handleOpenNavMenu}
      handleCloseNavMenu={handleCloseNavMenu}
      handlePageNav={handlePageNav}
      handleUserProfile={handleUserProfile}
      userInitials={getUserInitials()}
    />
  );
};

export default Navigation;
