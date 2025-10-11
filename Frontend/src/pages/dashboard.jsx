


  
//     import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ChevronUpDownIcon,
//   ArrowPathIcon,
//   CheckCircleIcon,
//   XCircleIcon,
//   ClockIcon,
//   BanknotesIcon,
//   CreditCardIcon,
//   CurrencyDollarIcon
// } from '@heroicons/react/24/outline';

// const TripDashboard = () => {
//   const [trips, setTrips] = useState([]);
//   const [filteredTrips, setFilteredTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     status: 'all',
//     payment: 'all',
//     sort: 'newest'
//   });

//   // Fetch trip data (mock data in this example)
//   useEffect(() => {
//     const fetchTrips = async () => {
//       // Simulate API call
//       setTimeout(() => {
//         setTrips(mockTrips);
//         setFilteredTrips(mockTrips);
//         setLoading(false);
//       }, 1000);
//     };
    
//     fetchTrips();
//   }, []);

//   // Apply filters
//   useEffect(() => {
//     let result = [...trips];
    
//     // Status filter
//     if (filters.status !== 'all') {
//       result = result.filter(trip => trip.status === filters.status);
//     }
    
//     // Payment filter
//     if (filters.payment !== 'all') {
//       result = result.filter(trip => trip.paymentMode === filters.payment);
//     }
    
//     // Sorting
//     if (filters.sort === 'newest') {
//       result.sort((a, b) => new Date(b.date) - new Date(a.date));
//     } else {
//       result.sort((a, b) => new Date(a.date) - new Date(b.date));
//     }
    
//     setFilteredTrips(result);
//   }, [filters, trips]);

//   const handleFilterChange = (filterName, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterName]: value
//     }));
//   };

//   const refreshData = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 800);
//   };

//   const getStatusIcon = (status) => {
//     switch(status) {
//       case 'completed':
//         return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
//       case 'cancelled':
//         return <XCircleIcon className="h-5 w-5 text-red-500" />;
//       case 'in-progress':
//         return <ClockIcon className="h-5 w-5 text-yellow-500" />;
//       default:
//         return null;
//     }
//   };

//   const getPaymentIcon = (mode) => {
//     switch(mode) {
//       case 'cash':
//         return <BanknotesIcon className="h-5 w-5 text-gray-600" />;
//       case 'card':
//         return <CreditCardIcon className="h-5 w-5 text-blue-500" />;
//       case 'wallet':
//         return <CurrencyDollarIcon className="h-5 w-5 text-purple-500" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <motion.div 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-7xl mx-auto"
//       >
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Trip Management</h1>
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={refreshData}
//               className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition"
//             >
//               <ArrowPathIcon className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Filters */}
//         <motion.div 
//           className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <div className="bg-white p-4 rounded-lg shadow">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//             <select 
//               value={filters.status}
//               onChange={(e) => handleFilterChange('status', e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="all">All Statuses</option>
//               <option value="completed">Completed</option>
//               <option value="in-progress">In Progress</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//           </div>
          
//           <div className="bg-white p-4 rounded-lg shadow">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Payment Mode</label>
//             <select 
//               value={filters.payment}
//               onChange={(e) => handleFilterChange('payment', e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="all">All Payment Modes</option>
//               <option value="cash">Cash</option>
//               <option value="card">Card</option>
//               <option value="wallet">Wallet</option>
//             </select>
//           </div>
          
//           <div className="bg-white p-4 rounded-lg shadow">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
//             <select 
//               value={filters.sort}
//               onChange={(e) => handleFilterChange('sort', e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="newest">Newest First</option>
//               <option value="oldest">Oldest First</option>
//             </select>
//           </div>
//         </motion.div>

//         {/* Trip List */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           {/* Table Header */}
//           <div className="grid grid-cols-12 bg-gray-100 p-4 font-medium text-gray-700">
//             <div className="col-span-3 md:col-span-2 flex items-center">
//               Passenger
//               <ChevronUpDownIcon className="h-4 w-4 ml-1" />
//             </div>
//             <div className="col-span-3 md:col-span-2">Pickup</div>
//             <div className="col-span-3 md:col-span-2">Destination</div>
//             <div className="hidden md:block md:col-span-1">Driver</div>
//             <div className="col-span-2 md:col-span-1 text-right">Fare</div>
//             <div className="col-span-1 text-center">Status</div>
//             <div className="hidden md:block md:col-span-1 text-center">Payment</div>
//           </div>
          
