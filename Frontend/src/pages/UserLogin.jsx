


import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import Logo from "../assets/RideLogo.png";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import { AiOutlineMail, AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const UserData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/login`,
        UserData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        toast.success("Welcome back! You've successfully logged in.");
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 flex flex-col md:flex-row items-center justify-center p-2 md:p-8 gap-8">
      {/* Left side - Illustration (hidden on mobile) */}
      <div className="hidden md:flex flex-1 items-center justify-center p-8">
        <div className="max-w-xl relative">
          <img
            className="w-full h-auto rounded-2xl shadow-xl transform transition-transform duration-500 hover:scale-105"
            src="https://i.pinimg.com/736x/18/11/f3/1811f344025539b7b4abb446eb6f910d.jpg"
            alt="Happy people riding together"
          />
          <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800">
              Ride With Confidence
            </h2>
            <p className="text-gray-600 mt-1">
              Join millions of happy riders today
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        <div className="p-8 sm:p-10">
        

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative ">
                <AiOutlineMail className="absolute left-3 top-3.5 h-5 scale-80 w-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-10"
                  placeholder="your@email.com"
                  required
                />

               
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <RiLockPasswordLine className="absolute left-3 top-3.5 h-5 scale-80 w-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-10"
                  placeholder="••••••••"
                  required
                />
                
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                isLoading
                  ? "bg-blue-400"
                  : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
              } transition-all flex items-center justify-center shadow-md hover:shadow-lg`}
            >
              {isLoading ? (
                <>
                  
                  <AiOutlineLoading3Quarters className="animate-spin h-5 scale-90 w-5 text-white mr-2" />  
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

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
                  toast.success("Google login successful!");
                  navigate("/home");
                }}
                onError={() => {
                  console.log("Login Failed");
                  toast.error("Google login failed. Please try again.");
                }}
                theme="filled_blue"
                size="large"
                shape="pill"
                width="250"
                text="continue_with"
              />
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-blue-600">
              Create now
            </Link>
          </div>
                  <div className=" mt-12 text-lg px-2 py-2 bg-amber-200 rounded-2xl text-center font-medium">
                         
                          <Link to="/logout" className="text-orange-500">
                             Logout
                          </Link>
                       
                        </div>

        </div>
      </div>
    </div>
  );
}

export default UserLogin;











