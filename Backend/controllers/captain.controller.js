//import {toast} from 'react-hot-toast'
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklist.token");
const mailservice = require("../services/sendMail");



module.exports.registerCaptain=async(req,res,next)=>{
const errors=validationResult(req);
    if(!errors.isEmpty()){  
        console.log(errors);
        return res.status(400).json({errors:errors.array()})
    }
    const{fullname,email,contact,password,vehicle}=req.body;
    console.log(req.file)
    
    
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
module.exports.googleloginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstname, lastname, email } = req.body;

  const captain = await captainModel.findOne({ email });

  if (!captain) {
    return res.status(400)
  }
  const token = captain.generateAuthToken();
  res.cookie("token", token, {
    // httpOnly:true,
    // sameSite:"none",
    // secure:true,
    // maxAge:7*24*3600*1000
  });
  return res.status(201).json({ token, captain });
}; 

//

module.exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const captain = await captainModel.findOne({ email });

    if (!captain) {
      return res.status(400).json({ message: "captain not found" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    captain.resetOtp = otp;
    captain.otpExpires = Date.now() + 5 * 60 * 1000;
    captain.isOtpVerified = false;
    await captain.save();
    await mailservice.sendMail(email, otp);

    return res.status(200).json({ message: "otp send sucessfully" });
  } catch (error) {
    console.log("Error sending OTP:", error);
    return res.status(500).json({ message: error });
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "email and otp are required" });
    }
    const captain= await captainModel.findOne({ email });

    if (!captain) {
      return res.status(400).json({ message: "captain not found" });
    }
    if (captain.resetOtp != otp || captain.otpExpires < Date.now()) {
      return res.status(400).json({ message: "invalid otp" });
    }
    captain.isOtpVerified = true;
    captain.resetOtp = undefined;
    captain.otpExpires = undefined;

    await captain.save();

    return res.status(200).json({ message: "otp verified sucessfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
module.exports.resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "email and newPassword are required" });
    }

    const captain = await captainModel.findOne({ email });
    if (!captain) {
      return res.status(400).json({ message: "captain not found" });
    }
    if (!captain.isOtpVerified) {
      return res.status(400).json({ message: "otp not verified" });
    }
    const hashPassword = await captainModel.hashPassword(newPassword);

    captain.isOtpVerified = true;
    await captain.save();
    return res.status(200).json({ message: "password is reset successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};













