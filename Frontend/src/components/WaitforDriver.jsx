
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



// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   X,
//   Car,
//   User,
//   Shield,
//   MapPin,
//   Navigation,
//   Clock,
//   Phone,
//   MessageCircle,
//   Star,
//   CheckCircle,
// } from "lucide-react";

// const WaitforDriver = ({ setWaitforDriver, ride }) => {
//   const driverInfo = {
//     name: ride?.captain?.fullname?.firstname || "Loading...",
//     rating: 4.8,
//     trips: 1247,
//     phone: "+1 (555) 123-4567",
//     vehicle: {
//       plate: ride?.captain?.vehicle?.plate || "----",
//       type: ride?.captain?.vehicle?.vehicleType || "----",
//       model: "Toyota Camry",
//       color: "White",
//     },
//     eta: "4 min",
//     distance: "1.2 km away",
//   };

//   return (
//     <div className=" bg-gradient-to-br from-blue-50 via-white to-green-200 flex  justify-center p-4 sm:items-center">
//       {/* Backdrop */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         onClick={() => setWaitforDriver(false)}
//         className=" bg-black/20 backdrop-blur-sm z-40"
//       />

//       {/* Main Panel */}
//       <motion.div
//         initial={{ opacity: 0, y: 100 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 100 }}
//         transition={{ type: "spring", damping: 25 }}
//         className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl shadow-gray-400/20 border border-gray-200 z-50 overflow-hidden"
//       >
//         {/* Header with Gradient */}
//         <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white relative overflow-hidden">
//           {/* Background Pattern */}
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
//             <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
//           </div>

//           <div className="relative z-10">
//             {/* Close Button */}
//             <button
//               onClick={() => setWaitforDriver(false)}
//               className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-xl transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             {/* Main Header */}
//             <div className="text-center mb-2">
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center mx-auto mb-4"
//               >
//                 <Navigation className="w-8 h-8" />
//               </motion.div>
//               <h1 className="text-2xl font-bold mb-2">Driver On The Way!</h1>
//               <p className="text-green-100">
//                 Please wait at your pickup location
//               </p>
//             </div>

//             {/* ETA Badge */}
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.3 }}
//               className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center gap-2 mx-auto"
//             >
//               <Clock className="w-4 h-4" />
//               <span className="font-semibold">
//                 Arriving in {driverInfo.eta}
//               </span>
//             </motion.div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6">
//           {/* Driver Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm"
//           >
//             <div className="flex items-center gap-4 mb-4">
//               {/* Driver Avatar */}
//               <div className="relative">
//                 <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
//                   <User className="w-8 h-8 text-white" />
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
//                   <CheckCircle className="w-3 h-3 text-white" />
//                 </div>
//               </div>

//               {/* Driver Info */}
//               <div className="flex-1">
//                 <div className="flex items-center gap-2 mb-1">
//                   <h3 className="font-bold text-gray-900 text-lg">
//                     {driverInfo.name}
//                   </h3>
//                   <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-full">
//                     <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
//                     <span className="text-xs font-semibold text-amber-800">
//                       {driverInfo.rating}
//                     </span>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 text-sm">
//                   {driverInfo.trips.toLocaleString()} trips •{" "}
//                   {driverInfo.distance}
//                 </p>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-2">
//                 <button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-white transition-colors">
//                   <Phone className="w-4 h-4" />
//                 </button>
//                 <button className="p-2 bg-gray-500 hover:bg-gray-600 rounded-xl text-white transition-colors">
//                   <MessageCircle className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             {/* Vehicle & OTP Info */}
//             <div className="grid grid-cols-2 gap-4">
//               {/* Vehicle Info */}
//               <div className="space-y-3">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Car className="w-4 h-4" />
//                   <span className="text-sm font-medium">Vehicle</span>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="font-bold text-gray-900 uppercase">
//                     {driverInfo.vehicle.plate}
//                   </p>
//                   <p className="text-sm text-gray-600 capitalize">
//                     {driverInfo.vehicle.type} • {driverInfo.vehicle.color}
//                   </p>
//                 </div>
//               </div>

//               {/* OTP Info */}
//               <div className="space-y-3">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Shield className="w-4 h-4" />
//                   <span className="text-sm font-medium">Verification Code</span>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="font-bold text-gray-900 text-xl">
//                     {ride?.otp || "----"}
//                   </p>
//                   <p className="text-xs text-gray-500">Share with driver</p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Ride Details */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="space-y-4"
//           >
//             {/* Pickup */}
//             <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-200">
//               <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
//                 <Navigation className="w-5 h-5 text-white" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-semibold text-green-600 mb-1">
//                   PICKUP LOCATION
//                 </p>
//                 <p className="text-gray-800 font-medium">
//                   {ride?.pickup || "Not specified"}
//                 </p>
//               </div>
//             </div>

//             {/* Destination */}
//             <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-200">
//               <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
//                 <MapPin className="w-5 h-5 text-white" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-semibold text-orange-600 mb-1">
//                   DESTINATION
//                 </p>
//                 <p className="text-gray-800 font-medium">
//                   {ride?.destination || "Not specified"}
//                 </p>
//               </div>
//             </div>

//             {/* Fare */}
//             <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-5 text-white text-center">
//               <p className="text-sm font-semibold mb-2">TOTAL FARE</p>
//               <p className="text-3xl font-bold">₹{ride?.fare || "--"}</p>
//               <p className="text-green-100 text-sm mt-1">
//                 Inclusive of all charges
//               </p>
//             </div>
//           </motion.div>

//           {/* Loading Animation */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             className="text-center"
//           >
//             <div className="flex items-center justify-center gap-3 text-gray-600">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                 className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full"
//               />
//               <span className="text-sm font-medium">
//                 Tracking driver location...
//               </span>
//             </div>
//           </motion.div>
//         </div>

//         {/* Safety Footer */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.7 }}
//           className="border-t border-gray-200 bg-gray-50 p-4"
//         >
//           <div className="flex items-center justify-center gap-2 text-gray-600">
//             <Shield className="w-4 h-4 text-green-500" />
//             <span className="text-sm">Your safety is our priority</span>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default WaitforDriver;







