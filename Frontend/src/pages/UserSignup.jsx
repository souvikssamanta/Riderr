

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import Logo from "../assets/RideLogo.png";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";


function UserSignup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
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
        toast.success("Signed up successfully");
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
  };

//
const googleSignup=async()=>{

  try{
    const data=await signInWithPopup(auth,provider)
    let user=data.user
    let name=user.displayName
    const parts=name.trim().split(" ")
    let firstname=parts[0]
    let lastname=parts[1]
    let email=user.email
const newUser = {
 
    firstname,
    lastname,
  
    email

};
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/users/google-register`,
      newUser
    );

 if (response.status === 201) {
   const googledata = response.data;
   setUser(data.user);
   localStorage.setItem("token", googledata.token);
   toast.success("Signed up successfully");
   navigate("/home");
 }   
  }
  catch(error){
    console.error("Google signup failed", error);
    toast.error("Google signup failed");
  }
}

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="hidden lg:flex lg:w-1/2 lg:justify-center lg:items-center lg:pr-8">
        <img
          src="https://img.freepik.com/free-vector/personal-settings-concept-illustration_114360-2659.jpg?semt=ais_hybrid&w=740"
          alt="Signup illustration"
          className="max-w-md rounded-lg shadow-xl"
        />
      </div>

      <div className="w-full max-w-md lg:w-1/2 lg:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
         

          <h2 className="mt-6 text-2xl font-bold text-center text-gray-800">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us today!
          </p>

          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  required
                  id="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="John"
                />
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  required
                  id="lastname"
                  type="text"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                required
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                required
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-6">
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

            <div className="flex justify-center items-center">
              <button
                onClick={googleSignup}
                className="mt-6 w-full max-w-xs py-3 px-6 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
              >
                <i className="ri-google-fill text-blue-600"></i>
                <span className="text-gray-700 font-medium text-sm sm:text-base">
                  Sign up with Google
                </span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;







