import React, { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export const CaptainDataContext = createContext();

function Captaincontext({ children }) {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const updateCaptain = (captainData) => {
  //   setCaptain(captainData);
  // };

  

const currentCaptain=async()=>{

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/captains/profile`,
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if(response.status==200){
      setCaptain(response.data.captain);
     
    }

}

useEffect(()=>{
  currentCaptain();
},[])


const value = {
  captain,
  setCaptain,
  isLoading,
  setIsLoading,
  currentCaptain
};




  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
}

export default Captaincontext;
