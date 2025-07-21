import { useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Parse } from "parse";

import { authenticateUser, logoutUser } from "../../Services/AuthService";
import { useNavigate } from "react-router-dom";

export default function AccountMenu() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(authenticateUser());
  const [currentUser, setCurrentUser] = useState(Parse.User.current());
  const [anchorEl, setAnchorEl] = useState(null);

  // menu open/close
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // logout user
  const logoutHandler = () => {
    logoutUser().then(() => {
      setIsAuthenticated(false);
      navigate("/home");
    });
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          sx={{ p: 0 }}
        >
          <Avatar sx={{ width: 40, height: 40, fontSize: 18 }}>
            {isAuthenticated
              ? currentUser.get("firstName").charAt(0) +
                currentUser.get("lastName").charAt(0)
              : "?"}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ mt: 1 }}
      >
        {isAuthenticated
          ? [
              <MenuItem key="profile" onClick={() => navigate("/profile")}>
                Profile
              </MenuItem>,
              <MenuItem key="logout" onClick={logoutHandler}>
                Logout
              </MenuItem>,
            ]
          : [
              <MenuItem key="login" onClick={() => navigate("/auth/login")}>
                Login
              </MenuItem>,
              <MenuItem
                key="register"
                onClick={() => navigate("/auth/register")}
              >
                Register
              </MenuItem>,
            ]}
      </Menu>
    </Box>
  );
}
