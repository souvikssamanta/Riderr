import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
const navigate=useNavigate()
const token=localStorage.getItem('token')

axios
  .get(`${import.meta.env.VITE_BACKEND_URL}/captains/logout`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    if (response.status === 200) {
      localStorage.removeItem("token");
      alert("captain logged out");
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
