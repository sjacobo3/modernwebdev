import React, { useState } from "react";
import { Box, Button, TextField, Typography, FormControl } from "@mui/material";
import { sendPasswordResetEmail } from "../../Services/AuthService"; 
import { useNavigate } from "react-router-dom";

const AuthForgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(email); // replace with your Parse logic
      alert("Password reset link sent! Please check your email.");
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
      mt={10}
    >
      <Button onClick={() => navigate("/auth/login")}>Back</Button>
      
      <Typography variant="h6" gutterBottom>Forgot Password</Typography>
      <FormControl onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          required
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button variant="contained" type="submit">
          Send Reset Link
        </Button>
      </FormControl>
    </Box>
  );
};

export default AuthForgot;