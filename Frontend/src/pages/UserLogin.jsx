


import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import Logo from "../assets/RideLogo.png";
 // Import your login image
import axios from "axios";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";

import { toast } from "react-hot-toast";
import {
  AiOutlineMail,
  AiOutlineLoading3Quarters,
  AiOutlineLock,
} from "react-icons/ai";

function UserLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
        toast.success("Logged in successfully");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center p-4">
      {/* Image Section - Hidden on mobile, visible on lg screens */}
      <div className="hidden lg:flex lg:w-1/2 lg:justify-center lg:items-center lg:pr-8">
        <div className="relative w-full max-w-md">
          <img
            src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-5267.jpg"
            alt="Login illustration"
            className="rounded-2xl shadow-xl object-cover w-full h-full max-h-[600px]"
          />

          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md lg:w-1/2 lg:max-w-lg">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
             
              <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgetpassword"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-lg font-medium text-white ${
                  isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } transition-colors flex items-center justify-center`}
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

            <div>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-white text-sm text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <button
                  onClick={googleSignin}
                  className="mt-6 w-full max-w-xs py-3 px-6 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
                >
                  <i className="ri-google-fill text-yellow-300"></i>
                  <span className="text-gray-700 font-medium text-sm sm:text-base">
                    Sign in with Google
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  Sign up
                </Link>
              </p>
            </div>
            <div className="text-lg px-2 py-2 bg-amber-200 rounded-2xl mt-5 mb-5 text-center font-medium">
              <Link to="/captain-logout" className="text-orange-500">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;







