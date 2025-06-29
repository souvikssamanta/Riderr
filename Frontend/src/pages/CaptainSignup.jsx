import React, { useContext } from 'react'
import  { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios';
import  { CaptainDataContext } from '../context/CaptainContext';
import Logo from "../assets/RideLogo.png";
import { GoogleLogin } from "@react-oauth/google";

function CaptainSignup() {

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [firstname,setFirstname]=useState('')
const [lastname,setLastname]=useState('')
const [vehicleColor, setVehicleColor] = useState('');
const [vehiclePlate, setVehiclePlate] = useState('');
const [vehicleCapacity, setVehicleCapacity] = useState('');
const [vehicleType, setVehicleType] = useState('');
const navigate=useNavigate()
const{captain ,setCaptain}=useContext(CaptainDataContext)
// const url = "https://uber-ouze.onrender.com";
const submitHandler=async (e)=>{
 
e.preventDefault()
const captainData={
  fullname:{
  firstname:firstname,
  lastname:lastname},
  email:email,
  password:password,

  vehicle:{
    color:vehicleColor,
    plate:vehiclePlate,
    capacity:vehicleCapacity,
    vehicleType:vehicleType
  }

}
try{
const response = await axios.post(
  `${import.meta.env.VITE_BACKEND_URL}/captains/register`,
  captainData
);
console.log(captainData)
console.log(response)
   if(response.status === 201){
const data=response.data
setCaptain(data.captain);
localStorage.setItem('token',data.token);
navigate('/captain-home')
   }
  }
  catch(error){
    console.log(error)
  }
 
setPassword('')
setEmail('')
setFirstname('')
setLastname('')
setVehicleColor('')
setVehicleCapacity('')
setVehiclePlate('')
setVehicleType('')
}

  return (
    <div
      className="px-4 font-primary w-full h-screen flex flex-row-reverse 
     scroll-smooth   justify-around gap-5"
    >
      <div className="h-screen w-1/2 flex items-center">
        <img
          className=" sm:opacity-0 md:opacity-100 sm:h-0 md:h-1/2"
          src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg"
          alt=""
        />
      </div>

      <div className="h-screen ">
        <img className="  h-18 w-18 " src={Logo} />

        <form
          className="px-4  w-70 py-8 rounded-2xl bg-amber-50"
          onSubmit={(e) => {
            submitHandler(e);
          }}
          action=""
        >
          <p
            className="font-bold text-center bg-gradient-to-tl from-pink-400 to-purple-700 text-transparent
          bg-clip-text text-xl mb-3"
          >
            Welcome{" "}
          </p>
          <p className="font-semibold text-xl mb-2">Sign up</p>
          <h3 className="text-sm font-semibold py-2  ">What's your name</h3>
          <div className="flex gap-2 mb-2">
            <input
              required
              type="text"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              className="bg-transparent rounded-s-xl border w-1/2  px-3 py-1.5 text-lg mt-2"
              placeholder="Firstname"
            />
            <input
              required
              type="text"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              className="bg-transparent rounded-e-xl border w-1/2 px-3 py-2 text-lg mt-2"
              placeholder="lastname"
            />
          </div>

          <h3 className="text-sm font-semibold mb-1  ">What's Your Email</h3>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className=" rounded-full border w-60 px-4 py-1.5 text-sm mt-1"
            placeholder="Eg:email@example.com"
          />
          <h3 className="text-sm font-semibold mt-1 ">Enter Password</h3>
          <input
            type="password"
            className="bg-transparent rounded-full border  px-4 py-1.5 text-sm mt-1"
            placeholder="Eg:paSSword@123"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div>
            <h3 className="text-xl font-semibold mt-5">Vehicle Information</h3>

            <input
              required
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="bg-[#EEEEEE] rounded border w-full px-4 py-1 text-sm mt-2"
              placeholder="Vehicle Color"
            />

            <input
              required
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="bg-[#EEEEEE] rounded border w-full px-4 py-1 text-sm mt-2"
              placeholder="Vehicle Plate Number"
            />

            <input
              required
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="bg-[#EEEEEE] rounded border w-full px-4 py-1 text-sm mt-2"
              placeholder="Vehicle Capacity"
            />

            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#EEEEEE] rounded border w-full px-4 py-1 text-sm mt-2"
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motor">Motor</option>
            </select>
          </div>

          <div className="mt-3 flex gap-2">
            <input className="" type="checkbox" />
            <span>Remind me</span>
          </div>
          <button className="bg-black  text-white text-sm w-full mt-4 mb-3 rounded-2xl py-2 font-semibold">
            Sign up
          </button>

          <div className="flex justify-center mt-2 text-xl">
            
          </div>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />

          <p className="mt-6 text-sm font-medium">
            Already have an account?
            <Link to="/captain-login" className="text-blue-800 ml-3">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CaptainSignup
