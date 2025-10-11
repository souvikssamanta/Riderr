
import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { FaCarAlt, FaPhoneAlt } from "react-icons/fa";
import { IoPersonOutline, IoCarSportOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  if (!captain || !captain.fullname) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading driver information...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto  flex flex-col   rounded-xl shadow-lg"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full rounded-xl  shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-center py-2 text-white">
          <h1 className="text-2xl font-bold">Driver Profile</h1>
          <p className="text-blue-100">Vehicle and contact information</p>
        </div>

        {/* Content */}
        <div className="px-4 py-3 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <IoPersonOutline className="mr-2 text-blue-600" />
                Personal Details
              </h2>

              <div className="flex items-center">
                {captain.profilePic && (
                  <img src={captain.profilePic} alt="Profile" width="150" />
                )}
                <span className="text-gray-600 w-32">Name:</span>
                <span className="font-medium">
                  {captain.fullname.firstname} {captain.fullname.lastname}
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 w-32">Contact:</span>
                <span className="font-medium flex items-center">
                  <FaPhoneAlt className="mr-2 text-blue-500" />
                  {captain.contact}
                </span>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <IoCarSportOutline className="mr-2 text-blue-600" />
                Vehicle Details
              </h2>

              <div className="flex items-center">
                <span className="text-gray-600 w-32">License:</span>
                <span className="font-medium">{captain.vehicle.License}</span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 w-32">Plate No:</span>
                <span className="font-medium flex items-center">
                  <FaCarAlt className="mr-2 text-blue-500" />
                  {captain.vehicle.plate}
                </span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 w-32">Vehicle Type:</span>
                <span className="font-medium capitalize">
                  {captain.vehicle.vehicleType}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaptainDetails;







//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     contact: "",
//     vehiclePlate: "",
//     vehicleLicense: "",
//     vehicleType: "",
    
//   });
//   const [profilePic, setProfilePic] = useState(null);
//   const navigate = useNavigate();
//   const { setCaptain } = useContext(CaptainDataContext);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
// const handleFileChange = (e) => {
//   setProfilePic(e.target.files[0]);
  
// };



// const photohandler=async()=>{
//   e.preventDefault()
//    try {
//      const response = await axios.post(
//        `${import.meta.env.VITE_BACKEND_URL}/captains/upload`,
//        {profilePic},
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//      );

//      if (response.status === 201) {
//        const data = response.data;
//        //setCaptain(data.captain);
       
//        toast.success("uploaded successfully");
       
//      }
//    } catch (error) {
//      console.error(error);
//      toast.error(error.response?.data?.message || "upload failed");
//    }

// }



















