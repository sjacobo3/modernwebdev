import React, { useEffect, useState } from "react";
import { createUser, authenticateUser } from "../../Services/AuthService";
import AuthForm from "./AuthForm";
import { useNavigate, Link } from "react-router-dom";

import { Box, Typography } from "@mui/material";

const AuthRegister = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // flag is the state to watch for add/remove updates
  const [add, setAdd] = useState(false);

  // check if user is already logged in
  useEffect(() => {
    if (authenticateUser()) {
      alert("Already logged in!");
      navigate("/reviews");
    }
  }, [navigate]);

  // register user, show message, and redirect to home page
  useEffect(() => {
    if (newUser && add) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          alert(
            `${userCreated.get("firstName")}, you successfully registered!`
          );
          navigate("/reviews");
        }
        setAdd(false);
      });
    }
  }, [newUser, add, navigate]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value: newValue } = e.target;
    console.log(newValue);
    setNewUser({ ...newUser, [name]: newValue });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setAdd(true);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={1}
      mt={8}
    >
      <AuthForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
      <Typography variant="body2" mt={2}>
        Already Registered? <Link to="/auth/login">Login Here</Link>
      </Typography>
    </Box>
  );
};

export default AuthRegister;
