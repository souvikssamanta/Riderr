

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import Logo from "../assets/RideLogo.png";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";

function UserSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
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
    setPassword("");
    setEmail("");
    setFirstname("");
    setLastname("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <img className="h-12" src={Logo} alt="Ride Logo" />
          </div>

          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
              Create your account
            </h1>
            <p className="text-center text-gray-600 mb-6">Join us today!</p>

            <form onSubmit={submitHandler}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First name
                  </label>
                  <input
                    required
                    id="firstname"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                    placeholder="John"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last name
                  </label>
                  <input
                    required
                    id="lastname"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  required
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                  placeholder="email@example.com"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  required
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                  placeholder="••••••••"
                />
              </div>


              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Sign up
              </button>
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

              <div className="mt-6 flex justify-center">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
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

      {/* Right side - Illustration (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-purple-50 items-center justify-center p-12">
        <div className="max-w-md">
          <img
            className="w-full"
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg"
            alt="Signup illustration"
          />
          <h2 className="mt-6 text-2xl font-bold text-center text-gray-800">
            Join our community
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Start your journey with us and discover amazing features.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;












