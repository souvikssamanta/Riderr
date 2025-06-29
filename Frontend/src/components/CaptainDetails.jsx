import React from "react";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { FaCarOn } from "react-icons/fa6";
import { IoIosContact } from "react-icons/io";
import { FcRating } from "react-icons/fc";
import { MdOutlineRateReview } from "react-icons/md";
import { IoCarSportOutline } from "react-icons/io5";
import car from '../assets/car.jpeg'
import rider from '../assets/souvik-photo-fotor-bg-remover-20240809191258.png'
const CaptainDetails = () => {
  const {captain}=useContext(CaptainDataContext);
  
  if (!captain || !captain.fullname) {
    return <div>Loading...</div>; // Handle undefined captain or fullname
  }

  return (
    <div className="flex h-full justify-between  flex-row ">
      <div className="flex min-w-80  flex-col h-full gap-4  px-7 py-2">
        {/* car details */}
        <div className="flex justify-between  px-1.5 py-2  bg-amber-100 rounded-xl">
          <div>
            <img
              className="ring-2 ring-fuchsia-800 h-25 w-25 rounded-full"
              src={rider}
              alt="Driver"
            />
          </div>
          <div className="">
            <img
              className=" ring-2 ring-fuchsia-800 h-25 w-25 rounded-full"
              src={car}
              alt=""
            />
          </div>
        </div>

        {/* destination and payment */}
        <div className="flex justify-between">
          <div>
            <p className="text-lg text-fuchsia-900">Captain Name:</p>
            <p className="text-sm font-bold ">
              <i class="ri-user-3-line"></i>
              {captain.fullname.firstname + " " + captain.fullname.lastname}
            </p>
          </div>
          <div>
            <p className="text-lg text-fuchsia-900 mr-6">Car Name:</p>
            <p className="text-sm font-bold ">
              <FaCarOn className="inline-block" />
              {captain.vehicle.car}
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-lg text-fuchsia-900">Plate No:</h1>
            <p className="text-md font-bold mt-1">
              <IoCarSportOutline className="inline-block" />
              {captain.vehicle.plate}
            </p>
          </div>
          <div className="mr-3.5">
            <h1 className="text-lg text-fuchsia-900">Contact No</h1>
            <p className="font-bold text-sm">
              <IoIosContact className="inline-block" />
              2209064433
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <h1 className="text-lg text-fuchsia-900">Rating:</h1>
            <p className="text-md font-bold mt-1">
              <FcRating className="inline-block" />
              {captain.vehicle.plate}
            </p>
          </div>
          <div className="mr-3.5">
            <h1 className="text-lg text-fuchsia-900">Review:</h1>
            <p className="font-bold text-sm">
              <MdOutlineRateReview className="inline-block" />
              2209064433
            </p>
          </div>
        </div>
      </div>

      <div className="h-full w-1/2 sm:opacity-0 md:opacity-100 bg-black">
        <img className="h-full" src="" alt="" />
      </div>
    </div>
  );
};

export default CaptainDetails;
