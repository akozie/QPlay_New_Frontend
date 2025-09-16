import React, { useState, useEffect } from "react";
import blogo from "./Assets/cube.jpeg";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + (Math.random() * 15 + 10);
      });
    }, 200);

    return () => {
      clearTimeout(contentTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-white">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="text-center"
            >
              {/* Logo */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 mx-auto mb-6"
                >
                  <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center shadow-lg border">
                    <img src={blogo} className="w-16 h-16 rounded-full" />
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-5xl font-bold mb-2 text-slate-800"
                >
                  CubeCover
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-slate-600 text-lg"
                >
                  Loading your health experience...
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="w-64 mx-auto"
              >
                <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>

                <div className="text-slate-500 text-sm font-medium">
                  {Math.round(progress)}%
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SplashScreen;
