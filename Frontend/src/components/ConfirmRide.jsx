// import React from 'react'
// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion';

// const ConfirmRide = (props) => {
//   return (
//     <div>
//       <motion.div
       
//         className="flex flex-col items-center px-6 py-8 gap-5 max-w-md mx-auto bg-white rounded-3xl top-5 shadow-lg"
//       >
       
//         <h1
//           className="text-2xl font-bold % text-green-600 text-center"
         
//         >
//          Confirm Your Ride
//         </h1>
//         <div
//           className="w-full flex flex-col gap-4"
          
//         >
//           <div
//             className="bg-gray-100 rounded-xl p-4 shadow"
            
//           >
//             <p className="text-lg font-semibold text-green-600 text-center">Pickup Location</p>
//             <p className="text-base text-center font-bold mt-2">{props.pickup}</p>
//           </div>
//           <div
//             className="bg-gray-100 rounded-xl p-4 shadow"
           
//           >
//             <p className="text-lg font-semibold text-green-600 text-center">Destination</p>
//             <p className="text-base text-center font-bold mt-2">{props.destination}</p>
//           </div>
//           <div
//             className="bg-gray-100 rounded-xl p-4 shadow"
            
//           >
//             <p className="text-lg font-semibold text-green-600 text-center">Fare</p>
//             <p className="text-xl bg-amber-300 rounded-full text-center font-bold mt-2 py-2">
//               ₹{props.fare[props.vehicleType]}
//             </p>
//           </div>
//         </div>
//         <div
//           className="flex justify-center w-full"
         
//         >
//           <button
//             onClick={() => {
//               props.createRide();
//               props.setDriver(true);
//               props.setConfirmride(false);
//             }}
//             className="bg-green-500 hover:bg-green-600 transition-colors text-white text-lg font-semibold px-8 py-2 rounded-xl shadow-lg"
//           >
//             Confirm Ride
//           </button>
//         </div>
//         <p
//           className="text-gray-500 text-center mt-1"
          
//         >
//           Your driver will be assigned shortly. Enjoy your ride!
//         </p>
//       </motion.div>
    
//        </div>
  
//   );
// }

// export default ConfirmRide



import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  MapPin,
  Navigation,
  CreditCard,
  Shield,
} from "lucide-react";

const ConfirmRide = (props) => {
  const vehicleTypes = {
    motorcyle: { name: "Bike", icon: "🏍️" },
    car: { name: "Car", icon: "🚗" },
    auto: { name: "Premium", icon: "🚙" },
  };

  const features = [
    { icon: <Shield className="w-4 h-4" />, text: "Safe & Secure" },
    { icon: <CreditCard className="w-4 h-4" />, text: "Cashless Payment" },
    { icon: <CheckCircle className="w-4 h-4" />, text: "Instant Booking" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-white to-cyan-50 flex items-center justify-center p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg"
        >
          {/* Header Card */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="bg-white backdrop-blur-5xl rounded-3xl shadow-2xl shadow-green-100/50 border border-green-100 overflow-hidden mb-6"
          >
            {/* Premium Gradient Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8" />
              </motion.div>
              <h1 className="text-2xl font-bold text-center mb-2">
                Confirm Your Ride
              </h1>
              <p className="text-green-100 text-center text-sm">
                Review your trip details and confirm booking
              </p>
            </div>

            {/* Ride Details */}
            <div className="p-6 space-y-4">
              {/* Vehicle Selection */}
              <motion.div
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-600">
                    SELECTED VEHICLE
                  </span>
                  <span className="text-xl">
                    {props.vehicleType}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-800">
                   Fare:
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    ₹{props.fare[props.vehicleType]}
                  </span>
                </div>
              </motion.div>

              {/* Route Details */}
              <motion.div
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                {/* Pickup */}
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <Navigation className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-600 mb-1">
                      PICKUP LOCATION
                    </p>
                    <p className="text-gray-800 font-medium leading-tight">
                      {props.pickup}
                    </p>
                  </div>
                </div>

                {/* Destination */}
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mt-1">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-orange-600 mb-1">
                      DESTINATION
                    </p>
                    <p className="text-gray-800 font-medium leading-tight">
                      {props.destination}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center gap-6 py-4"
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    {feature.icon}
                    <span className="text-xs font-medium">{feature.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Action Section */}
            <div className="bg-gray-50 border-t border-gray-200 p-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  props.createRide();
                  props.setDriver(true);
                  props.setConfirmride(false);
                }}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-200 transition-all duration-200 flex items-center justify-center gap-3"
              >
                <CheckCircle className="w-5 h-5" />
                CONFIRM RIDE
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 text-center text-sm mt-4 flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4 text-green-500" />
                Your driver will be assigned shortly. Enjoy your ride!
              </motion.p>
            </div>
          </motion.div>

          {/* Additional Info Card */}
         
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ConfirmRide;






