import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "../Services/ProtectedRoute";
import Navigation from "./Navigation/Navigation";
import Home from "./Home/Home";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
import ReviewMain from "./Reviews/ReviewMain";
import UserProfile from "./UserProfile/UserProfile";
import AuthForgot from "./Auth/AuthForgot"; //forgot password 

const Components = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/auth/register" element={<AuthRegister />} />
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route path="/auth/forgot" element={<AuthForgot />} />
        <Route
          path="/reviews"
          element={<ProtectedRoute element={ReviewMain} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={UserProfile} />}
        />
        <Route path="*" element={<Home />}replace />
        
      </Routes>
    </Router>
  );
};

export default Components;
