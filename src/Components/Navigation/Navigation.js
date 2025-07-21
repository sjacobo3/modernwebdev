import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { AppBar, Box, Toolbar, IconButton, Typography, Menu,
  Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import AccountMenu from "./AccountMenu";

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
    <AppBar position="static" sx={{backgroundColor: 'white'}} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop */}
          <Typography variant="h6" noWrap sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, letterSpacing: '.3rem', color: 'black', fontWeight: 700, textDecoration: 'none' }}>
            PICK MY PROFESSOR
            </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', mr: 1 }}>
            {pages.map((page) => (
                <Button key={page} onClick={() => handlePageNav(page)} sx={{ my: 2, color: 'black' }}>
                {page}
                </Button>
            ))}
          </Box>

          {/* Mobile */}

          {/* Mobile Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleOpenNavMenu}>
                <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                sx={{ display: { xs: 'block', md: 'none' } }}>
                {pages.map((page) => (
                <MenuItem key={page} onClick={() => handlePageNav(page)}>
                    <Typography sx={{ textAlign: 'center'}}>{page}</Typography>
                </MenuItem>
                ))}
            </Menu>
            </Box>

          {/* Profile Menu */}
          <Box>
            <AccountMenu />
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
