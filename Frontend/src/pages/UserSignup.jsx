import React from 'react'
import  { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import  { UserDataContext } from '../context/UserContext'
import { useContext } from 'react'
import Logo from "../assets/RideLogo.png";
import { GoogleLogin } from "@react-oauth/google";
function UserSignup() {
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [firstname,setFirstname]=useState('')
const [lastname,setLastname]=useState('')
// const [userData,setUserData]=useState({})

const navigate=useNavigate()

const {user , setUser}=useContext(UserDataContext);

const submitHandler=async(e)=>{
e.preventDefault()
const newUser={
  fullname:{
    firstname:firstname,
    lastname:lastname},
  
    email:email,
    password:password
}
try{
const response = await axios.post(
  `${import.meta.env.VITE_BACKEND_URL}/users/register`,
  newUser
);
if(response.status===201){
const data=response.data
setUser(data.user)
console.log(data.user)
localStorage.setItem('token',data.token)
navigate('/home')
}
}catch(error){
console.log(error)
}
 setPassword('')
setEmail('')
 setFirstname('')
 setLastname('');
}

  return (
    <div className="px-4 font-primary w-full h-screen flex flex-row-reverse justify-around gap-5">
      <div className="h-screen w-1/2 flex items-center">
        <img
          className=" sm:opacity-0 md:opacity-100 sm:h-0 md:h-1/2"
          src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg"
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
          <div className="mt-3 flex gap-2">
            <input className="" type="checkbox" />
            <span>Remind me</span>
          </div>
          <button className="bg-black  text-white text-sm w-full mt-4 mb-3 rounded-2xl py-2 font-semibold">
            Sign up
          </button>

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
            Already have an account?
            <Link to="/login" className="text-blue-800 ml-3">
              Log in
            </Link>
          </p>
        </form>
        <span className="ml-25 text-lg px-2 py-2 bg-amber-200 rounded-2xl font-medium">
          <Link to="/logout" className="text-orange-500">
            Logout
          </Link>
        </span>
        </div>
    </div>
  );
}

export default UserSignup
