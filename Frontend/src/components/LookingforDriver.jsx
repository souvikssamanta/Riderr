

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiArrowDownLine,
  RiUserLocationLine,
  RiMapPinLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";
import { FaCar, FaMotorcycle, FaRocketchat } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

const LookingforDriver = ({
  setDriver,
  pickup,
  destination,
  fare,
  vehicleType,
}) => {
  const [dots, setDots] = useState(0);
  const [eta, setEta] = useState(5); // Estimated time in minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev < 3 ? prev + 1 : 0));
    }, 500);

    const etaTimer = setInterval(() => {
      setEta((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000); // Decrease ETA every minute

    return () => {
      clearInterval(timer);
      clearInterval(etaTimer);
    };
  }, []);

  const vehicleIcons = {
    car: <FaCar className="text-blue-500 text-3xl" />,
    motorcycle: <FaMotorcycle className="text-orange-500 text-3xl" />,
    auto: <FaRocketchat className="text-green-500 text-3xl" />,
  };

  const vehicleNames = {
    car: "Premium Car",
    motorcycle: "Bike",
    auto: "Auto Rickshaw",
  };

  return (
    <div>
      <div
       
        className="  top-auto h-auto max-h-[100vh] bg-gradient-to-br from-white to-gray-50 rounded-t-3xl shadow-2xl px-6  py-8 z-50 "
      >
        {/* Close Button */}
        <button
          onClick={() => setDriver(false)}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <RiArrowDownLine size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h1
            
            className="text-3xl font-bold text-gray-800 mb-2 mt-3"
          >
            Finding Your {vehicleNames[vehicleType] || "Ride"}
          </h1>

          <p
            
            className="text-gray-500 mt-3"
          >
            Searching for nearby drivers{".".repeat(dots)}
          </p>
        </div>

        {/* Vehicle Card */}
        <div
          
          className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {vehicleIcons[vehicleType] || vehicleIcons.car}
              <div>
                <h3 className="font-bold text-gray-800">
                  {vehicleNames[vehicleType] || "Premium Car"}
                </h3>
                <p className="text-sm text-gray-500">Standard ride</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Estimated fare</p>
              <p className="text-xl font-bold text-amber-600">
                ₹{fare[vehicleType]}
              </p>
            </div>
          </div>
        </div>

        

        {/* Location Details */}
        <div
        
          className="space-y-5 mb-25 mt-12"
        >
          <div className="flex items-start gap-3">
            <RiUserLocationLine className="text-green-500 text-xl mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Pickup location</p>
              <p className="font-medium text-gray-800">{pickup}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RiMapPinLine className="text-red-500 text-xl mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-medium text-gray-800">{destination}</p>
            </div>
          </div>
        </div>

        {/* Animated Loading */}
        <div
          
          className="flex flex-col items-center"
        >
          <div className="relative w-16 h-16 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-full border-4 border-blue-200 border-t-blue-500 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <RiMoneyDollarCircleLine className="text-blue-500 text-2xl" />
            </div>
          </div>
          <p className="text-sm text-black mt-5">
            Matching you with the best driver
          </p>
        </div>
      </div>
    </div>
  );
};

export default LookingforDriver;



