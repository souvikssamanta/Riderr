const axios = require('axios');
const captainModel= require('../models/captain.model');
module.exports.getAddressCoordinate = async (address) => {
  try {
    // Ensure you have your Google Maps API key in the environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Maps API key is missing in environment variables.');
    }

    // Construct the Google Maps Geocoding API URL
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    // Make a GET request to the Geocoding API
    const response = await axios.get(url);

    // Check if the API response is successful
    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      throw new Error(`Geocoding API error: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error;
  }
};

module.exports.getDistanceAndTime = async (pickup, destination) => {
try {
    // Ensure you have your Google Maps API key in the environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Maps API key is missing in environment variables.');
    }

    // Construct the Google Maps Distance Matrix API URL
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(pickup)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    // Make a GET request to the Distance Matrix API
    const response = await axios.get(url);

    // Check if the API response is successful
    if (response.data.status === 'OK') {
      const element = response.data.rows[0].elements[0];
      return {
        distance: element.distance.text,
        duration: element.duration.text,
      };
    } else {
      throw new Error(`Distance Matrix API error: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching distance and time:', error.message);
    throw error;
  }  

}

module.exports.getAutoCompleteSuggestions=async(input)=>{
if(!input){
  throw new Error('input is required');
}

const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error('Google Maps API key is missing in environment variables.');
    }
    try{
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const predictions = response.data.predictions.map(prediction => prediction.description);
      return predictions;
    } else {
      throw new Error(`Autocomplete API error: ${response.data.status}`);
    }
  }
  // Handle any errors that occur during the API request
catch(error){
    console.error('Error fetching autocomplete suggestions:', error.message);
    throw error;
  }


}

module.exports.getCaptainsInTheRadious=async(ltd,lng,radious)=>{
const captains=await captainModel.find({  
location:{
    $geoWithin: {
      $centerSphere: [[ltd,lng ], radious / 6371] // radious in km
    }
  }

})

return captains;
}



  





