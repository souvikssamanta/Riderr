import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'
import Payment from './Payment'
 
const CaptainRiding = () => {

    const [ finishRidePanel, setFinishRidePanel ] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride
    const navigate=useNavigate()


    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                height:"100%",
                opacity:1
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                height:"%0",
                opacity:0
            })
        }
    }, [ finishRidePanel ])

async function finshRide(){
const response = await axios.post(
  `${import.meta.env.VITE_BACKEND_URL}/rides/finish-ride`,
  {
    rideId: rideData?._id,
  },

  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);
if(response.request.status===200){  
    
     navigate('/captain-home',)
    }
}


    return (
      <div className="h-screen relative flex flex-col justify-end">
        <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
          
          <Link
            to="/captain-home"
            className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
          >
            <i className="text-2xl font-medium ri-logout-box-r-line"></i>
          </Link>
        </div>

        <div className="h-screen w-screen">
        <LiveTracking></LiveTracking>
        </div>

        <div
          className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10"
          onClick={() => {
            setFinishRidePanel(true);
          }}
        >
          <h5
            className="p-1 text-center w-[90%] absolute top-0"
            onClick={() => {}}
          >
            <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
          </h5>
          <h4 className="text-xl font-semibold">{"4 KM away"}</h4>
          <button className=" bg-green-600 text-white font-semibold p-3 px-5 rounded-lg">
            Complete Ride
          </button>
        </div>
        {/* finish ride pannel */}
        <div
          ref={finishRidePanelRef}
          className="fixed w-full h-0 opacity-0 bg-white px-2 py-2 "
        >
          <FinishRide
             ride={rideData}
            setFinishRidePanel={setFinishRidePanel}
            finshRide={finshRide}
          />
        </div>
          
      </div>
    );
}

export default CaptainRiding