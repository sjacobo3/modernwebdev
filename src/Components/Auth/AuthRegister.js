import { useEffect, useState } from "react";
import { createUser } from "../../Services/AuthService";
import { useNavigate, Link } from "react-router-dom";

import AuthForm from "./AuthForm";

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

  // register user, show message, and redirect to home page
  useEffect(() => {
    if (newUser && add) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          alert(
            `${userCreated.get("firstName")}, you successfully registered!`
          );
          navigate("/home");
        }
        setAdd(false);
      });
    }
  }, [newUser, add, navigate]);

  // update form
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
