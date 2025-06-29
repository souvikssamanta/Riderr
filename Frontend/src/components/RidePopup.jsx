import React from 'react'
const RidePopup = (props) => {
  return (
    <div className=" px-3  w-80 py-1 h-">
      {/* ----all data--- */}
      <div className="flex flex-col px-2 py-1 gap-1">
        <h1
          onClick={() => {
            props.setRidepopup(false);
          }}
          className="text-xl text-fuchsia-800 text-center  font-semibold mt-1"
        >
          Here your ride!
        </h1>

        {/* pickup location and destination */}

        <div className="flex-row px-2">
          <div>
            <p className="text-xl text-fuchsia-800">Pickup location</p>
            <p className="text-md bg-amber-100 inline-block rounded-3xl px-3 py-1 font-bold mt-1">
              {props.ride?.pickup}
            </p>
          </div>

          <div className="mt-1">
            <p className="text-xl text-fuchsia-800 ">Destination</p>
            <p className="text-md bg-amber-100 inline-block rounded-3xl px-3 font-bold mt-1">
              {props.ride?.destination}
            </p>
          </div>
        </div>

        {/* -----fare and passengers---- */}
        <div className="flex gap-35 px-2">
          <div>
            <h1 className="text-xl text-fuchsia-800">Fare</h1>
            <p className="text-md bg-amber-100 inline-block rounded-3xl px-1 font-bold mt-1">
              {props.ride?.fare}
            </p>
          </div>
          <div>
            <h1 className="text-xl text-fuchsia-800">Passenger</h1>
            <p className="text-md bg-amber-100 inline-block rounded-3xl px-3 font-bold mt-2">
              2
            </p>
          </div>
        </div>
        {/* -----buttons------ */}
        <div className="flex mt-1 justify-between">
          <button
            onClick={() => {
              props.confirmRide();
              props.setConfirmridepopup(true);
              //props.setRidepopup(false);
            }}
            className="bg-green-500 text-black
            hover:bg-emerald-400 px-2 py-2 text-md rounded"
          >
            Accept
          </button>

          <button
            onClick={() => {
              props.setRidepopup(false);
            }}
            className="bg-red-600
            hover:bg-red-500 text-white px-2  text-md rounded
            
          "
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
}

export default RidePopup
