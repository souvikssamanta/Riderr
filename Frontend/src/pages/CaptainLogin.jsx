
import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { toast } from "react-hot-toast";
import Logo from "../assets/RideLogo.png";
import { motion } from "framer-motion";
import {
  FiLogIn,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";

function CaptainLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
        toast.success("Logged in successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex flex-col md:flex-row items-center justify-center p-2">
      {/* Left Side - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col items-center justify-center w-1/2 p-8"
      >
        <div className="max-w-md">
          <img
            src="https://img.freepik.com/free-vector/delivery-service-with-masks-concept-illustration_114360-7853.jpg"
            alt="Driver illustration"
            className="w-full h-auto"
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-6">
            Welcome Back, Captain!
          </h2>
          <p className="text-gray-600 mt-2">
            Log in to manage your rides and connect with passengers.
          </p>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white rounded-2xl shadow-xl px-5 py-4 h-screen">
        

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Sign In
        </h1>
        <p className="text-center text-gray-500 mb-5">
          Enter your details to continue
        </p>

        <form onSubmit={submitHandler} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg "
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg "
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <FiEye className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-amber-600 hover:text-amber-500"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              "Signing in..."
            ) : (
              <>
                Sign In <FiArrowRight className="ml-2" />
              </>
            )}
          </button>

          {/* Social Login */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
                toast.error("Google login failed");
              }}
              theme="filled_blue"
              size="large"
              shape="rectangular"
              width="300"
            />
          </div>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            <p>
              New here?{" "}
              <Link
                to="/captain-signup"
                className="font-medium text-amber-600 hover:text-amber-500"
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>
        <div className="text-center mt-5 text-lg px-2 py-2 bg-amber-200 rounded-2xl font-medium">
                  <Link to="/captain-logout" className="text-orange-500">
                    Logout
                  </Link>
                </div>
      </div>
    </div>
  );
}

export default CaptainLogin;








  


