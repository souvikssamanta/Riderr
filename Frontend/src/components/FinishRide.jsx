import React from 'react'
import { IoAlertCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
const FinishRide =(props) => {
  return (
    <div className="bg-white rounded-t-4xl flex flex-row-reverse py-1  h-full">
      <div className="h-full sm:opacity-0 md:opacity-100">
        <img className='h-full w-full object-contain'
          src="https://i.pinimg.com/736x/00/15/26/00152686e511ab101beedf395f1c834b.jpg"
          alt=""
        />
      </div>
      {/* ----all data--- */}
      <div className="flex flex-col px-9 py-3 gap-6 max-w-2xl">
        <h1
          onClick={() => {
            props.setFinishRidePanel(false);
          }}
          className="text-xl  mt-3 font-semibold bg-amber-500 inline-block rounded-2xl px-5 py-1 "
        >
          Finish your ride!
        </h1>

        {/* pickup location and destination */}

        <div className="flex flex-col gap-5 ">
          <div>
            <p className="text-xl">Pickup </p>
            <p className="text-xl bg-amber-200 rounded-2xl px-3 inline-block font-bold mt-1">
              {props.ride?.pickup}
            </p>
          </div>

          <div>
            <p className="text-xl ">Destination</p>
            <p className="text-xl bg-amber-200 rounded-2xl px-3 inline-block font-bold mt-1">
              {props.ride?.destination}
            </p>
          </div>
        </div>

        {/* -----fare and passengers---- */}
        <div className="flex gap-20">
          <div>
            <h1 className="text-xl">Fare</h1>
            <p className="text-xl bg-amber-200 rounded-2xl px-3 font-bold mt-5">
              {props.ride?.fare}
            </p>
          </div>
          <div>
            <h1 className="text-xl">Passenger</h1>
            <p className="text-xl bg-amber-200 rounded-2xl inline-block px-3 font-bold mt-5">
              2
            </p>
          </div>
        </div>
        {/* -----buttons------ */}

        <div className="flex flex-col">
          <button
            onClick={() => {
              props.finshRide();
              IoAlertCircleOutline("ride finished");
            }}
            className="bg-black py-1 text-lg rounded-xl text-amber-50 w-39"
          >
            Finish Ride
          </button>
          <p className="text-red-700 mt-3 font-semibold text-xl">
            Click on finish button if you have done payment
          </p>
        </div>
      </div>
    </div>
  );
}

export default FinishRide
