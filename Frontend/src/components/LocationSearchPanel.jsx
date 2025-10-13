

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const LocationSearchPanel = ({
  suggestions,
  setPickup,
  setDestination,
  setTransport,
  setPannelOpen,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
    setPannelOpen(false); // Optional: auto-close panel
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      {suggestions.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No suggestions found</p>
      )}

      <AnimatePresence>
        {suggestions.map((elem, idx) => (
          <motion.div
            key={elem + idx}
            onClick={() => handleSuggestionClick(elem)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 bg-white hover:bg-gray-100 transition-colors border border-gray-300 rounded-xl p-3 shadow-sm mb-3 cursor-pointer"
          >
            <i className="ri-map-pin-line text-lg text-blue-500"></i>
            <span className="text-gray-800 text-base font-medium truncate">
              {elem}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LocationSearchPanel;



// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MapPin, Navigation, Clock, Star, X } from "lucide-react";

// const LocationSearchPanel = ({
//   suggestions,
//   setPickup,
//   setDestination,
//   setTransport,
//   setPannelOpen,
//   activeField,
// }) => {
//   const handleSuggestionClick = (suggestion) => {
//     if (activeField === "pickup") {
//       setPickup(suggestion);
//     } else if (activeField === "destination") {
//       setDestination(suggestion);
//     }
//     setPannelOpen(false);
//   };

//   // Mock recent searches data
//   const recentSearches = [
//     "Central Business District",
//     "Airport Terminal 1",
//     "Shopping Mall Downtown",
//   ];

//   // Mock popular destinations
//   const popularDestinations = [
//     { name: "City Center", rating: 4.8, type: "Popular" },
//     { name: "Tech Park", rating: 4.6, type: "Business" },
//     { name: "Beach Front", rating: 4.9, type: "Leisure" },
//   ];

//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6 text-white"
//       >
//         <div className="flex items-center justify-between mb-2">
//           <h2 className="text-xl font-bold flex items-center gap-2">
//             <MapPin className="w-5 h-5" />
//             {activeField === "pickup" ? "Pickup Location" : "Destination"}
//           </h2>
//           <button
//             onClick={() => setPannelOpen(false)}
//             className="p-1 hover:bg-white/20 rounded-lg transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         <p className="text-blue-100 text-sm">
//           {activeField === "pickup"
//             ? "Where would you like to be picked up?"
//             : "Where are you heading?"}
//         </p>
//       </motion.div>

//       {/* Main Content */}
//       <div className="bg-white rounded-b-2xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto">
//         {/* Search Results Section */}
//         {suggestions.length > 0 && (
//           <div className="p-4 border-b border-gray-100">
//             <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
//               <Navigation className="w-4 h-4" />
//               Search Results
//             </h3>
//             <AnimatePresence>
//               <div className="space-y-2">
//                 {suggestions.map((elem, idx) => (
//                   <motion.div
//                     key={elem + idx}
//                     onClick={() => handleSuggestionClick(elem)}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ duration: 0.2, delay: idx * 0.03 }}
//                     whileHover={{ scale: 1.01, x: 4 }}
//                     className="flex items-center gap-4 p-3 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-200 cursor-pointer group"
//                   >
//                     <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
//                       <MapPin className="w-5 h-5 text-white" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-gray-800 font-medium truncate">
//                         {elem}
//                       </p>
//                       <p className="text-gray-500 text-sm truncate">
//                         {elem.split(",")[0]} • Nearby locations
//                       </p>
//                     </div>
//                     <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </AnimatePresence>
//           </div>
//         )}

//         {/* No Results State */}
//         {suggestions.length === 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="p-8 text-center"
//           >
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <MapPin className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-600 mb-2">
//               No locations found
//             </h3>
//             <p className="text-gray-500 text-sm">
//               Try searching with different keywords or check your spelling
//             </p>
//           </motion.div>
//         )}

//         {/* Recent Searches */}
//         <div className="p-4 border-b border-gray-100">
//           <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
//             <Clock className="w-4 h-4" />
//             Recent Searches
//           </h3>
//           <div className="space-y-2">
//             {recentSearches.map((search, idx) => (
//               <motion.div
//                 key={search}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: idx * 0.1 }}
//                 onClick={() => handleSuggestionClick(search)}
//                 className="flex items-center gap-3 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
//               >
//                 <Clock className="w-4 h-4" />
//                 <span className="text-sm font-medium">{search}</span>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Popular Destinations */}
//         <div className="p-4">
//           <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
//             <Star className="w-4 h-4" />
//             Popular Destinations
//           </h3>
//           <div className="grid gap-3">
//             {popularDestinations.map((destination, idx) => (
//               <motion.div
//                 key={destination.name}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: idx * 0.1 }}
//                 onClick={() => handleSuggestionClick(destination.name)}
//                 className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-purple-50 border border-gray-200 rounded-xl cursor-pointer group transition-all duration-200"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
//                     <Star className="w-4 h-4 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-800">
//                       {destination.name}
//                     </p>
//                     <p className="text-xs text-gray-500 flex items-center gap-1">
//                       <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">
//                         {destination.type}
//                       </span>
//                       <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                       {destination.rating}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="opacity-0 group-hover:opacity-100 transition-opacity">
//                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
//                     <MapPin className="w-3 h-3 text-white" />
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Footer Help Text */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//         className="mt-4 text-center"
//       >
//         <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
//           <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//           Enter exact address for best results
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default LocationSearchPanel;










