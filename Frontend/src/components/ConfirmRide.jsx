import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

const ConfirmRide = (props) => {
  return (
    <div>
      <motion.div
       
        className="flex flex-col items-center px-6 py-8 gap-5 max-w-md mx-auto bg-white rounded-3xl top-5 shadow-lg"
      >
       
        <h1
          className="text-2xl font-bold % text-green-600 text-center"
         
        >
         Confirm Your Ride
        </h1>
        <div
          className="w-full flex flex-col gap-4"
          
        >
          <div
            className="bg-gray-100 rounded-xl p-4 shadow"
            
          >
            <p className="text-lg font-semibold text-green-600 text-center">Pickup Location</p>
            <p className="text-base text-center font-bold mt-2">{props.pickup}</p>
          </div>
          <div
            className="bg-gray-100 rounded-xl p-4 shadow"
           
          >
            <p className="text-lg font-semibold text-green-600 text-center">Destination</p>
            <p className="text-base text-center font-bold mt-2">{props.destination}</p>
          </div>
          <div
            className="bg-gray-100 rounded-xl p-4 shadow"
            
          >
            <p className="text-lg font-semibold text-green-600 text-center">Fare</p>
            <p className="text-xl bg-amber-300 rounded-full text-center font-bold mt-2 py-2">
              ₹{props.fare[props.vehicleType]}
            </p>
          </div>
        </div>
        <div
          className="flex justify-center w-full"
         
        >
          <button
            onClick={() => {
              props.createRide();
              props.setDriver(true);
              props.setConfirmride(false);
            }}
            className="bg-green-500 hover:bg-green-600 transition-colors text-white text-lg font-semibold px-8 py-2 rounded-xl shadow-lg"
          >
            Confirm Ride
          </button>
        </div>
        <p
          className="text-gray-500 text-center mt-1"
          
        >
          Your driver will be assigned shortly. Enjoy your ride!
        </p>
      </motion.div>
    
       </div>
  
  );
}

export default ConfirmRide
