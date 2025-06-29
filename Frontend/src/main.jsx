import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import SocketProvider from './context/SocketContext.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import {Toaster} from "react-hot-toast"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <CaptainContext>
        <UserContext>
          <BrowserRouter>
            <GoogleOAuthProvider clientId="958470556779-94getk1m1jkhuuv04ohk0j6v5vvni5v0.apps.googleusercontent.com">
              <Toaster position="top-center" />
              <App />
            </GoogleOAuthProvider>
          </BrowserRouter>
        </UserContext>
      </CaptainContext>
    </SocketProvider>
  </StrictMode>
);
