
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";

function CaptainSignup() {
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    contact: "",
    vehiclePlate: "",
    vehicleLicense: "",
    vehicleType: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const captainData = {
      fullname: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      email: formData.email,
      password: formData.password,
      contact: formData.contact,
      vehicle: {
        plate: formData.vehiclePlate,
        License: formData.vehicleLicense,
        vehicleType: formData.vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        toast.success("Welcome aboard! Registration successful.");
        navigate("/captain-home");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              Riderr
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Start Your Driving Journey
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join thousands of drivers earning on their own schedule with
            Riderr's premium platform
          </p>
        </motion.div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Form */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={itemVariants}
                  className="text-center mb-8"
                >
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Driver Registration
                  </h2>
                  <p className="text-slate-600 text-lg">
                    Create your driver account in minutes
                  </p>
                </motion.div>

                <form onSubmit={submitHandler} className="space-y-6">
                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <label
                        htmlFor="firstname"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        First Name
                      </label>
                      <input
                        required
                        id="firstname"
                        name="firstname"
                        type="text"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastname"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        required
                        id="lastname"
                        name="lastname"
                        type="text"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
                        placeholder="Doe"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      required
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
                      placeholder="email@example.com"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Password
                    </label>
                    <input
                      required
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
                      placeholder="••••••••"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="contact"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Contact Number
                    </label>
                    <input
                      required
                      id="contact"
                      name="contact"
                      type="text"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
                      placeholder="+1234567890"
                    />
                  </motion.div>

                  {/* Vehicle Information Section */}
                  <motion.div
                    variants={itemVariants}
                    className="pt-6 border-t border-slate-200"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-lg">🚗</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">
                        Vehicle Information
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="vehiclePlate"
                          className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                          License Plate Number
                        </label>
                        <input
                          required
                          id="vehiclePlate"
                          name="vehiclePlate"
                          type="text"
                          value={formData.vehiclePlate}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
                          placeholder="ABC 1234"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="vehicleLicense"
                          className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                          Driver's License Number
                        </label>
                        <input
                          required
                          id="vehicleLicense"
                          name="vehicleLicense"
                          type="text"
                          value={formData.vehicleLicense}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
                          placeholder="DL123456789"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="vehicleType"
                          className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                          Vehicle Type
                        </label>
                        <select
                          required
                          id="vehicleType"
                          name="vehicleType"
                          value={formData.vehicleType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50"
                        >
                          <option value="" disabled>
                            Select vehicle type
                          </option>
                          <option value="car">Car</option>
                          <option value="auto">Auto</option>
                          <option value="motorbike">Motorcycle</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>

                  <motion.button
                    variants={itemVariants}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      "Start Driving with Riderr"
                    )}
                  </motion.button>
                </form>

                <motion.div
                  variants={itemVariants}
                  className="mt-8 text-center"
                >
                  <p className="text-slate-600">
                    Already have an account?{" "}
                    <Link
                      to="/captain-login"
                      className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      Sign in here
                    </Link>
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Right side - Benefits & Illustration */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-emerald-500 items-center justify-center p-12 text-white">
              <div className="text-center max-w-md">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="text-6xl mb-6">🚗</div>
                  <h2 className="text-4xl font-bold mb-4">Drive with Riderr</h2>
                  <p className="text-blue-100 text-lg mb-8">
                    Join our elite network of professional drivers and take
                    control of your earnings.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6 text-left"
                >
                  {[
                    {
                      icon: "💰",
                      text: "Earn up to $35/hour with flexible schedules",
                    },
                    {
                      icon: "⚡",
                      text: "Instant payments with no hidden fees",
                    },
                    { icon: "🛡️", text: "24/7 support and insurance coverage" },
                    { icon: "🌟", text: "Premium riders and higher ratings" },
                    {
                      icon: "📱",
                      text: "Easy-to-use driver app with real-time navigation",
                    },
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">
                        {benefit.icon}
                      </div>
                      <span className="text-blue-50">{benefit.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm"
                >
                  <p className="text-blue-100 text-sm">
                    "Riderr helped me triple my income while maintaining
                    complete flexibility. Best decision I ever made!"
                  </p>
                  <p className="text-white font-semibold mt-2">
                    - Alex Chen, Driver since 2022
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
       
      </div>
    </div>
  );
}

export default CaptainSignup;







