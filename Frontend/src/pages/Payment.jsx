import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useContext } from 'react'


const Payment = (props) => {

const fare=props.fare;
const response = axios.post(`${import.meta.env.VITE_BACKEND_URL}/payment`, {
  amount: fare,
});

if(response.status===200){
  console.log("Payment successful");
}
else{
    console.log("Payment failed");}   


  return (
    <div>
      
    </div>
  )
}

export default Payment
