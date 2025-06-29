import React from 'react'
import {Link} from 'react-router-dom'
import Logo from "../assets/RideLogo.png"
function Start() {
  return (
    <div className="h-120 w-full  bg-[#FFFFFF]">
      <img className="h-25 w-25 absolute rounded-3xl " src={Logo} alt="" />
      <div className=" w-[30 rem]  pt-5 justify-items-center">
        <img
          className="h-[25rem] pt-[90px]"
          src="https://img.freepik.com/free-vector/car-sharing-concept-illustration_114360-15011.jpg?semt=ais_hybrid&w=740"
          alt=""
        />

        <img
          className="animate-bounce h-[6rem]  rounded-full"
          src="https://cdn.vectorstock.com/i/500p/12/90/car-rim-and-tire-linear-icon-vector-28511290.jpg"
          alt=""
        />

        <h2
          className="text-transparent bg-clip-text 
            bg-gradient-to-r from-[#285876] to-[#43C64C]
            sm:text-2xl md:text-3xl lg:text-4xl 
          mt-7"
        >
          Welcome to Our Application
        </h2>
        <Link
          to="/login"
          className="flex items-center bg-black hover:text-black
          hover:bg-gradient-to-br from-yellow-300 to-orange-600
        
          justify-center mt-8 
           w-70 border border-black text-emerald-500
           px-1.5 py-2 rounded-full"
        >
          Let's get Started
        </Link>

        <Link
          to="/captain-login"
          className="flex items-center bg-black hover:text-black
          hover:bg-gradient-to-br from-yellow-300 to-orange-600
        
          justify-center mt-4
           w-70 border border-black text-emerald-500
           px-1.5 py-2 rounded-full"
        >
          For captain
        </Link>
      </div>
    </div>
  );
}

export default Start
