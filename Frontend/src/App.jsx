import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import Failure from './pages/failure';
import Success from './pages/success'
import AdminForm from "./pages/adminForm";
import TripDashboard from "./pages/dashboard";
import ForgetPassword from "./pages/ForgetPassword";
import CaptainForgetPassword from "./pages/CaptainForgetPassword";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/dashboard" element={<TripDashboard />} />
        <Route path="/riding" element={<Riding />}></Route>
        <Route path="/captain-riding" element={<CaptainRiding />}></Route>
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/fail" element={<Failure />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<AdminForm />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route
          path="/captain-forgetpassword"
          element={<CaptainForgetPassword />}
        />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        ></Route>

        <Route
          path="/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        ></Route>

        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        ></Route>

        <Route
          path="/captain-logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
