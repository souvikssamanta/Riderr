import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
const UserLogout = () => {
const token=localStorage.getItem('token')
const navigate=useNavigate()
axios
  .get(`${import.meta.env.VITE_BACKEND_URL}/users/logout`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    if (response.status === 200) {
      localStorage.removeItem("token");
     toast.success("loggedout sucessfully");
      
      navigate("/login");
    }
  });

  return (
    <div>
      userlogout
    </div>
  )
}

export default UserLogout
