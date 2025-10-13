

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



// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Clock, Users, Shield, Zap, Check } from "lucide-react";

// const TransportOption = ({
//   setTransport,
//   setConfirmride,
//   setVehicleType,
//   fare,
// }) => {
//   const vehicleOptions = [
//     {
//       type: "car",
//       name: "UberGo",
//       description: "Affordable everyday rides",
//       price: fare.car,
//       icon: "🚗",
//       color: "from-purple-500 to-blue-500",
//       bgColor: "bg-purple-50",
//       borderColor: "border-purple-200",
//       features: ["4 seats", "AC", "Budget friendly"],
//       eta: "2-4 min",
//       popularity: "Most popular",
//     },
//     {
//       type: "motorcycle",
//       name: "UberMotor",
//       description: "Fast through traffic",
//       price: fare.motorcycle,
//       icon: "🏍️",
//       color: "from-amber-500 to-orange-500",
//       bgColor: "bg-amber-50",
//       borderColor: "border-amber-200",
//       features: ["1 seat", "Fastest", "Economical"],
//       eta: "1-3 min",
//       popularity: "Quickest",
//     },
//     {
//       type: "auto",
//       name: "UberAuto",
//       description: "Budget-friendly option",
//       price: fare.auto,
//       icon: "🛺",
//       color: "from-emerald-500 to-green-500",
//       bgColor: "bg-emerald-50",
//       borderColor: "border-emerald-200",
//       features: ["3 seats", "Open air", "Low cost"],
//       eta: "3-5 min",
//       popularity: "Economical",
//     },
//   ];

//   const handleSelect = (type) => {
//     setVehicleType(type);
//     setConfirmride(true);
//   };

//   const benefits = [
//     { icon: <Shield className="w-4 h-4" />, text: "Safe rides" },
//     { icon: <Clock className="w-4 h-4" />, text: "On-time" },
//     { icon: <Zap className="w-4 h-4" />, text: "Quick pickup" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-200 overflow-hidden"
//       >
//         {/* Header */}
//         <div className="bg-gradient-to-r from-gray-900 to-blue-900 p-6 text-white relative overflow-hidden">
//           {/* Background Pattern */}
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
//             <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
//           </div>

//           <div className="relative z-10">
//             <div className="flex items-center justify-between mb-4">
//               <h1 className="text-2xl font-bold">Choose Your Ride</h1>
//               <button
//                 onClick={() => setTransport(false)}
//                 className="p-2 hover:bg-white/10 rounded-xl transition-colors"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//             <p className="text-blue-100">
//               Select the perfect ride for your journey
//             </p>

//             {/* Benefits */}
//             <div className="flex gap-4 mt-4">
//               {benefits.map((benefit, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="flex items-center gap-2 text-blue-200 text-sm"
//                 >
//                   {benefit.icon}
//                   <span>{benefit.text}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Vehicle Options */}
//         <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
//           <AnimatePresence>
//             {vehicleOptions.map((vehicle, index) => (
//               <motion.div
//                 key={vehicle.type}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => handleSelect(vehicle.type)}
//                 className={`relative p-5 ${vehicle.bgColor} border-2 ${vehicle.borderColor} rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-lg group`}
//               >
//                 {/* Popularity Badge */}
//                 {vehicle.popularity && (
//                   <div
//                     className={`absolute -top-2 left-4 px-3 py-1 bg-gradient-to-r ${vehicle.color} text-white text-xs font-semibold rounded-full`}
//                   >
//                     {vehicle.popularity}
//                   </div>
//                 )}

//                 <div className="flex items-center justify-between">
//                   {/* Left Section - Vehicle Info */}
//                   <div className="flex items-center gap-4 flex-1">
//                     <div
//                       className={`w-16 h-16 bg-gradient-to-br ${vehicle.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
//                     >
//                       <span className="text-2xl">{vehicle.icon}</span>
//                     </div>

//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-1">
//                         <h3 className="font-bold text-gray-900 text-lg">
//                           {vehicle.name}
//                         </h3>
//                         <div className="flex items-center gap-1 text-sm text-gray-500">
//                           <Clock className="w-4 h-4" />
//                           <span>{vehicle.eta}</span>
//                         </div>
//                       </div>
//                       <p className="text-gray-600 text-sm mb-2">
//                         {vehicle.description}
//                       </p>

//                       {/* Features */}
//                       <div className="flex gap-3">
//                         {vehicle.features.map((feature, idx) => (
//                           <div
//                             key={idx}
//                             className="flex items-center gap-1 text-xs text-gray-500"
//                           >
//                             <Check className="w-3 h-3 text-green-500" />
//                             {feature}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Section - Price */}
//                   <div className="text-right ml-4">
//                     <div className="mb-1">
//                       <span className="text-2xl font-bold text-gray-900">
//                         ₹{vehicle.price}
//                       </span>
//                     </div>
//                     <div className="text-xs text-gray-500">for this trip</div>

//                     {/* Select Indicator */}
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       whileHover={{ scale: 1 }}
//                       className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
//                     >
//                       <Check className="w-4 h-4 text-white" />
//                     </motion.div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         {/* Footer */}
//         <div className="border-t border-gray-200 p-6 bg-gray-50">
//           <div className="flex items-center justify-between text-sm text-gray-600">
//             <div className="flex items-center gap-2">
//               <Shield className="w-4 h-4 text-green-500" />
//               <span>All rides include insurance</span>
//             </div>
//             <div className="text-right">
//               <div className="text-xs text-gray-500">
//                 Prices may vary based on
//               </div>
//               <div className="text-xs text-gray-500">demand and traffic</div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default TransportOption;




















