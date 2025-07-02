import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navigation from "./Navigation/Navigation";
import Home from "./Home/Home";
import ReviewMain from "./Reviews/ReviewMain";

const Components = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<ReviewMain />} />
      </Routes>
    </Router>
  );
};

export default Components;
