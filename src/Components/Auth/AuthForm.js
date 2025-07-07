import React from "react";

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {
  return (
    <div className="auth-form">
      {isLogin ? <h1>Login</h1> : <h1>Register</h1>}
      <form onSubmit={onSubmit}>
        {!isLogin && (
          <>
            <div className="auth-form-item">
              <input
                type="text"
                value={user.firstName}
                onChange={onChange}
                name="firstName"
                placeholder="First Name*"
                required
              />
            </div>
            <div className="auth-form-item">
              <input
                type="text"
                value={user.lastName}
                onChange={onChange}
                name="lastName"
                placeholder="Last Name*"
                required
              />
            </div>
          </>
        )}
        <div className="auth-form-item">
          <input
            type="email"
            value={user.email}
            onChange={onChange}
            name="email"
            placeholder="Email*"
            required
          />
        </div>
        <div className="auth-form-item">
          <input
            type="password"
            value={user.password}
            onChange={onChange}
            name="password"
            placeholder="Password*"
            min="0"
            required
          />
        </div>
        <div className="auth-form-item">
          <button type="submit" onSubmit={onSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
