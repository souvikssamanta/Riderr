
import React from "react";
import { motion } from "framer-motion";
import {
  FaCheck,
  FaTimes,
  FaUserFriends,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";


const RidePopup = ({
  setRidepopup,
  ride,
  confirmRide,
 
  setConfirmridepopup,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", damping: 20 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-fuchsia-600 to-amber-500 p-4 text-white">
          <h2 className="text-xl font-bold text-center">New Ride Request!</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Location Info */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-fuchsia-600 mt-1 text-lg" />
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pickup Location
                </p>
                <p className="font-semibold text-gray-800">
                  {ride?.pickup || "Not specified"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-amber-500 mt-1 text-lg" />
              <div>
                <p className="text-sm font-medium text-gray-500">Destination</p>
                <p className="font-semibold text-gray-800">
                  {ride?.destination || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Fare and Passengers */}
          <div className="flex gap-6 pt-2">
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-green-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Fare</p>
                <p className="font-bold text-gray-800">₹{ride?.fare || "--"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaUserFriends className="text-blue-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Passengers</p>
                <p className="font-bold text-gray-800">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex border-t border-gray-200">
          <button
            onClick={() => {
              
            setRidepopup(false);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-red-500 font-medium hover:bg-red-50 transition-colors"
          >
            <FaTimes /> Ignore
          </button>
          <div className="w-px bg-gray-200"></div>
          <button
            onClick={() => {
              confirmRide();
              setConfirmridepopup(true);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-fuchsia-600 to-amber-500 text-white font-medium hover:opacity-90 transition-opacity"
          >
            <FaCheck /> Accept
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RidePopup;