//           {/* Table Body */}
//           {loading ? (
//             <div className="p-8 text-center">
//               <ArrowPathIcon className="h-8 w-8 mx-auto animate-spin text-blue-500" />
//               <p className="mt-2 text-gray-600">Loading trips...</p>
//             </div>
//           ) : (
//             <AnimatePresence>
//               {filteredTrips.length > 0 ? (
//                 filteredTrips.map((trip, index) => (
//                   <motion.div
//                     key={trip.id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.05 }}
//                     exit={{ opacity: 0 }}
//                     className="grid grid-cols-12 p-4 border-b border-gray-200 hover:bg-gray-50 transition"
//                   >
//                     <div className="col-span-3 md:col-span-2 font-medium flex items-center">
//                       <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                         <span className="text-blue-600 font-medium">
//                           {trip.passengerName.charAt(0)}
//                         </span>
//                       </div>
//                       <span>{trip.passengerName}</span>
//                     </div>
//                     <div className="col-span-3 md:col-span-2 text-gray-600 truncate" title={trip.pickup}>
//                       {trip.pickup}
//                     </div>
//                     <div className="col-span-3 md:col-span-2 text-gray-600 truncate" title={trip.destination}>
//                       {trip.destination}
//                     </div>
//                     <div className="hidden md:block md:col-span-1 text-gray-600">
//                       {trip.driverName}
//                     </div>
//                     <div className="col-span-2 md:col-span-1 text-right font-medium">
//                       ${trip.fare.toFixed(2)}
//                     </div>
//                     <div className="col-span-1 flex justify-center">
//                       {getStatusIcon(trip.status)}
//                     </div>
//                     <div className="hidden md:flex md:col-span-1 justify-center">
//                       {getPaymentIcon(trip.paymentMode)}
//                     </div>
//                   </motion.div>
//                 ))
//               ) : (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="p-8 text-center text-gray-500"
//                 >
//                   No trips found matching your filters
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // Mock data
// const mockTrips = [
  // {
  //   id: 1,
  //   passengerName: "John Doe",
  //   pickup: "123 Main St, New York",
  //   destination: "JFK International Airport",
  //   fare: 45.50,
  //   status: "completed",
  //   paymentMode: "card",
  //   driverName: "Michael Smith",
  //   date: "2023-05-15T10:30:00"
  // },
  // {
  //   id: 2,
  //   passengerName: "Sarah Johnson",
  //   pickup: "456 Park Ave, Brooklyn",
  //   destination: "LaGuardia Airport",
  //   fare: 38.75,
  //   status: "in-progress",
  //   paymentMode: "wallet",
  //   driverName: "David Wilson",
  //   date: "2023-05-15T11:15:00"
  // },
  // {
  //   id: 3,
  //   passengerName: "Robert Chen",
  //   pickup: "789 Broadway, Manhattan",
  //   destination: "Times Square",
  //   fare: 22.00,
  //   status: "cancelled",
  //   paymentMode: "cash",
  //   driverName: "James Brown",
  //   date: "2023-05-14T09:45:00"
  // },
  // {
  //   id: 4,
  //   passengerName: "Emily Davis",
  //   pickup: "321 Elm St, Queens",
  //   destination: "Central Park",
  //   fare: 29.80,
  //   status: "completed",
  //   paymentMode: "card",
  //   driverName: "Thomas Taylor",
  //   date: "2023-05-14T14:20:00"
  // },
  // {
  //   id: 5,
  //   passengerName: "Daniel Martinez",
  //   pickup: "654 Pine St, Bronx",
  //   destination: "Yankee Stadium",
  //   fare: 18.50,
  //   status: "completed",
  //   paymentMode: "wallet",
  //   driverName: "Christopher Lee",
  //   date: "2023-05-13T16:45:00"
  // }
// ];

// export default TripDashboard;
  


import { useState, useEffect } from "react";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  BanknotesIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const TripDashboard = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all",
    payment: "all",
    sort: "newest",
  });

  
