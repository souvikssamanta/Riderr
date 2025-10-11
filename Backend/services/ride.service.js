const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapService=require('./maps.service')
const crypto = require('crypto');

async function getFare (pickup,destination){
    
if(!pickup || !destination){
    throw new Error('pickup and destination is required');
}
const distanceTime=await mapService.getDistanceAndTime(pickup,destination);

const baseFare = {
    auto: 10,
    car: 30,
    motorcycle: 20
};

const perKmRate = {
    auto: 8,
    car: 10,
    motorcycle: 8
};

const perMinuteRate = {
    auto: 1,
    car: 3,
    motorcycle: 1.5
};
const distanceInKm = parseFloat(distanceTime.distance.replace(' km', '')); // Remove ' km' and convert to number
    //const durationInMinutes = parseFloat(distanceTime.duration.replace(' mins', '')); // Remove ' mins' and convert to number

    const fare = {
        auto: baseFare.auto + (distanceInKm * perKmRate.auto) ,
        car: baseFare.car + (distanceInKm * perKmRate.car) ,
        motorcycle: baseFare.motorcycle + (distanceInKm * perKmRate.motorcycle) 
    };

return fare;
}
module.exports.getFare=getFare;

function getOtp(num){
    const otp = crypto.randomInt(10 ** (num - 1), 10 ** num); // Generate an OTP with the specified number of digits
    return otp;
}

// console.log(getOtp(6)); // Example usage: Generate a 6-digit OTP
// console.log(getOtp(4)); // Example usage: Generate a 4-digit OTP                         

module.exports.createRide=async({userId,pickup,destination,vehicleType})=>{
  
if(!userId || !pickup ||!destination ||!vehicleType){
    throw new Error("all fields are required");
}
const fare=await getFare(pickup,destination);
const ride=rideModel.create ({
userId,
pickup,
destination,
otp:getOtp(6),
fare:fare[vehicleType]//fare['car']
})
return ride; 
}

module.exports.confirmRide=async({rideId,captainId})=>{
if(!rideId){
    throw new Error('rideId  is required');
}
if(!captainId ){
    throw new Error('captain  required');
}
await rideModel.findOneAndUpdate({_id:rideId},{
    status:'accepted',
    captain:captainId,
});
const ride=await rideModel.findOne({_id:rideId}).populate("userId").populate("captain").select("+otp").populate("userId");
if(!ride){
    throw new Error('ride not found');

}

return ride;

}

module.exports.startRide=async({rideId,otp})=>{
    if (!rideId || !otp ) {
        throw new Error("rideId, otp required");
    }
    // Find the ride by id and otp, and make sure it's not already accepted
    const ride = await rideModel.findOne({ _id: rideId }).select("+otp").populate("userId").populate("captain");
    if (!ride) {
        throw new Error("Invalid rideId ");
    }
   
if(ride.otp!==otp){
 throw new Error("Invalid otp");
}

if (ride.status !=="accepted") {
  throw new Error("ride not accepted!!");
}
    const updatedRide = await rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: 'ongoing'},
       
    );
    sendMessageToSocketId(ride.userId.socketId, {
      event: "ride-started",
      data: ride,
    });
    return ride;

}

module.exports.finishRide=async({rideId})=>{
    if (!rideId) {
        throw new Error("rideId is required");
    }
    const ride = await rideModel.findOne({ _id: rideId }).populate("userId").populate("captain");
    if (!ride) {
        throw new Error("ride not found");

    }
if(ride.status!=="ongoing"){
    throw new Error("ride is not ongoing");
}
const updatedRide=await rideModel.findByIdAndUpdate(rideId,{
    status:"completed"
})

return ride;
}




