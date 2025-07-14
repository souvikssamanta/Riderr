//import {toast} from 'react-hot-toast'
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklist.token");

module.exports.registerCaptain=async(req,res,next)=>{
const errors=validationResult(req);
    if(!errors.isEmpty()){  
        console.log(errors);
        return res.status(400).json({errors:errors.array()})
    }
    const{fullname,email,contact,password,vehicle}=req.body;
 const isCaptainExist=await captainModel.findOne({email})

 if(isCaptainExist){
return res.status(400).json({message:"captain already exists"});
 }

    const hashedpassword= await captainModel.hashPassword(password)

    const captain=await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        contact,
        password:hashedpassword,
       
        plate:vehicle.plate,
        License:vehicle.License,
        vehicleType:vehicle.vehicleType

    })
const token=captain.generateAuthToken();

res.status(201).json({token,captain})


}

module.exports.loginCaptain=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const{email,password}=req.body;
    const captain=await captainModel.findOne({email}).select("+password");
    if(!captain){
      
        return res.status(400).json({message:"Invalid email or password"})
    }
    const isValid=await captain.comparePassword(password)
    if(!isValid){
        return res.status(400).json({message:"Invalid email or password"})
    }
    const token=captain.generateAuthToken();
    res.cookie("token",token)
    res.status(200).json({token,captain})
}

module.exports.getCaptainProfile=(req,res)=>{
    res.status(200).json({captain:req.captain});
}

module.exports.logoutCaptain=async(req,res)=>{
res.clearCookie('token');
const token=req.cookies.token||req.headers.authorization.split(" ")[1];
await blacklistTokenModel.create({token});
res.status(200).json({message:"logout sucessfully"})
}




