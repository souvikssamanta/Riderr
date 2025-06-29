import React from 'react'

const LookingforDriver = (props) => {
  return (
    <div className="flex flex-col px-7 py-1 max-w-2xl gap-5 justify-center">
      <h5
        onClick={() => {
          props.setDriver(false);
        }}
        className=" absolute text-4xl  top-3 right-5  "
      >
        <i className="ri-arrow-down-s-line"></i>
      </h5>

      <h1 className="text-xl font-semibold mt-7">Looking for Driver......</h1>
      <p className="text-xl">Please wait...</p>
      <div className="ring-2 ring-fuchsia-900 rounded-xl  p-2">
        <div className="mt-7 flex justify-center">
          <img
            className="h-30 w-70"
            src="data:image/jpeg;base64,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"
            alt=""
          />
        </div>
        <div className="">
          <p className="text-xl font-bold text-center">Pickup location</p>
          <p className="text-md text-center text-emerald-700 font-bold mt-3">
            {props.pickup}
          </p>
        </div>

        <div>
          <p className="text-xl font-bold text-center">Destination</p>
          <p className="text-md text-center text-emerald-700 font-bold mt-3">
            {props.destination}
          </p>
        </div>

        <div>
          <h1 className="text-xl font-bold text-center">Fare</h1>
          <p className="text-xl text-orange-600 font-bold mt-3 text-center">
            ₹{props.fare[props.vehicleType]}
          </p>
        </div>
      </div>
      <p className="text-md text-center font-semibold mt-4">
        Rider provide you the best service ❤️
      </p>
    </div>
  );
}

export default LookingforDriver
