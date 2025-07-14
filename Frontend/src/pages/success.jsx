

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import { BsReceipt } from "react-icons/bs";

const Success = () => {
  const query = new URLSearchParams(useLocation().search);
  const paymentId = query.get("reference");

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4"
    >
      <motion.div
        variants={item}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex justify-center mb-6"
        >
          <FaCheckCircle className="text-green-500 text-6xl" />
        </motion.div>

        <motion.h1
          variants={item}
          className="text-3xl font-bold text-green-600 mb-3"
        >
          Payment Successful!
        </motion.h1>

        <motion.p variants={item} className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </motion.p>

        <motion.div
          variants={item}
          className="bg-green-50 rounded-lg p-4 mb-6 flex items-center justify-center gap-2"
        >
          <BsReceipt className="text-green-600" />
          <p className="text-sm font-medium">
            Transaction ID:{" "}
            <span className="text-blue-600 font-bold">{paymentId}</span>
          </p>
        </motion.div>

        <motion.div variants={item}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-md transition-all duration-300"
          >
            <FaHome /> Return to Home
          </Link>
        </motion.div>

        {/* Confetti animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -50,
                opacity: 0,
              }}
              animate={{
                y: window.innerHeight,
                opacity: [0, 1, 0],
                rotate: 360,
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                repeatDelay: Math.random() * 5,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: `hsl(${Math.random() * 60 + 100}, 80%, 60%)`,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Success;




