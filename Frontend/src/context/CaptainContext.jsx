import React, { createContext } from "react";
import { useState } from "react";
export const CaptainDataContext = createContext();
function Captaincontext({ children }) {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const updateCaptain = (captainData) => {
  //   setCaptain(captainData);
  // };

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    //updateCaptain,
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
}

export default Captaincontext;
