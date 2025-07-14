
import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import {useContext} from 'react'
import LiveTracking from '../components/LiveTracking'
import axios from "axios";

const Riding = () => {
  const navigate=useNavigate()
  const [socket] = useContext(SocketContext);
  const location=useLocation();
  const {ride}=location.state
const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "User Payment",
      order_id: order.id,
      handler:async function (response) {
        console.log("Payment successful", response);
        const data =await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/pay/verification`,
          {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature, // changed from 'fare' to 'amount'
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Payment verification response", data);
        if(data.status==200){
          window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/success?reference=${response.razorpay_payment_id}`;
          
        }
        else{
          window.location.href = `${
            import.meta.env.VITE_FRONTEND_URL
          }/fail?reference=${response.razorpay_payment_id}`;
        }

      },
    
      prefill: {
        email: "abcd@gmail.com",
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = async (fare) => {
    const responseRazorpay = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/pay/payment`,
      {
        amount: fare, // changed from 'fare' to 'amount'
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (responseRazorpay.data.success) {
      console.log(responseRazorpay.data.order);
      initPay(responseRazorpay.data.order);
     
    }
    else {
      console.error("Payment initialization failed");
      alert("Payment initialization failed. Please try again.");
    }
  };


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

          <button
             onClick={() => handlePayment(ride.fare)}
            className="bg-green-500 py-1 text-xl w-30 text-center rounded-xl "
          >
            online
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default Riding


