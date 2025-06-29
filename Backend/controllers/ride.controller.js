
const express = require('express');
const rideService=require('../services/ride.service')
const {validationResult}=require('express-validator')
const mapsService=require('../services/maps.service')
const {sendMessageToSocketId}=require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide=async(req,res)=>{
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
}
const {pickup,destination,vehicleType}=req.body;
 
 
try{

    const ride=await rideService.createRide({userId:req.user._id,pickup,destination,vehicleType});
    res.status(201).json(ride);
   
    const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);
    
    const captainInRadious=await mapsService.getCaptainsInTheRadious(pickupCoordinates.latitude,pickupCoordinates.longitude,200);
   
    ride.otp="";

     const rideWithUser=await rideModel.findOne({_id:ride._id}).populate('userId');
     
    
   captainInRadious.map(captain=>{
    sendMessageToSocketId(captain.socketId,{
        event:'newRide',
        data:rideWithUser
   })

})
}
catch(err){
    if(!res.headersSent){
        return res.status(400).json({message:err.message});
    }
  
}
}
module.exports.getFare=async(req,res)=>{
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
    
}
try{
    const {pickup,destination}=req.query;
    
    const fare=await rideService.getFare(pickup,destination);
   
    res.status(200).json(fare);
}
catch(err){
    return res.status(400).json({message:err.message});
}
}
module.exports.confirmRide=async(req,res)=>{
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
}
const {rideId,captainId}=req.body;

try{
    const ride=await rideService.confirmRide({rideId,captainId});
    sendMessageToSocketId(ride.userId.socketId,{
        event:'ride-confirmed',
        data:ride
    })
  
    return res.status(200).json(ride);
}

catch(err){
    console.log(err);
    return res.status(400).json({message:err.message});
}
}

module.exports.startRide=async(req,res)=>{
const errors=validationResult(req);
if(!errors.isEmpty()){
return res.status(400).json({errors:errors.array()})
}
const{rideId,otp}=req.query;
try{
    const ride=await rideService.startRide({rideId,otp});
    if(!ride){
        return res.status(404).json({message:"ride not found"});
    }
    


return res.status(200).json(ride);
} catch (err) {
    return res.status(400).json({message:err.message})
}


}

module.exports.finishRide=async(req,res)=>{
const errors=validationResult(req); 
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}
const {rideId}=req.body;
try{
    const ride=await rideService.finishRide({rideId});
    if(!ride){
        return res.status(404).json({message:"ride not found"});
    }
    sendMessageToSocketId(ride.userId.socketId,{
        event:'ride-finished',
        data:ride
    })
    return res.status(200).json(ride);
}
catch(err){
    return res.status(400).json({message:err.message})
}

}







