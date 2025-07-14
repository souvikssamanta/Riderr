

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














