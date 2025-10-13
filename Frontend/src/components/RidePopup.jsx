
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



// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FaCheck,
//   FaTimes,
//   FaUserFriends,
//   FaMapMarkerAlt,
//   FaMoneyBillWave,
// } from "react-icons/fa";

// const RidePopup = ({
//   setRidePopup,
//   ride,
//   confirmRide,
//   setConfirmRidePopup,
// }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="bg-white rounded-xl shadow-lg max-w-sm w-full overflow-hidden"
//       >
//         {/* Header */}
//         <div className="bg-slate-800 px-6 py-4 border-b border-slate-200">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold text-white">Ride Request</h2>
//             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//           </div>
//           <p className="text-slate-300 text-sm mt-1">New passenger request</p>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6">
//           {/* Location Info */}
//           <div className="space-y-4">
//             <div className="flex items-start gap-3">
//               <div className="bg-blue-50 p-2 rounded-lg">
//                 <FaMapMarkerAlt className="text-blue-600" size={16} />
//               </div>
//               <div className="flex-1">
//                 <p className="text-slate-500 text-sm font-medium">Pickup</p>
//                 <p className="text-slate-800 font-medium leading-tight">
//                   {ride?.pickup || "Not specified"}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <div className="bg-green-50 p-2 rounded-lg">
//                 <FaMapMarkerAlt className="text-green-600" size={16} />
//               </div>
//               <div className="flex-1">
//                 <p className="text-slate-500 text-sm font-medium">
//                   Destination
//                 </p>
//                 <p className="text-slate-800 font-medium leading-tight">
//                   {ride?.destination || "Not specified"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Fare and Passengers */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-slate-50 rounded-lg p-3 text-center">
//               <FaMoneyBillWave className="text-green-600 mx-auto mb-2" />
//               <p className="text-slate-500 text-sm">Fare</p>
//               <p className="font-semibold text-slate-800">
//                 ₹{ride?.fare || "--"}
//               </p>
//             </div>
//             <div className="bg-slate-50 rounded-lg p-3 text-center">
//               <FaUserFriends className="text-blue-600 mx-auto mb-2" />
//               <p className="text-slate-500 text-sm">Passengers</p>
//               <p className="font-semibold text-slate-800">2</p>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="px-6 pb-6">
//           <div className="flex gap-3">
//             <button
//               onClick={() => setRidePopup(false)}
//               className="flex-1 flex items-center justify-center gap-2 py-3 text-slate-600 font-medium hover:bg-slate-100 transition-colors border border-slate-300 rounded-lg"
//             >
//               <FaTimes size={14} />
//               Decline
//             </button>
//             <button
//               onClick={() => {
//                 confirmRide();
//                 setConfirmRidePopup(true);
//               }}
//               className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors rounded-lg"
//             >
//               <FaCheck size={14} />
//               Accept
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default RidePopup;










