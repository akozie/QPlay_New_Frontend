import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import Quiz from "./components/cube/Quiz/Quiz.jsx";

import SplashScreen from "./components/cube/SplashScreen.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Quiz />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [splashComplete, setSplashComplete] = useState(false);

  useEffect(() => {
    // Check if user has seen splash screen in this session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShowSplash(false);
      setSplashComplete(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setSplashComplete(true);
    // Mark that user has seen splash in this session
    sessionStorage.setItem("hasSeenSplash", "true");
  };

  // Show splash screen on first visit
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
