
import React from "react";
import { motion } from "framer-motion";
import {
  RiArrowDownLine,
  RiCarLine,
  RiUser3Line,
  RiShieldKeyholeLine,
} from "react-icons/ri";

const WaitforDriver = ({ setWaitforDriver, ride }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className=" inset-0 top-auto h-auto max-h-[90vh] bg-white rounded-t-2xl shadow-xl py-1 px-3 z-50"
    >
      {/* Close Button */}
      <button
        onClick={() => setWaitforDriver(false)}
        className="absolute left-1 top-1 p-2 text-gray-500 hover:text-gray-700"
      >
        <RiArrowDownLine size={24} />
      </button>

      {/* Header */}
      <div className="text-center mb-1">
        <h1 className="text-2xl font-bold text-gray-800 mt-8">
          Your Driver is Coming
        </h1>
        <p className="text-gray-500 mt-2">
          Please wait at your pickup location
        </p>
      </div>

      {/* Driver Card */}
      <div className="bg-gradient-to-r from-green-50 to-amber-50 rounded-xl p-4 mb-6 border border-green-200">
        <div className="flex items-center justify-center mb-4">
          <img
            src="https://img.freepik.com/free-vector/delivery-service-with-masks-concept-illustration_114360-7853.jpg"
            alt="Driver illustration"
            className="h-0 object-contain"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <RiUser3Line />
              <span className="text-sm">Driver</span>
            </div>
            <p className="font-bold text-gray-800 mt-1">
              {ride?.captain?.fullname?.firstname || "Loading..."}
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <RiShieldKeyholeLine />
              <span className="text-sm">OTP</span>
            </div>
            <p className="font-bold text-gray-800 mt-1">
              {ride?.otp || "----"}
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <RiCarLine />
              <span className="text-sm">Car No</span>
            </div>
            <p className="font-bold text-gray-800 mt-1 uppercase">
              {ride?.captain?.vehicle?.plate || "----"}
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <RiCarLine />
              <span className="text-sm">Car Type</span>
            </div>
            <p className="font-bold text-gray-800 mt-1 capitalize">
              {ride?.captain?.vehicle?.vehicleType || "----"}
            </p>
          </div>
        </div>
      </div>

      {/* Ride Details */}
      <div className="space-y-4 mb-1">
        <div className="bg-gray-50 py-1 px-4 rounded-lg">
          <p className="text-sm text-gray-500">Pickup location</p>
          <p className="font-semibold text-gray-800 mt-1">
            {ride?.pickup || "Not specified"}
          </p>
        </div>

        <div className="bg-gray-50 px-4 rounded-lg">
          <p className="text-sm text-gray-500">Destination</p>
          <p className="font-semibold text-gray-800 mt-1">
            {ride?.destination || "Not specified"}
          </p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Fare</p>
          <p className="font-bold text-green-600 text-xl mt-1">
            ₹{ride?.fare || "--"}
          </p>
        </div>
      </div>

      {/* Loading Animation */}
      <div className="flex justify-center">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </motion.div>
  );
};

export default WaitforDriver;











