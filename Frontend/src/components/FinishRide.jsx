

import React from "react";
import { motion } from "framer-motion";
import { IoAlertCircleOutline, IoCheckmarkDone } from "react-icons/io5";
import { FaMapMarkerAlt, FaMoneyBillWave, FaUserFriends } from "react-icons/fa";

const FinishRide = ({ setFinishRidePanel, ride, finshRide }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", damping: 25 }}
      className=" inset-0 top-auto h-auto max-h-[90vh] bg-white rounded-t-3xl shadow-xl p-6 z-50"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Complete Your Ride</h1>
        <button
          onClick={() => setFinishRidePanel(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Ride Details */}
      <div className="space-y-6">
        {/* Locations */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-start gap-3 mb-4">
            <FaMapMarkerAlt className="text-fuchsia-600 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Pickup Location</p>
              <p className="font-semibold text-gray-800">
                {ride?.pickup || "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-amber-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-semibold text-gray-800">
                {ride?.destination || "Not specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Fare and Passengers */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-green-500" />
              <p className="text-sm text-gray-500">Fare</p>
            </div>
            <p className="text-xl font-bold text-gray-800 mt-1">
              ₹{ride?.fare || "--"}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <FaUserFriends className="text-blue-500" />
              <p className="text-sm text-gray-500">Passengers</p>
            </div>
            <p className="text-xl font-bold text-gray-800 mt-1">2</p>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
          <IoAlertCircleOutline className="text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            Please confirm payment has been received before finishing the ride
          </p>
        </div>

        {/* Finish Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            finshRide();
          }}
          className="w-full py-3 bg-gradient-to-r from-fuchsia-600 to-amber-500 text-white font-medium rounded-xl shadow-md flex items-center justify-center gap-2"
        >
          <IoCheckmarkDone size={20} />
          Finish Ride
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FinishRide;