useEffect(() => {
  const fetchTrips = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/rides/trips`
      );
      const data = await response.json();
      setTrips(data);
      setFilteredTrips(data);
    } catch (err) {
      console.error("Error fetching trips:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchTrips();
}, []);
  // Apply filters
  useEffect(() => {
    let result = [...trips];

    if (filters.status !== "all") {
      result = result.filter((trip) => trip.status === filters.status);
    }

    if (filters.payment !== "all") {
      result = result.filter((trip) => trip.paymentType === filters.payment);
    }

    result.sort((a, b) =>
      filters.sort === "newest"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

    setFilteredTrips(result);
  }, [filters, trips]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
      canceled: <XCircleIcon className="h-5 w-5 text-red-500" />,
      ongoing: <ClockIcon className="h-5 w-5 text-yellow-500" />,
    };
    return icons[status] || null;
  };

  const getPaymentIcon = (mode) => {
    const icons = {
      cash: <BanknotesIcon className="h-5 w-5 text-gray-600" />,
      online: <CreditCardIcon className="h-5 w-5 text-blue-500" />,
      wallet: <CurrencyDollarIcon className="h-5 w-5 text-purple-500" />,
    };
    return icons[mode] || null;
  };

  return (
    <div className="min-h-screen bg-[#292A2D]  p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
            Trip Management
          </h1>
          <button
            onClick={refreshData}
            className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-100 transition text-sm"
          >
            <ArrowPathIcon
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-3 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="ongoing">In Progress</option>
              <option value="canceled">Cancelled</option>
            </select>
          </div>

          <div className="bg-white p-3 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Mode
            </label>
            <select
              value={filters.payment}
              onChange={(e) => handleFilterChange("payment", e.target.value)}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
            >
              <option value="all">All Payment Modes</option>
              <option value="cash">Cash</option>
              <option value="online">Online</option>
              <option value="wallet">Wallet</option>
            </select>
          </div>

          <div className="bg-white p-3 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Trip List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-gray-100 p-3 text-sm font-medium text-gray-700">
            <div className="col-span-4 sm:col-span-3 md:col-span-2">
              Passenger
            </div>
            <div className="hidden sm:block sm:col-span-2">Pickup</div>
            <div className="hidden sm:block sm:col-span-2">Destination</div>
            <div className="hidden md:block md:col-span-1">Driver</div>
            <div className="col-span-3 sm:col-span-2 md:col-span-1 text-right">
              Fare
            </div>
            <div className="col-span-2 sm:col-span-1 text-center">Status</div>
            <div className="hidden md:block md:col-span-1 text-center">
              Payment
            </div>
          </div>

          {/* Table Body */}
          {loading ? (
            <div className="p-8 text-center">
              <ArrowPathIcon className="h-8 w-8 mx-auto animate-spin text-blue-500" />
              <p className="mt-2 text-gray-600">Loading trips...</p>
            </div>
          ) : filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="grid grid-cols-12 p-3 border-b border-gray-200 hover:bg-gray-50 items-center text-sm"
              >
                <div className="col-span-4 sm:col-span-3 md:col-span-2 font-medium flex items-center truncate">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <span className="text-blue-600 text-xs">
                      {trip.userId?.fullname.firstname.charAt(0)}
                    </span>
                  </div>
                  <span className="truncate">
                    {trip.userId?.fullname.firstname +
                      " " +
                      trip.userId?.fullname.lastname}
                  </span>
                </div>
                <div className="hidden sm:block sm:col-span-2 text-gray-600 truncate">
                  {trip.pickup}
                </div>
                <div className="hidden sm:block sm:col-span-2 text-gray-600 truncate">
                  {trip.destination}
                </div>
                <div className="hidden md:block md:col-span-1 text-gray-600 truncate">
                  {trip.captain?.fullname.firstname +
                    " " +
                    trip.captain?.fullname.lastname}
                </div>
                <div className="col-span-3 sm:col-span-2 md:col-span-1 text-right font-medium">
                  {trip.fare.toFixed(2)}
                </div>
                <div className="col-span-2 sm:col-span-1 flex justify-center">
                  {getStatusIcon(trip.status)}
                </div>
                <div className="hidden md:flex md:col-span-1 justify-center">
                  {getPaymentIcon(trip.paymentType)}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No trips found matching your filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Mock data (same as before)
// const mockTrips = [
//   {
//     id: 1,
//     passengerName: "John Doe",
//     pickup: "123 Main St, New York",
//     destination: "JFK International Airport",
//     fare: 45.5,
//     status: "completed",
//     paymentMode: "card",
//     driverName: "Michael Smith",
//     date: "2023-05-15T10:30:00",
//   },
//   {
//     id: 2,
//     passengerName: "Sarah Johnson",
//     pickup: "456 Park Ave, Brooklyn",
//     destination: "LaGuardia Airport",
//     fare: 38.75,
//     status: "in-progress",
//     paymentMode: "wallet",
//     driverName: "David Wilson",
//     date: "2023-05-15T11:15:00",
//   },
//   {
//     id: 3,
//     passengerName: "Robert Chen",
//     pickup: "789 Broadway, Manhattan",
//     destination: "Times Square",
//     fare: 22.0,
//     status: "cancelled",
//     paymentMode: "cash",
//     driverName: "James Brown",
//     date: "2023-05-14T09:45:00",
//   },
//   {
//     id: 4,
//     passengerName: "Emily Davis",
//     pickup: "321 Elm St, Queens",
//     destination: "Central Park",
//     fare: 29.8,
//     status: "completed",
//     paymentMode: "card",
//     driverName: "Thomas Taylor",
//     date: "2023-05-14T14:20:00",
//   },
//   {
//     id: 5,
//     passengerName: "Daniel Martinez",
//     pickup: "654 Pine St, Bronx",
//     destination: "Yankee Stadium",
//     fare: 18.5,
//     status: "completed",
//     paymentMode: "wallet",
//     driverName: "Christopher Lee",
//     date: "2023-05-13T16:45:00",
//   },
// ];

export default TripDashboard;