
import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { FaCarAlt, FaPhoneAlt } from "react-icons/fa";
import { IoPersonOutline, IoCarSportOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  if (!captain || !captain.fullname) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading driver information...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto  px-2 flex flex-col   md:px-8 bg-white rounded-xl shadow-lg"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-4 text-white">
          <h1 className="text-2xl font-bold">Driver Profile</h1>
          <p className="text-blue-100">Vehicle and contact information</p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <IoPersonOutline className="mr-2 text-blue-600" />
                Personal Details
              </h2>

              <div className="flex items-center">
                <span className="text-gray-600 w-32">Name:</span>
                <span className="font-medium">
                  {captain.fullname.firstname} {captain.fullname.lastname}
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 w-32">Contact:</span>
                <span className="font-medium flex items-center">
                  <FaPhoneAlt className="mr-2 text-blue-500" />
                  {captain.contact}
                </span>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <IoCarSportOutline className="mr-2 text-blue-600" />
                Vehicle Details
              </h2>

              <div className="flex items-center">
                <span className="text-gray-600 w-32">License:</span>
                <span className="font-medium">{captain.vehicle.License}</span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 w-32">Plate No:</span>
                <span className="font-medium flex items-center">
                  <FaCarAlt className="mr-2 text-blue-500" />
                  {captain.vehicle.plate}
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 w-32">Vehicle Type:</span>
                <span className="font-medium capitalize">
                  {captain.vehicle.vehicleType}
                </span>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </motion.div>
  );
};

export default CaptainDetails;


