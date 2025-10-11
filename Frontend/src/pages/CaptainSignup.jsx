import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import Logo from "../assets/RideLogo.png";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";

function CaptainSignup() {
const {setCaptain} = useContext(CaptainDataContext);
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

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
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
        toast.success("Signed up successfully");
        navigate("/captain-home");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    }

    // Reset form
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      contact: "",
      vehiclePlate: "",
      vehicleLicense: "",
      vehicleType: "",
    });
  };
   
  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Form */}
          <div className="w-full md:w-1/2 p-6 md:p-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
              Driver Registration
            </h1>
            <p className="text-center text-gray-600 mb-6">
              Join our driver network
            </p>

            <form onSubmit={submitHandler} className="space-y-4">
             
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    value={formData.firstname}
                    onChange={handleChange}
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
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
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
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>

              <div>
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
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <div>
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
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="+1234567890"
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Vehicle Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="vehiclePlate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Plate Number
                    </label>
                    <input
                      required
                      id="vehiclePlate"
                      name="vehiclePlate"
                      type="text"
                      value={formData.vehiclePlate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="ABC 1234"
                    />
                  </div>

                  <div>
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
                      value={formData.vehicleLicense}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="DL123456789"
                    />
                  </div>

                  <div>
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
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mt-4"
              >
                Register as Driver
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
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

          {/* Right side - Illustration */}
          <div className="hidden md:flex md:w-1/2 bg-blue-50 items-center justify-center p-8">
            <div className="text-center">
              <img
                className="w-full max-w-xs mx-auto"
                src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg"
                alt="Driver signup illustration"
              />
              <h2 className="mt-6 text-2xl font-bold text-gray-800">
                Become a Driver
              </h2>
              <p className="mt-2 text-gray-600">
                Join our network of professional drivers and start earning
                today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaptainSignup;
