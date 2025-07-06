import axios from 'axios';
import React, { createContext } from 'react'
import  { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { CaptainDataContext } from '../context/CaptainContext';
import { useContext } from 'react';
import Logo from "../assets/RideLogo.png";
import { GoogleLogin } from "@react-oauth/google";
import {toast} from 'react-hot-toast'
function CaptainLogin() {
const navigate=useNavigate();
const [email,setEmail] =useState('');
const[password ,setPassword]= useState('');
const {captain,setCaptain}=useContext(CaptainDataContext)

const submitHandler=async(e)=>{
e.preventDefault()
const CaptainData={
  email:email,
  password:password
}

try{
const response = await axios.post(
  `${import.meta.env.VITE_BACKEND_URL}/captains/login`,
  CaptainData
);
console.log(response.status);
if(response.status===200){
const data=response.data
setCaptain(data.captain);
localStorage.setItem('token',data.token)
navigate('/captain-home');
 toast.success("login sucessfully");

}
}
catch(err){
  console.error(err)
  toast.error("invalid email or password");

}
}

  



  return (
    <div className="px-4 font-primary w-full h-screen flex flex-row-reverse justify-around gap-5">
      <div className="h-screen w-1/2 flex items-center">
        <img
          className=" sm:opacity-0 md:opacity-100 sm:h-0 md:h-1/2"
          src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?semt=ais_hybrid&w=740"
          alt=""
        />
      </div>

      <div className="h-screen w-">
        <img className="  h-18 w-18 " src={Logo} />

        <form
          className="px-4  w-70 py-8 rounded-2xl bg-amber-50"
          onSubmit={(e) => {
            submitHandler(e);
          }}
          action=""
        >
          <p className="font-bold text-center text-xl mb-5">Welcome back!</p>
          <p className="font-semibold text-xl mb-5">Log in</p>
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
          <div className="mt-3 flex gap-2">
            <input className="" type="checkbox" />
            <span>Remind me</span>
          </div>
          <button className="bg-black  text-white text-sm w-full mt-4 mb-3 rounded-2xl py-2 font-semibold">
            Login
          </button>
          <Link className="text-blue-600 text-sm  ml-1  ">
            Forgot Password ?
          </Link>
          <div className="flex justify-center mt-2 text-xl">
            ---------- or -----------
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
            New here?
            <Link to="/captain-signup" className="text-blue-800">
              Create new Account
            </Link>
          </p>
        </form>
        <span className="ml-25 text-lg px-2 py-2 bg-amber-200 rounded-2xl font-medium">
                  <Link to="/captain-logout" className="text-orange-500">
                    Logout
                  </Link>
                </span>
      </div>
    </div>
  );
}

export default CaptainLogin

      










  


