import { useEffect, useState } from "react";
import { isUserAuthenticated, loginUser } from "../../Services/AuthService";
import AuthForm from "./AuthForm";
import { useNavigate, Link } from "react-router-dom";

import { Box, Typography } from "@mui/material";

const AuthLogin = () => {
  const navigate = useNavigate();

  const [currUser, setCurrUser] = useState({
    email: "",
    password: "",
  });

  const [add, setAdd] = useState(false);

  // need to check if user is already logged in
  // redirect to home page in project
  useEffect(() => {
    if (isUserAuthenticated()) {
      alert("Already logged in!");
      navigate("/reviews");
    }
  }, [navigate]);

  // log user in, show message, and redirect to home
  useEffect(() => {
    if (currUser && add) {
      loginUser(currUser).then((userLoggedIn) => {
        if (userLoggedIn) {
          alert(
            `${userLoggedIn.get("firstName")}, you successfully logged in!`
          );
          navigate("/reviews");
        }
        setAdd(false);
      });
    }
  }, [currUser, add, navigate]);

  const onChangeHandler = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setCurrUser((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        user={currUser}
        isLogin={true}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />

      <Typography variant="body2" mt={2}>
        Not Registered?{" "}
        <Link to="/auth/register">Click to Create an Account</Link>
      </Typography>

      <Typography variant="body2" mt={2} align="center">
       Click <Link to="/auth/forgot">Forgot Password?</Link>
      </Typography>
    </Box>
  );
};

export default AuthLogin;
