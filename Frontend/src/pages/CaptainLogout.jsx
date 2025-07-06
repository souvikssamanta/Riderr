import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
const CaptainLogout = () => {
const navigate=useNavigate()
const token=localStorage.getItem('token')

axios
  .get(`${import.meta.env.VITE_BACKEND_URL}/captains/captain-logout`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    if (response.status === 200) {
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      navigate("/captain-login");
    }
  });

  return (
    <div>
      log out
    </div>
  )
}

export default CaptainLogout
