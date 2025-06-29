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
  //console.log(user);
  useEffect(() => {
    if (user && user._id) {
      socket.emit("join", { userType: "user", userId: user._id });
    } else {
      console.warn("User is not defined or missing _id property.");
    }
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setWaitforDriver(true);
    setDriver(false);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    setWaitforDriver(false);
    navigate("/riding", { state: { ride } });
  });

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
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
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
      return toast.error("User information is missing. Please log in again.");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
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
      toast.error("Failed to create ride. Please try again.");
      navigate("/login");
    }
  }

  return (
    <div className="h-screen relative flex flex-col justify-center items-center overflow-hidden max-w-2xl ">
      <div className=" h-[100%] w-full absolute">
        <LiveTracking></LiveTracking>
      </div>
      
      <div className="flex flex-col  justify-end absolute top-0 w-full h-screen  ">
        <div className="h-[42%] flex bg-amber-400 flex-col py-2 w-full justify-center items-center relative rounded ">
          {/* <div> */}
            <h4 className="text-2xl text-center font-semibold">Find a trip</h4>

            {/* pannel of location close */}
            <h5
              ref={pannelcloseRef}
              onClick={() => {
                setPannelOpen(false);
              }}
              className=" absolute text-4xl  top-3 right-5 opacity-0 "
            >
              <i className="ri-arrow-down-s-line"></i>
            </h5>

            <form className="flex flex-col items-center justify-center w-full h-full"
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              {/* ------pickup------ */}

              <div className="flex  justify-start  gap-2">
                <span className="mt-8 ml-1">
                  <i className="text-2xl ri-focus-3-line "></i>
                </span>
                <input
                  className="w-63 bg-[#d7d4d4] px-3 py-2 mt-6 rounded-xl hover:ring-2 text-lg font-bold  "
                  type="text"
                  placeholder="Add a pick-up location"
                  value={pickup}
                  onClick={() => {
                    setPannelOpen(true);
                    setActiveField("pickup");
                  }}
                  onChange={handlePickupChange}
                />
              </div>
              {/* swap destination */}
              <div className="flex w-77 justify-center mt-3 ">
                <i
                  onClick={() => swappickupanddestination()}
                  className="  w-9 h-8 rounded-full text-center border-2  text-xl ri-arrow-up-down-line  "
                ></i>
              </div>

              {/* -----destination--- */}

              <div className="flex justify-start gap-2">
                <p className="mt-8 ">
                  <i className="text-2xl ml-1 ri-map-pin-range-line"></i>
                </p>

                <input
                  className="w-63 bg-[#d7d4d4] px-4 py-2 mt-4 rounded-xl text-lg hover:ring-2 font-bold"
                  type="text"
                  placeholder="Enter your destination"
                  value={destination}
                  onClick={() => {
                    setPannelOpen(true);
                    setActiveField("destination");
                  }}
                  onChange={handleDestinationChange}
                />
              </div>
            </form>

            <button
              onClick={findTrip}
              className="bg-black text-white w-40  py-1 mt-6 rounded-lg text-lg  hover:ring-3 hover:ring-blue-300"
            >
              Find a ride
            </button>
          {/* </div> */}
          {/* <div className="bg-amber-600 h-full w-2/3 mr-4 rounded sm:opacity-0 md:opacity-100">
            <video src=""></video>
          </div> */}
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
