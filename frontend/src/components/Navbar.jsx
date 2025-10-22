import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-slate-900 shadow-xl border-b border-slate-700 sticky top-0 z-50 backdrop-blur-md bg-opacity-96">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {currentUser && (
            <div className="flex-shrink-0">
              <Link to="/events" className="cursor-pointer group">
                <h1 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                  NGO Connect
                </h1>
              </Link>
            </div>
          )}
          {!currentUser && (
            <div className="flex-shrink-0">
              <a href="/#home" className="cursor-pointer group">
                <h1 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                  NGO Connect
                </h1>
              </a>
            </div>
          )}

          <div className="hidden md:block">
            <div className="flex items-center space-x-3">
              {currentUser ? (
                <>
                  {currentUser.role === "admin" && (
                    <Link
                      to="/events/create"
                      className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-1.25 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-green-500 hover:border-green-400"
                    >
                      Create Event
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-1.25 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-red-500 hover:border-red-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.25 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-blue-500 hover:border-blue-400"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-1.25 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-green-500 hover:border-green-400"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-blue-400 focus:outline-none focus:text-blue-400 p-2 rounded-lg hover:bg-slate-800 transition-all duration-200 border border-transparent hover:border-slate-600"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className={`h-6 w-6 transform transition-all duration-300 ${
                  isMenuOpen ? "rotate-90 scale-110" : "rotate-0 scale-100"
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-3 pb-4 space-y-3 sm:px-3 border-t border-slate-700 bg-gradient-to-b from-slate-800/60 to-slate-800/40 rounded-b-lg backdrop-blur-sm">
            {currentUser ? (
              <>
                {currentUser.role === "admin" && (
                  <Link
                    to="/events/create"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 border border-green-500 hover:border-green-400"
                  >
                    Create Event
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 border border-red-500 hover:border-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 border border-blue-500 hover:border-blue-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2.5 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 border border-green-500 hover:border-green-400"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
