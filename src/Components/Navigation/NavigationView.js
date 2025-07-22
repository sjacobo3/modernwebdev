import React from "react";

import { AppBar, Box, Toolbar, IconButton, Typography, Menu,
    Button, MenuItem, Container, Tooltip, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavigationView = ({
    pages,
    settings,
    anchorElNav, 
    anchorElUser,
    handleOpenNavMenu,
    handleCloseNavMenu,
    handlePageNav,
    handleOpenUserMenu,
    handleCloseUserMenu,
    userInitial,
    isAuthenticated,
    handleUserActions
}) => (
    <AppBar position="static" elevation={0}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                {/* Desktop Logo*/}
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

                {/* Mobile Logo */}

                {/* Mobile Hamburger Navigation */}
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <Tooltip title="Open navigation">
                        <IconButton onClick={handleOpenNavMenu}>
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>

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
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Account settings">
                        <IconButton onClick={handleOpenUserMenu}>
                            <Avatar sx={{ width: 40, height: 40, fontSize: 18 }}>
                                {userInitial}
                            </Avatar>
                        </IconButton>
                    </Tooltip>

                    <Menu
                        anchorEl={anchorElUser}
                        id="account-menu"
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        sx={{ mt: 1 }}
                    >
                        {!isAuthenticated && (
                        settings.map((setting) => (
                            <MenuItem key={setting} onClick={() => handleUserActions(setting)}>
                                <Typography sx={{ textAlign: 'center'}}>{setting}</Typography>
                            </MenuItem>
                        )))}
                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
);

export default NavigationView;