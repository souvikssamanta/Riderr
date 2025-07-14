


import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/RideLogo.png";

function Start() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] flex flex-col items-center justify-center p-4">
      {/* Logo with subtle animation */}
      <div className="absolute top-1 left-5 ">
       <p className="font-bold font- text-2xl">Riderr </p>
      </div>

      {/* Main content container */}
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        {/* Illustration section */}
        <div className="flex-1  flex justify-center">
          <img
            className="h-64 rounded-xl md:h-96 w-auto transition-transform duration-500 hover:scale-105"
            src="https://img.freepik.com/free-vector/car-sharing-concept-illustration_114360-15011.jpg"
            alt="Ride sharing illustration"
          />
        </div>

        {/* Text and buttons section */}
        <div className="flex-1 flex flex-col items-center text-center">
          {/* Animated wheel icon */}
          <div className="mb-6 h-20 w-20 rounded-full  animate-[spin_8s_linear_infinite]">
            <img
              className="h-20 w-20 rounded-full"
              src="https://cdn.vectorstock.com/i/500p/12/90/car-rim-and-tire-linear-icon-vector-28511290.jpg"
              alt="Car wheel"
            />
          </div>

          {/* Headline with gradient text */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-700">
              Welcome to Riderr
            </span>
          </h2>

          <p className="text-gray-600 mb-8 text-lg max-w-md">
            Your journey begins here. Ride with comfort or earn as a captain.
          </p>

          {/* Buttons container */}
          <div className="w-full max-w-xs space-y-4">
            <Link
              to="/login"
              className="block w-full px-6 py-3 rounded-full font-medium
              bg-gradient-to-r from-blue-600 to-emerald-500 text-white
               hover:shadow-xl transition-all duration-300
              hover:from-blue-500 hover:to-emerald-400
              transform hover:-translate-y-1"
            >
              Let's Get Started
            </Link>

            <Link
              to="/captain-login"
              className="block w-full px-6 py-3 rounded-full font-medium
              bg-white  border-2 
              text-green-700
               transition-all duration-600
               hover:bg-black 
               transform hover:-translate-y-1 hover:cursor-aliased"
            >
              For Captains
            </Link>
          </div>
        </div>
      </div>

    
    
    </div>
  );
}

export default Start;














