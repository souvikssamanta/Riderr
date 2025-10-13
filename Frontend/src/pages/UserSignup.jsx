


import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { toast } from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowRight,
  FiCheck,
  FiStar,
  FiShield,
  FiZap,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

function UserSignup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newUser = {
      fullname: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/register`,
        newUser
      );
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        toast.success("Welcome to RideShare! 🎉");
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
  };

  const googleSignup = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      let user = data.user;
      let name = user.displayName;
      const parts = name.trim().split(" ");
      let firstname = parts[0];
      let lastname = parts[1];
      let email = user.email;
      const newUser = {
        firstname,
        lastname,
        email,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/google-register`,
        newUser
      );

      if (response.status === 201) {
        const googledata = response.data;
        setUser(googledata.user);
        localStorage.setItem("token", googledata.token);
        toast.success("Welcome to RideShare! 🎉");
        navigate("/home");
      }
    } catch (error) {
      console.error("Google signup failed", error);
      toast.error("Google signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-12 z-10">
        {/* Left Section - Brand & Benefits */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <div className="max-w-md mx-auto lg:mx-0">
            {/* Brand */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-white text-xl font-semibold">
                RideShare
              </span>
            </div>

            {/* Hero Section */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Start Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Journey
              </span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Join thousands of users who trust RideShare for safe, reliable,
              and affordable rides across the city.
            </p>

            {/* Benefits Grid */}
            <div className="space-y-4 mb-8">
              {[
                { icon: FiZap, text: "Instant ride matching" },
                { icon: FiShield, text: "Secure & verified drivers" },
                { icon: FiStar, text: "5-star rated service" },
                { icon: FiCheck, text: "24/7 customer support" },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <benefit.icon className="text-blue-400" />
                  </div>
                  <span className="text-sm">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-slate-300 text-sm italic mb-2">
                "RideShare made my daily commute so much easier. The app is
                intuitive and drivers are always professional!"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                <span className="text-slate-400 text-sm">Sarah M.</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FiUser className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Create Account
                </h2>
                <p className="text-slate-300">Join RideShare today</p>
              </div>

              <form onSubmit={submitHandler} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-slate-300"
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        required
                        id="firstname"
                        type="text"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Last Name
                    </label>
                    <input
                      required
                      id="lastname"
                      type="text"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                    <input
                      required
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                    <input
                      required
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 flex items-center justify-center ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account <FiArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Social Signup */}
              <div className="mt-8">
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-transparent text-sm text-slate-400">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={googleSignup}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:bg-white/10 transition-all duration-200 hover:border-white/20"
                >
                  <FcGoogle className="text-xl" />
                  <span className="font-medium">Google</span>
                </motion.button>
              </div>

              {/* Login Link */}
              <div className="mt-8 text-center">
                <p className="text-slate-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UserSignup;




