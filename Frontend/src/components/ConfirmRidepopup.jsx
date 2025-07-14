

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCheck,
  FaTimes,
  FaMoneyBillWave,
  FaUserFriends,
  FaKey,
} from "react-icons/fa";

const ConfirmRidepopup = ({
  setConfirmridepopup,
  setConfirmride,
  setRidepopup,
  ride,
}) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/rides/start-ride`,
        {
          params: { rideId: ride?._id, otp: otp },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.request.status === 200) {
        setConfirmridepopup(false);
        setRidepopup(false);
        navigate("/captain-riding", { state: { ride: ride } });
      }
    } catch (error) {
      console.error("Error confirming ride:", error);
      // Handle error (show toast message, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
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
          <h2 className="text-xl font-bold text-center">Confirm Your Ride</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Ride Info */}
          <div className=" justify-between bg-gray-50 gap-10 flex flex-row p-2 rounded-lg">
            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-green-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Fare</p>
                <p className="font-bold text-gray-800">₹{ride?.fare || "--"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
             
              <div>
                <p className="text-sm text-gray-500">Destination</p>
                <p className="font-bold text-gray-800">{ride?.destination || "--"}</p>
              </div>
            </div>
          </div>

          {/* OTP Input */}
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-gray-700 mb-2">
                <FaKey className="text-amber-500" />
                <span>Enter OTP from passenger</span>
              </label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                type="text"
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-center text-lg font-semibold"
                maxLength="6"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setConfirmridepopup(false);
                  setConfirmride(false);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-red-500 font-medium hover:bg-red-50 transition-colors border border-red-300 rounded-lg"
              >
                <FaTimes /> Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className={`flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-fuchsia-600 to-amber-500 text-white font-medium hover:opacity-90 transition-opacity rounded-lg ${
                  isLoading || otp.length !== 6
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FaCheck /> Confirm
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmRidepopup;










