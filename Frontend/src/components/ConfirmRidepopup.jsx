import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const ConfirmRidepopup = (props) => {
const [otp,setOtp]=useState("");
const navigate = useNavigate();
const submitHandler=async(e)=>{
const url = "https://uber-ouze.onrender.com";
e.preventDefault()

const response=await axios.get(`${url}/rides/start-ride`,{
  params:{rideId: props.ride?._id,
  otp:otp,
  },
  headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`,
  },
})

if(response.request.status===200){  
props.setConfirmridepopup(false);
props.setRidepopup(false);
 navigate('/captain-riding',{state:{ride:props.ride}})
}

}
  return (
    <div className="    py-1 h-full min-w-80">
      {/* ----all data--- */}
      <div className=" flex flex-col gap-5 px-4 py-1 ">
        <h1
          onClick={() => {
            props.setRidepopup(false);
          }}
          className="text-xl  text-center font-semibold mt-5"
        >
          Confirm your ride!
        </h1>
        

        {/* -----fare and passengers---- */}
        <div className="flex ring-2 rounded-xl py-2 px-2 justify-between">
          <div>
            <h1 className="text-lg">Fare</h1>
            <p className="text-md font-bold mt-1">{props.ride?.fare}</p>
          </div>
          <div>
            <h1 className="text-lg">Passenger</h1>
            <p className="text-md font-bold mt-1">2</p>
          </div>
        </div>
        {/* -----buttons------ */}
        <div>
          <form className="flex flex-col gap-8" onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="Enter OTP"
              className="bg-white ring-2 text-black px-5 py-2 text-center rounded-4xl text-sm  font-semibold mt-5 hover:ring-fuchsia-900 w-50"
            />
            <div className="flex justify-between mt-5">
              <button
                className="bg-green-600 p-3 text-md rounded hover:ring-2 hover:ring-black
                 text-amber-50"
              >
                Confirm
              </button>

              <button
                onClick={() => {
                  props.setConfirmridepopup(false);
                  props.setConfirmride(false);
                }}
                className="bg-red-500 hover:ring-2 hover:ring-fuchsia-800 px-3  text-amber-100 text-md rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfirmRidepopup
