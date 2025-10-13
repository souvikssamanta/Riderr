
import React, { useContext, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { FaCarAlt, FaPhoneAlt, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import {
  IoPersonOutline,
  IoCarSportOutline,
  IoSpeedometerOutline,
} from "react-icons/io5";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CaptainDetails = () => {
  const { currentCaptain, captain } = useContext(CaptainDataContext);

  useEffect(() => {
    currentCaptain();
  }, []);

  if (!captain || !captain.fullname?.firstname) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading driver information...</div>
      </div>
    );
  }

  const stats = [
    {
      icon: <FaStar className="text-yellow-400" />,
      label: "Rating",
      value: "4.9",
    },
    {
      icon: <IoSpeedometerOutline className="text-blue-500" />,
      label: "Trips",
      value: "1.2K",
    },
    {
      icon: <FaMapMarkerAlt className="text-green-500" />,
      label: "City",
      value: "Active",
    },
  ];

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white p-6 text-center">
          <div className="flex items-center justify-center space-x-3 ">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <IoPersonOutline className="text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {captain.fullname.firstname} {captain.fullname.lastname}
              </h1>
              <p className="text-blue-100 text-sm">Professional Driver</p>
            </div>
          </div>

         
        </div>

        {/* Content */}
        <div className="p-6">
          
          {/* Personal Information */}
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
              <IoPersonOutline className="mr-2 text-blue-600 text-xl" />
              Personal Information
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-600 text-sm">Full Name</span>
                <span className="font-medium text-slate-800">
                  {captain.fullname.firstname} {captain.fullname.lastname}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-600 text-sm">Contact</span>
                <span className="font-medium text-slate-800 flex items-center">
                  <FaPhoneAlt className="mr-2 text-blue-500 text-sm" />
                  {captain.contact}
                </span>
              </div>

              
            </div>
          </motion.div>

          {/* Vehicle Information */}
          <motion.div variants={fadeInUp} transition={{ delay: 0.3 }}>
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center">
              <IoCarSportOutline className="mr-2 text-blue-600 text-xl" />
              Vehicle Details
            </h2>

            <div className="space-y-5 mb-6">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-600 text-sm">License Number</span>
                <span className="font-medium text-slate-800 font-mono">
                  {captain.vehicle.License}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-600 text-sm">Plate Number</span>
                <span className="font-medium text-slate-800 flex items-center font-mono">
                  <FaCarAlt className="mr-2 text-blue-500 text-sm" />
                  {captain.vehicle.plate}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-600 text-sm">Vehicle Type</span>
                <span className="font-medium  capitalize px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {captain.vehicle.vehicleType}
                </span>
              </div>
            </div>
          </motion.div>

         
        </div>
      </div>
    </motion.div>
  );
};

export default CaptainDetails;













