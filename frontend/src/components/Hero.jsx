import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Find Your Cause.
            <br />
            Make Your Impact.
          </span>
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-200 font-medium mb-8">
          Welcome to NGO Connect
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
          A platform for NGOs and Volunteers. Discover events, manage volunteer
          activities, and connect with communities to bring a change.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/register"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-2 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 min-w-[160px]"
          >
            Get Started
          </Link>
          <a
            href="#about"
            className="inline-block border-2 border-gray-400 hover:border-gray-300 text-gray-300 hover:text-white px-10 py-2 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-gray-700/20 min-w-[160px]"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
