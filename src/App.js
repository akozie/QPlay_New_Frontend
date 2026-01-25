import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

// import Quiz from "./components/cube/Quiz/Quiz.jsx";
import QuizApi from "./components/cube/Quiz/QuizApi.jsx";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Default route uses API-backed quiz with auth and backend state */}
      <Route path="/" element={<QuizApi />} />
      {/* Optional local/static quiz without backend, if you still want it */}
      {/* <Route path="/quiz-local" element={<Quiz />} /> */}
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
