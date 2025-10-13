


import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { toast } from "react-hot-toast";
import {
  AiOutlineMail,
  AiOutlineLoading3Quarters,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillApple,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

function UserLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

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

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/login`,
        formData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        toast.success("Welcome back!");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
      setFormData({ email: "", password: "" });
    }
  };

  const googleSignin = async () => {
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
        toast.success("Signed in successfully");
        navigate("/home");
      }
    } catch (error) {
      console.error("Google signin failed", error);
      toast.error("Google signin failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-12 z-10">
        {/* Left Section - Brand & Illustration */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="max-w-md mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-white text-xl font-semibold">
                RideShare
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Welcome back to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                RideShare
              </span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Sign in to access your dashboard, manage your rides, and continue
              your journey with us.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                "Secure & Reliable",
                "24/7 Support",
                "Real-time Tracking",
                "Easy Payments",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-slate-300"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Sign in to your account
                </h2>
                <p className="text-slate-300">
                  Enter your credentials to continue
                </p>
              </div>

              <form onSubmit={submitHandler} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <AiOutlineMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Password
                    </label>
                    <Link
                      to="/forgetpassword"
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <AiOutlineLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </button>
                  </div>
                </div>

                <button
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
                      <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
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

                <div className="flex justify-center">
                  <button
                    onClick={googleSignin}
                    className="flex items-center justify-center gap-3 py-3 px-8 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:bg-white/10 transition-all duration-200 hover:border-white/20"
                  >
                    <FcGoogle className="text-lg" />
                    <span className="text-sm font-medium">Google</span>
                  </button>

                
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-slate-400">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Sign up now
                  </Link>
                </p>
              </div>

              {/* Alternative Login */}
              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <Link
                  to="/captain-logout"
                  className="flex items-center justify-center text-orange-400 hover:text-orange-300 transition-colors font-medium text-sm"
                >
                  Are you a driver? Sign in here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;




