import React from "react";

import { Box, Button, Paper, TextField, Typography } from "@mui/material";

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {
  return (
    <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
      <Typography variant="h6" align="center">
        {isLogin ? "Login" : "Register"}
      </Typography>

      <Box component="form" onSubmit={onSubmit}>
        {!isLogin && (
          <>
            <TextField
              label="First Name"
              value={user.firstName}
              onChange={onChange}
              name="firstName"
              required
              fullWidth
              margin="normal"
            />

            <TextField
              label="Last Name"
              value={user.lastName}
              onChange={onChange}
              name="lastName"
              required
              fullWidth
              margin="normal"
            />
          </>
        )}

        <TextField
          label="Email"
          type="email"
          value={user.email}
          onChange={onChange}
          name="email"
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          value={user.password}
          onChange={onChange}
          name="password"
          required
          fullWidth
          margin="normal"
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AuthForm;
