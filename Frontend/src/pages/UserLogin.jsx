import React, { useState } from 'react'
import { useContext } from 'react';
import {Link, useNavigate} from "react-router-dom"
import { UserDataContext } from '../context/UserContext';
import Logo from '../assets/RideLogo.png'
import axios from 'axios'
import { GoogleLogin } from "@react-oauth/google";
import {toast} from 'react-hot-toast'

function UserLogin() {

  const [email,setEmail] =useState('');
 const[password ,setPassword]= useState('');

const {user, setUser} =useContext(UserDataContext)
const navigate=useNavigate()


const submitHandler=async(e)=>{
e.preventDefault()
const UserData={
  email:email,
  password:password
}
try{
const response = await axios.post(
  `${import.meta.env.VITE_BACKEND_URLl}/users/login`,
  UserData
);
if(response.status === 200){
  const data=response.data
  console.log(data)
  setUser(data.user)
  localStorage.setItem('token',data.token)
  toast.success("loggedin sucessfully");
  navigate('/home')

}
}catch(error){
console.log(error);
 toast.error("invalid email or password");
}
setEmail('')
setPassword('')
}

  return (
    <div className="px-4 font-primary w-full h-screen flex flex-row-reverse justify-around gap-5">
      <div className="h-screen w-1/2 flex items-center">
        <img
          className=" sm:opacity-0 md:opacity-100 sm:h-0 md:h-1/2"
          src="https://i.pinimg.com/736x/18/11/f3/1811f344025539b7b4abb446eb6f910d.jpg"
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
            <Link to="/signup" className="text-blue-800">
             
              Create new Account
            </Link>
          </p>
        </form>
        
      </div>
    </div>
  );
}

export default UserLogin
