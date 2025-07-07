import React from 'react'
import { useLocation } from "react-router-dom";

const failure = () => {
  const query = new URLSearchParams(useLocation().search);
  const paymentId = query.get("reference");
  
  return (
    <div className="">
      <div className="flex flex-col max-w-2xl justify-center items-center mt-40">
        <p className="text-3xl font-bold text-red-600 mb-4">Payment Failed</p>
        <p className="text-lg text-gray-700 text-center mb-2">
          Oops! Something went wrong with your payment.
        </p>
        <p className="text-semibold">
          Your Payment Id:
          <span className="text-blue-500 font-bold">{paymentId}</span>
        </p>
        <p className="text-md text-center text-gray-500 mb-6">
          Please try again or contact support if the issue persists.
        </p>

        <button
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          onClick={() => (window.location.href = "/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default failure
