
import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { toast } from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";

import { motion } from "framer-motion";
import {
  FiLogIn,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiUser,
  FiMapPin,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

function CaptainLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const CaptainData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/captains/login`,
        CaptainData
      );

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
        toast.success("Welcome back, Captain!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignin = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      let captain = data.user;
      let name = captain.displayName;
      const parts = name.trim().split(" ");
      let firstname = parts[0];
      let lastname = parts[1];
      let email = captain.email;
      const newCaptain = {
        firstname,
        lastname,
        email,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/captains/google-login`,
        newCaptain
      );

      if (response.status === 201) {
        const googledata = response.data;
        setCaptain(googledata.user);
        localStorage.setItem("token", googledata.token);
        toast.success("Signed in successfully");
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Google signin failed", error);
      toast.error("Google signin failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-12 z-10">
        {/* Left Section - Brand & Driver Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <div className="max-w-md mx-auto lg:mx-0">
            {/* Brand */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <FiUser className="text-white text-xl" />
              </div>
              <span className="text-white text-2xl font-bold">
                RideShare Pro
              </span>
            </div>

            {/* Hero Section */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Drive with{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Confidence
              </span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Access your driver dashboard, manage your rides, and maximize your
              earnings with our professional platform.
            </p>

            {/* Driver Benefits */}
            <div className="space-y-4 mb-8">
              {[
                {
                  icon: FiDollarSign,
                  text: "Higher earnings with surge pricing",
                },
                { icon: FiMapPin, text: "Smart route optimization" },
                { icon: FiClock, text: "Flexible working hours" },
                { icon: FiUser, text: "24/7 driver support" },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <benefit.icon className="text-amber-400" />
                  </div>
                  <span className="text-sm">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-amber-400">4.8★</div>
                <div className="text-slate-400 text-sm">Driver Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">$35+/hr</div>
                <div className="text-slate-400 text-sm">Average Earnings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">24/7</div>
                <div className="text-slate-400 text-sm">Support</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Login Form */}
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
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FiUser className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Captain Login
                </h2>
                <p className="text-slate-300">
                  Sign in to your driver dashboard
                </p>
              </div>

              <form onSubmit={submitHandler} className="space-y-6">
                {/* Email Input */}
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
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      placeholder="captain@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Password
                    </label>
                    <Link
                      to="/captain-forgetpassword"
                      className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
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
                      ? "bg-amber-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In <FiArrowRight className="ml-2" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Social Login */}
              <div className="mt-8">
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-transparent text-sm text-slate-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={googleSignin}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:bg-white/10 transition-all duration-200 hover:border-white/20"
                >
                  <FcGoogle className="text-xl" />
                  <span className="font-medium">Google</span>
                </motion.button>
              </div>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-slate-400">
                  New to our platform?{" "}
                  <Link
                    to="/captain-signup"
                    className="font-medium text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Become a Captain
                  </Link>
                </p>
              </div>

              {/* Alternative Login */}
              <div className="mt-6 p-4 bg-amber-500/10 rounded-xl border border-amber-400/20">
                <Link
                  to="/login"
                  className="flex items-center justify-center text-amber-400 hover:text-amber-300 transition-colors font-medium text-sm"
                >
                  Looking for rider login? Click here
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CaptainLogin;




  


