import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext(null);

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io(`${import.meta.env.VITE_BACKEND_URL}`); // Replace with your server URL
    setSocket(newSocket);

    // Log connection and disconnection events
    newSocket.on('connect', () => {
      console.log('Connected to server:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  
  return (
    <SocketContext.Provider value={ [socket] }>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
