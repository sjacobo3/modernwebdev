import React from "react";
import { Link } from "react-router-dom";

const AuthModule = () => {
  return (
    <div class="auth-buttons">
      <Link to="/auth/register">
        <button>Register</button>
      </Link>
      <Link to="/auth/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default AuthModule;
