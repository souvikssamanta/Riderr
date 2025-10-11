import React, { useDebugValue, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import TransportOption from "../components/TransportOption";
import ConfirmRide from "../components/ConfirmRide";
import LookingforDriver from "../components/LookingforDriver";
import WaitforDriver from "../components/WaitforDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import logo from "../assets/RideLogo.png";
import { toast } from "react-hot-toast";
function Home() {
  //----usestate functions-----
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pannelOpen, setPannelOpen] = useState(false);
  const [transport, setTransport] = useState(false);
  const [confirmride, setConfirmride] = useState(false);
  const [driver, setDriver] = useState(false);
  const [waitforDriver, setWaitforDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null); // 'pickup' or 'destination'
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();

  //---useref functions-----
  const panelRef = useRef(null);
  const pannelcloseRef = useRef(null);
  const vehicleRef = useRef(null);
  const confirmVehicleref = useRef(null);
  const driverRef = useRef(null);
  const waitforDriverRef = useRef(null);

  const [socket] = useContext(SocketContext);
  const { user } = useContext(UserDataContext); // Correctly destructure the array
  
  useEffect(() => {
    if (user && user._id) {
      socket.emit("join", { userType: "user", userId: user._id });
    } else {
      console.warn("User is not defined or missing _id property.");
    }

    const handleRideConfirmed = (ride) => {
      setWaitforDriver(true);
      setDriver(false);
      setRide(ride);
    };

    const handleRideCanceled = (ride) => {
      toast.error("Ride has been canceled by the captain.");
      setDriver(false);
      setWaitforDriver(false);
      navigate("/login");
    };

    const handleRideStarted = (ride) => {
      setWaitforDriver(false);
      navigate("/riding", { state: { ride } });
    };

    socket.on("ride-confirmed", handleRideConfirmed);
    socket.on("ride-canceled", handleRideCanceled);
    socket.on("ride-started", handleRideStarted);

    // cleanup to prevent duplicate listeners
    return () => {
      socket.off("ride-confirmed", handleRideConfirmed);
      socket.off("ride-canceled", handleRideCanceled);
      socket.off("ride-started", handleRideStarted);
    };
  }, [user, navigate]); // dependencies

  //----submithandler----
  const submitHandler = (e) => {
    e.preventDefault();
   
  };

  //--for pickup location---
  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const input = e.target.value;
      if (input && input.length > 2) {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/maps/get-suggestions`,
          {
            params: {
              input: input,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPickupSuggestions(
          Array.isArray(response.data.suggestions)
            ? response.data.suggestions
            : []
        );
      } else {
        setPickupSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };
  //--for destination--
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const input = e.target.value;
      if (input && input.length > 2) {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/maps/get-suggestions`,
          {
            params: {
              input: input,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDestinationSuggestions(
          Array.isArray(response.data.suggestions)
            ? response.data.suggestions
            : []
        );
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // ---------GSAP FUNCTIONS------

  // -----for pannel open and close-----
  useGSAP(
    function () {
      if (pannelOpen) {
        gsap.to(panelRef.current, {
          height: "50%",
          // padding: '',
          opacity: "1",
        });
        gsap.to(pannelcloseRef.current, {
          opacity: "1",
        });
      } else {
        gsap.to(panelRef.current, {
          opacity: "0",
          height: "0%",
        });
        gsap.to(pannelcloseRef.current, {
          opacity: "0",
        });
      }
    },
    [pannelOpen]
  );

  //---for transport option pannel---

  useGSAP(
    function () {
      if (transport && pickup) {
        gsap.to(vehicleRef.current, {
          height: "75%",
          padding: 20,
          opacity: "1",
        });

        
      } else {
        gsap.to(vehicleRef.current, {
          opacity: 0,
          height: "0%",
        });
      }
      
    },
    [transport, pickup]
  );

  //----for confirm vehicle-----

  useGSAP(
    function () {
      if (confirmride) {
        gsap.to(confirmVehicleref.current, {
          height: "100%",
          opacity: 1,
        });
      } else {
        gsap.to(confirmVehicleref.current, {
          height: "0%",
          opacity: 0,
        });
      }
    },
    [confirmride]
  );

  // -------looking for driver-----

  useGSAP(
    function () {
      if (driver) {
        gsap.to(driverRef.current, {
          height: "100%",
          opacity: 1,
        });
      } else {
        gsap.to(driverRef.current, {
          height: "0%",
          opacity: 0,
        });
      }
    },
    [driver]
  );

  //----wait for driver----

  useGSAP(
    function () {
      if (waitforDriver) {
        gsap.to(waitforDriverRef.current, {
          height: "100%",
          opacity: 1,
        });
      } else {
        gsap.to(waitforDriverRef.current, {
          height: "0%",
          opacity: 0,
        });
      }
    },
    [waitforDriver]
  );

  async function findTrip() {
    if (pickup && destination) {
      setPannelOpen(false);
      setTransport(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/rides/get-fare`,
        {
          params: {
            pickup: pickup,
            destination: destination,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setFare(response.data);
    } else {
      toast.error("Please enter both pickup and destination locations.");
    }
  }
  function swappickupanddestination() {
    const temp = pickup;
    setPickup(destination);
    setDestination(temp);
  }

  async function createRide() {
    if (!user) {
      // console.error("Cannot create ride: User is not defined or missing _id.");
      toast.error("User information is missing");
      navigate("/login");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status == 201) {
        toast.success("Ride created successfully");
      }
    } catch (error) {
      console.error("Error creating ride:", error);
      toast.error("Failed to create ride");
      navigate("/login");
    }
  }

  return (
    <div className="h-screen relative flex container mx-auto flex-col items-center overflow-hidden max-w-2xl ">
      <div className=" h-[100%] w-full  absolute">
        <LiveTracking></LiveTracking>
      </div>

      <div className="flex flex-col justify-end absolute top-0 w-full h-screen  ">
        <div className="h-[42%] flex bg-gradient-to-b from-amber-400 to-orange-200 flex-col py-4 w-full justify-center items-center relative rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center justify-center relative w-full">
            <h4 className="text-xl text-center font-semibold text-white drop-shadow-md ">
              Find Your Perfect Trip
            </h4>
            <h5
              ref={pannelcloseRef}
              onClick={() => {
                setPannelOpen(false);
              }}
              className="absolute text-4xl top-1 right-5 opacity-70 hover:opacity-100 hover:scale-110 transition-transform cursor-pointer text-white"
            >
              <i className="ri-arrow-down-s-line"></i>
            </h5>
          </div>

          <form
            className="flex flex-col items-center justify-center w-full h-full px-4"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            {/* Pickup Location */}
            <div className="flex justify-start gap-2 w-full max-w-md group relative">
              <span className="mt-7 ml-1 text-2xl text-white group-hover:scale-125 transition-transform">
                <i className="ri-focus-3-line"></i>
              </span>
              <input
                className="w-full bg-white/90 px-5 py-2 mt-3 rounded-xl  text-lg font-semibold   shadow-md hover:shadow-lg"
                type="text"
                placeholder="Add a pick-up location"
                value={pickup}
                onClick={() => {
                  setPannelOpen(true);
                  setActiveField("pickup");
                }}
                onChange={handlePickupChange}
              />
              <div className="absolute bottom-0 left-10 h-1 bg-blue-400 w-0 group-hover:w-[calc(100%-3rem)] transition-all duration-600"></div>
            </div>

            {/* Swap Button */}
            <div className="flex w-full justify-center mt-2 group">
              <button
                type="button"
                onClick={() => swappickupanddestination()}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-blue-500 text-xl text-blue-500 hover:bg-blue-500 hover:text-white hover:rotate-180 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <i className="ri-arrow-up-down-line"></i>
              </button>
            </div>

            {/* Destination */}
            <div className="flex justify-start gap-2 w-full max-w-md group relative">
              <p className="mt-8 text-2xl ml-1 text-white group-hover:scale-125 transition-transform">
                <i className="ri-map-pin-range-line"></i>
              </p>
              <input
                className="w-full bg-white/90 px-5 py-1 mt-2 rounded-xl text-lg  font-semibold  shadow-md hover:shadow-lg"
                type="text"
                placeholder="Enter your destination"
                value={destination}
                onClick={() => {
                  setPannelOpen(true);
                  setActiveField("destination");
                }}
                onChange={handleDestinationChange}
              />
              <div className="absolute bottom-0 left-12 h-1 bg-blue-400 w-0 group-hover:w-[calc(100%-3rem)] transition-all duration-500"></div>
            </div>

            {/* Find Ride Button */}
            <button
              onClick={findTrip}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-48 py-2 mt-5 rounded-xl text-lg font-bold hover:ring-4 hover:ring-blue-300/50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
            >
              Find a Ride
              <i className="ri-roadster-line ml-2  inline-block"></i>
            </button>
          </form>
        </div>

        {/* ------location search pannel----- */}

        <div ref={panelRef} className="bg-white h-0 relative ">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPickup={setPickup}
            setDestination={setDestination}
            setTransport={setTransport}
            setPannelOpen={setPannelOpen}
            activeField={activeField}
          ></LocationSearchPanel>
        </div>
        {/* ------vehicle pannel---- */}

        <div
          ref={vehicleRef}
          className="h-0 rounded-2xl bg-[#FFFFFF] absolute w-full"
        >
          <TransportOption
            setVehicleType={setVehicleType}
            setConfirmride={setConfirmride}
            setTransport={setTransport}
            fare={fare}
          ></TransportOption>
        </div>
        {/* ---confirm vehicle--- */}
        <div ref={confirmVehicleref} className="h-0 w-full absolute bg-white">
          <ConfirmRide
            pickup={pickup}
            destination={destination}
            createRide={createRide}
            fare={fare}
            vehicleType={vehicleType}
            setDriver={setDriver}
            setConfirmride={setConfirmride}
          ></ConfirmRide>
        </div>

        {/* looking for driver */}

        <div ref={driverRef} className="h-0 w-full absolute bg-white">
          <LookingforDriver
            pickup={pickup}
            destination={destination}
            createRide={createRide}
            fare={fare}
            vehicleType={vehicleType}
            setDriver={setDriver}
          ></LookingforDriver>
        </div>

        {/* waiting for driver */}

        <div
          ref={waitforDriverRef}
          className="h-full w-full flex justify-center absolute bg-white"
        >
          <WaitforDriver
            setWaitforDriver={setWaitforDriver}
            ride={ride}
          ></WaitforDriver>
        </div>
      </div>
    </div>
  );
}

export default Home;
