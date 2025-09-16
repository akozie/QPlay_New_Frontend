import React, { useState } from "react";
import {
  Heart,
  ChevronRight,
  X,
  Menu,
  Mail,
  Phone,
  Stethoscope,
  Play,
  Activity,
  Users,
  Target,
  Award,
  Star,
  Download,
  Smartphone,
} from "lucide-react";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";
import logo from "./Assets/cube.jpeg";

const CubeCover = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("features");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleMainAction = () => {
    navigate("/mental-health");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Premium Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Enhanced Logo Section */}
            <div className="flex items-center cursor-pointer group">
              <div className="relative">
                <img
                  src={logo}
                  alt="CubeCover Logo"
                  className="h-12 w-12 rounded-2xl mr-4 "
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
                  CubeCover
                </span>
                <div className="text-xs text-gray-600 font-semibold -mt-1">
                  Your Health, Our Priority ✨
                </div>
              </div>
            </div>

            {/* Enhanced User Section */}
        

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 rounded-full hover:bg-blue-50 transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden pb-6 space-y-4 border-t border-blue-100 pt-4">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setActiveTab("features");
                    setShowMobileMenu(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    activeTab === "features"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Features
                </button>
              </div>

              {/* Mobile User Section */}
           
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative">
        {/* Features Tab */}
        {activeTab === "features" && (
          <div className="relative">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Column */}
                <div className="space-y-10">
                  {/* Badge */}
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-sm font-semibold border border-blue-200 shadow-sm">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Trusted by 50,000+ Healthcare Professionals
                  </div>

                  {/* Headline */}
                  <div className="space-y-6">
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                      Your Health,
                      <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
                        Intelligently Managed
                      </span>
                    </h1>

                    <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                      Experience the future of healthcare with AI-powered
                      insights, personalized wellness plans, and 24/7 health
                      monitoring that adapts to your unique needs.
                    </p>
                  </div>

                  {/* Premium Stats */}
                  <div className="grid grid-cols-3 gap-8">
                    {[
                      {
                        number: "10K+",
                        label: "Medical Resources",
                        icon: "📚",
                      },
                      { number: "50K+", label: "Active Users", icon: "🏥" },
                      {
                        number: "98%",
                        label: "Health Goals Achieved",
                        icon: "🎯",
                      },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="text-2xl mb-2">{stat.icon}</div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {stat.number}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Right Column - Premium Dashboard Preview */}
                <div className="hidden lg:block relative">
                  <div className="relative">
                    {/* Main Dashboard Card */}
                    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 relative overflow-hidden">
                      {/* Gradient Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-blue-100/50 rounded-3xl"></div>

                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              Health Dashboard
                            </h3>
                            <p className="text-sm text-gray-500">
                              Your wellness overview
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          </div>
                        </div>

                        {/* Health Metrics */}
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                              <div className="flex items-center mb-2">
                                <Heart className="w-4 h-4 text-blue-600 mr-2" />
                                <span className="text-xs font-medium text-blue-700">
                                  Heart Rate
                                </span>
                              </div>
                              <div className="text-2xl font-bold text-blue-600">
                                72 BPM
                              </div>
                              <div className="text-xs text-blue-600">
                                Normal
                              </div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                              <div className="flex items-center mb-2">
                                <Activity className="w-4 h-4 text-blue-600 mr-2" />
                                <span className="text-xs font-medium text-blue-700">
                                  Steps Today
                                </span>
                              </div>
                              <div className="text-2xl font-bold text-blue-600">
                                8,542
                              </div>
                              <div className="text-xs text-blue-600">
                                +12% vs yesterday
                              </div>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-gray-700">
                                Weekly Health Goal
                              </span>
                              <span className="text-sm text-gray-500">
                                87% complete
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                                style={{ width: "87%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating AI Assistant Card */}
                    <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/50 max-w-xs">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            AI Health Assistant
                          </div>
                          <div className="flex items-center text-xs text-blue-600">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                            Online & Ready
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-700">
                          "Your vitals look great! Consider a 10-minute walk to
                          reach your daily goal. 🚶‍♂️"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CubeCover;
