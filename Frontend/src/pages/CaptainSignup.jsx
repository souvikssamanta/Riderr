


import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import Logo from "../assets/RideLogo.png";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";

function CaptainSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contact, setContact] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleLicense, setVehicleLicense] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();
  const {captain, setCaptain } = useContext(CaptainDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      contact: contact,
      vehicle: {
        plate: vehiclePlate,
        License: vehicleLicense,
        vehicleType: vehicleType,
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
        toast.success("Signed up successfully");
        navigate("/captain-home");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    }

    //Reset form
setPassword('')
setEmail('')
setFirstname('')
setLastname('')
setContact('')
setVehicleLicense('')
setVehiclePlate('')
setVehicleType('')

      
    
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col  md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className=" flex justify-center">
            <img className="h-12" src={Logo} alt="Ride Logo" />
          </div>

          <div className="bg-white px-5 md:p-8 rounded-xl shadow-sm">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
              Driver Registration
            </h1>
            <p className="text-center text-gray-600 mb-6">
              Join our driver network
            </p>

            <form onSubmit={(e)=>{
              submitHandler(e);
            }}>
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
                    name="firstname"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                    name="lastname"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  required
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Number
                </label>
                <input
                  required
                  id="contact"
                  name="contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="+1234567890"
                />
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Vehicle Information
                </h3>

                <div className="mb-4">
                  <label
                    htmlFor="vehiclePlate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    License Plate Number
                  </label>
                  <input
                    required
                    id="vehiclePlate"
                    name="vehiclePlate"
                    type="text"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="ABC 1234"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="vehicleLicense"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Driver's License Number
                  </label>
                  <input
                    required
                    id="vehicleLicense"
                    name="vehicleLicense"
                    type="text"
                    value={vehicleLicense}
                    onChange={(e) => setVehicleLicense(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="DL123456789"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="vehicleType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Vehicle Type
                  </label>
                  <select
                    required
                    id="vehicleType"
                    name="vehicleType"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="" disabled>
                      Select vehicle type
                    </option>
                    <option value="car">Car</option>
                    <option value="auto">Auto</option>
                    <option value="motor">Motorcycle</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Register as Driver
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

            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600 py-3">
                Already have an account?{" "}
                <Link
                  to="/captain-login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Illustration (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-blue-50 items-center justify-center p-12">
        <div className="max-w-md">
          <img
            className="w-full"
            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg"
            alt="Driver signup illustration"
          />
          <h2 className="mt-6 text-2xl font-bold text-center text-gray-800">
            Become a Driver
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Join our network of professional drivers and start earning today.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaptainSignup;










