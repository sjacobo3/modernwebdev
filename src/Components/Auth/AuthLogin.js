import React, { useEffect, useState } from "react";
import { loginUser, authenticateUser } from "../../Services/AuthService";
import AuthForm from "./AuthForm";
import { useNavigate, Link } from "react-router-dom";

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
    if (authenticateUser()) {
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
    console.log(e.target);
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
    <>
      <AuthForm
        user={currUser}
        isLogin={true}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
      <p className="auth-form-text">
        Not Registered? <Link to="/auth/register">Click to Create an Account</Link>
      </p>
    </>
  );
};

export default AuthLogin;