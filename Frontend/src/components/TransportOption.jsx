

import React from "react";
import { motion } from "framer-motion";
import { RiArrowDownLine } from "react-icons/ri";

const TransportOption = ({
  setTransport,
  setConfirmride,
  setVehicleType,
  fare,
}) => {
  const vehicleOptions = [
    {
      type: "car",
      name: "UberGo",
      description: "Comfortable ride",
      price: fare.car,
      icon: "🚗",
      color: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      type: "motorcycle",
      name: "UberMotor",
      description: "Fast and affordable",
      price: fare.motorcycle,
      icon: "🏍️",
      color: "bg-amber-100",
      textColor: "text-amber-600",
    },
    {
      type: "auto",
      name: "UberAuto",
      description: "Budget friendly",
      price: fare.auto,
      icon: "🛺",
      color: "bg-emerald-100",
      textColor: "text-emerald-600",
    },
  ];

  const handleSelect = (type) => {
    setVehicleType(type);
    setConfirmride(true);
  };

  return (
    <div
     
      className="relative w-full max-w-2xl mx-auto inset-0 bg-white h-full  p-1 flex flex-col"
    >
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <button
          onClick={() => setTransport(false)}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <RiArrowDownLine size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Choose your ride</h1>
      </div>

      {/* Vehicle Options */}
      <div className="space-y-4 overflow-y-auto flex-1">
        {vehicleOptions.map((vehicle, index) => (
          <motion.div
            key={vehicle.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(vehicle.type)}
            className={`flex items-center p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all cursor-pointer`}
          >
            <div
              className={`w-14 h-14 ${vehicle.color} rounded-full flex items-center justify-center mr-4`}
            >
              <span className="text-2xl">{vehicle.icon}</span>
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
              <p className="text-sm text-gray-500">{vehicle.description}</p>
            </div>

            <div className={`font-bold ${vehicle.textColor}`}>
              ₹{vehicle.price}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TransportOption;
