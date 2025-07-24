import React from "react";

import { AppBar, Box, Toolbar, IconButton, Typography, Menu,
    Button, MenuItem, Container, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import NavigationAvatar from "./NavigationAvatar";

const NavigationBar = ({
    pages,
    anchorElNav, 
    handleOpenNavMenu,
    handleCloseNavMenu,
    handlePageNav,
    userInitials,
    handleUserProfile,
}) => (
    <AppBar position="static" elevation={0}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                {/* Desktop Logo*/}
                <Typography variant="h6" noWrap sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, letterSpacing: '.3rem', color: 'black', fontWeight: 700, textDecoration: 'none' }}>
                    PICK MY PROFESSOR
                    </Typography>

                {/* Desktop Navigation */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', mr: 1, gap: 1 }}>
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

                <NavigationAvatar
                    userInitials={userInitials}
                    handleUserProfile={handleUserProfile}
                />

            </Toolbar>
        </Container>
    </AppBar>
);

export default NavigationBar;