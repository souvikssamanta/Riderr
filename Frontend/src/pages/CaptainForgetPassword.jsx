import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
const CaptainForgetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState();
  const [email, setEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState();

  const sendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/captains/sendOtp`,
        { email }
      );

      if (result.status == 200) {
        setLoading(false);
        toast.success(result.data.message);
        setStep(2);
      }
    } catch (error) {
      console.log(error);
      toast.error("unable to sent Otp");
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/captains/verifyOtp`,
        { email, otp }
      );
      console.log({ email, otp });
      if (result.status === 200) {
        setLoading(false);
        toast.success(result.data.message);
        setStep(3);
      }
    } catch (error) {
      toast.error("Unable to Verify");
      console.log(error);
      setOtp("");
      setStep(1);
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setLoading(true);
    try {
      if (newPassword !== confirmPassword) {
        toast.error("Password is not matched");
      }

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/captains/resetPassword`,
        { email, newPassword }
      );

      if (result.status == 200) {
        setLoading(false);
        toast.success(result.data.message);
        navigate("/captain-login");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Unable to reset password");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto container p-6 bg-amber-50 rounded-lg shadow-md mt-50">
      {/* Step 1: Email Input */}
      {step === 1 && (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6  ">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Reset Password
          </h2>
          <p className="text-gray-600 text-center">
            Enter your email address to receive a password reset OTP
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => sendOtp()}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? <ClipLoader size={30} color="white" /> : "send Otp"}
            </button>

            <div className="text-center">
              <Link
                to={"/captain-login"}
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </form>
      )}

      {/* Step 2: OTP Verification */}
      {step === 2 && (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Verify OTP
          </h2>
          <p className="text-gray-600 text-center">
            We've sent a 4-digit code to your email. Please enter it below.
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                OTP Code
              </label>
              <input
                type="text"
                value={otp}
                id="otp"
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center tracking-widest"
                placeholder="------"
                required
              />
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => verifyOtp()}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? <ClipLoader size={30} color="white" /> : "verify Otp"}
            </button>

            <div className="text-center text-sm text-gray-600">
              Didn't receive code?{" "}
              <button
                type="button"
                disabled={loading}
                onClick={() => verifyOtp()}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Resend
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Step 3: New Password */}
      {step === 3 && (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create New Password
          </h2>
          <p className="text-gray-600 text-center">
            Your new password must be different from previous used passwords.
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                id="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Minimum 8 characters with at least one number and one special
                character
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => resetPassword()}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CaptainForgetPassword;
