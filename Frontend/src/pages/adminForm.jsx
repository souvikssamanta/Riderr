import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const AdminForm = () => {
const [secretCode, setSecretCode] = useState("");
const navigate = useNavigate();

const submitHandler =  (e) => {
    e.preventDefault();
   
    if(secretCode !== import.meta.env.VITE_ADMIN_SECRET_CODE) {
      toast.error("Invalid secret code");
        navigate('/')
    }
    else {
    toast.success("Admin registration successful");
    navigate('/dashboard');
  };
}
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Admin Registration
          </h2>
        </div>

        <form onSubmit={submitHandler} className="p-6 space-y-6">
          
          {/* Secret Code Field */}
          <div>
            <label
              htmlFor="secretCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Secret Code
            </label>
            <input
              type="password"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
             
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

        
         

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
