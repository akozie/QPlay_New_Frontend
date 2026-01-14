import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import Quiz from "./components/cube/Quiz/Quiz.jsx";
import QuizApi from "./components/cube/Quiz/QuizApi.jsx";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Quiz />} />
      <Route path="/quiz2" element={<QuizApi />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
