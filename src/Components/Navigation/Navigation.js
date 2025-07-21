import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { AppBar, Box, Toolbar, IconButton, Typography, Menu,
  Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import AccountMenu from "./AccountMenu";
import NavigationView from "./NavigationView";

const pages = ['Home', 'Reviews'];

const Navigation = () => {
  
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePageNav = (page) => {
    navigate(page.toLowerCase());
  };

  return (
    <NavigationView
      pages={pages}
      anchorElNav={anchorElNav}
      handleOpenNavMenu={handleOpenNavMenu}
      handleCloseNavMenu={handleCloseNavMenu}
      handlePageNav={handlePageNav}
    />
  )
}

export default Navigation;
