import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      navigate("/events");
    }
  }, [currentUser, navigate]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    contactNo: "",
    role: "user",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imageFile) {
      const newUrl = URL.createObjectURL(imageFile);
      setImageFileUrl(newUrl);
      return () => URL.revokeObjectURL(newUrl);
    }
  }, [imageFile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const registrationData = new FormData();
      for (const key in formData) {
        registrationData.append(key, formData[key]);
      }

      if (imageFile) {
        registrationData.append("avatar", imageFile);
      }

      await apiClient.post("/users/register", registrationData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">
            Join NGO Connect and start making a difference
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="flex justify-center mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                  ref={fileInputRef}
                />
                <div
                  className="relative w-24 h-24 rounded-full cursor-pointer group bg-gray-700 border-2 border-gray-600 group-hover:border-purple-400 transition"
                  onClick={() => fileInputRef.current.click()}
                >
                  {imageFileUrl ? (
                    <img
                      src={imageFileUrl}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full flex items-center justify-center">
                      <FaUser className="w-10 h-10 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-400 text-center">
                Upload profile picture (optional)
              </p>
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="contactNo"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Contact Number
              </label>
              <input
                id="contactNo"
                name="contactNo"
                type="tel"
                value={formData.contactNo}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your contact number"
                required
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Create a password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          {error && (
            <div className="mt-4 text-center bg-red-500/30 text-red-300 p-2 rounded-lg">
              {error}
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
