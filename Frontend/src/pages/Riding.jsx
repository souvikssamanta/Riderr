
import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import {useContext} from 'react'
import LiveTracking from '../components/LiveTracking'
import Payment from './Payment'
const Riding = () => {
  const navigate=useNavigate()
  const [socket] = useContext(SocketContext);
  const location=useLocation();
  const {ride}=location.state

// socket.on("ride-finished", (ride) => {
//   navigate("/home");
// });
  return (
    <div className="h-screen">
      <Link
        to={"/home"}
        className="flex items-center justify-center fixed h-10 w-10 bg-white rounded-2xl left-2.5 top-2.5"
      >
        <i className="ri-home-5-line text-2xl font-bold"></i>
      </Link>
      {/* ----image section-- */}
      <div className="h-2/3">
        <LiveTracking></LiveTracking>
      </div>

      <div
        className=" flex flex-col mt-3  ml-2  mr-2 gap-4 max-w-2xl items-center
         border-2 border-black rounded-2xl py-4
        px-2 "
      >
        <div className="text-center">
          <h1 className="text-xl">Fare</h1>
          <p className="text-xl font-bold mt-3 bg-amber-100 inline-block rounded-xl px-3">
            <i className="ri-money-rupee-circle-line text-xl"></i>
            {ride.fare}
          </p>
        </div>
        <p className="font-semibold">Choose any mode</p>
        <div className="flex gap-5 mt-5">
          <Link
            to="/home"
            className="bg-green-500 py-1 text-xl w-30 text-center rounded-xl "
          >
            cash
          </Link>

          <Link
            to="/payment"
            className="bg-green-500 py-1 text-xl w-30 text-center rounded-xl "
          >
            online
          </Link>
        </div>
      </div>
      <div className='h-0'>
        <Payment fare={ride.fare}></Payment>
      </div>
    </div>
  );
}

export default Riding


