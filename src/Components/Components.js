import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ReviewList from "./Reviews/ReviewList";
import Navigation from "./Navigation/Navigation";

const Components = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/reviews" element={<ReviewList />} />
      </Routes>
    </Router>
  );
};

export default Components;
