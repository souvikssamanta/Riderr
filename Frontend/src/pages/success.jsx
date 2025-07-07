import React from 'react'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const success = () => {
  const query=new URLSearchParams(useLocation().search);
const paymentId=query.get("reference");
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
        <svg className="w-20 h-20 text-green-500 mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4" />
        </svg>
        <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h1>
        <p className="text-gray-700 text-center mb-6">Thank you for your payment. Your transaction has been completed successfully.</p>
        <p className="text-semibold">
          Your Payment Id: <span className='text-blue-500 font-bold'>{paymentId}</span>
        </p>
        <Link to="/" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Go to Home
        </Link>
      </div>


    </div>
  )
}

export default success
