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
      //after clicking ok on pop up it will be navigated to login
      //before then we see userlogout paragraph.
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
