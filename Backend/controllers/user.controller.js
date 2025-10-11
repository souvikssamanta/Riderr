
const userModel = require("../models/user.model");
const userService=require("../services/user.sevices")
const {validationResult}=require("express-validator")
const blacklistTokenModel=require("../models/blacklist.token");
const mailservice=require('../services/sendMail');

module.exports.registerUser=async(req,res,next)=>{
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}
const{fullname,email,password}=req.body;

const isUserExist=await userModel.findOne({email})

if(isUserExist){
return res.status(400).json({message:"user already exists"});
}
const hashedPassword=await userModel.hashPassword(password)

const user =await userService.createUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashedPassword

})
const token=user.generateAuthtoken();
res.cookie("token",token,{
    // httpOnly:true,
    // sameSite:"none",
    // secure:true,
    // maxAge:7*24*3600*1000
})
return res.status(201).json({token,user})

} 
module.exports.googleregisterUser=async(req,res,next)=>{
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}
const{firstname,lastname,email}=req.body;

const user=await userModel.findOne({email})

if(!user){
 user =await userService.createUser({
    firstname,
    lastname,
    email,
   
})
}
const token=user.generateAuthtoken();
res.cookie("token",token,{
    // httpOnly:true,
    // sameSite:"none",
    // secure:true,
    // maxAge:7*24*3600*1000
})
return res.status(201).json({token,user})

} 


//---login---
module.exports.loginUser=async(req,res,next)=>{
const errors=validationResult(req);
if(!errors.isEmpty()){
return res.status(400).json({errors:errors.array()})
}
const{email,password}=req.body;
//only return password to user
const user=await userModel.findOne({email}).select("+password");

if(!user){
return res.status(401).json({errors:"invalid email"})
}
const isMatch=await user.comparePassword(password);
if(!isMatch){
    return res.status(401).json({errors:"invalid  password"})
}
const token=user.generateAuthtoken();
res.cookie("token", token, {
  httpOnly: true,
  sameSite: "none",
  secure:true,
  maxAge: 7 * 24 * 3600 * 1000,
 
});
return res.status(200).json({token,user})
}
//---profile----
module.exports.getProfile=async (req,res,next)=>{
res.status(200).json(req.user);
    
}
//---logout---
module.exports.logoutUser=async(req,res,next)=>{
const token=req.cookies.token || req.headers.authorization.split(" ")[1];
await blacklistTokenModel.create({token})
res.clearCookie('token');
res.status(200).json({message:"logout successfully"})
}

module.exports.sendOtp=async(req,res)=>{

try {
    const {email}=req.body
    const user=await userModel.findOne({email})
    
    if(!user){
        return res.status(400).json({message:"user not found"})
        
    }
const otp=Math.floor(1000+Math.random()*9000).toString()
user.resetOtp=otp
user.otpExpires=Date.now()+5*60*1000
user.isOtpVerified=false;
await user.save()
await mailservice.sendMail(email,otp)

return res.status(200).json({message:"otp send sucessfully"})

} catch (error) {
    console.log("Error sending OTP:", error);
    return res.status(500).json({message:error})
}


}

module.exports.verifyOtp=async(req,res)=>{
try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,otp}=req.body
    
    if(!email || !otp){
        return res.status(400).json({ message: "email and otp are required" });
    }
      const user = await userModel.findOne({email});
      
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }
if(user.resetOtp!=otp ||user.otpExpires < Date.now()){
  return res.status(400).json({ message: "invalid otp" });  
}
user.isOtpVerified = true;
user.resetOtp =undefined;
user.otpExpires =undefined ;

await user.save();

return res.status(200).json({ message: "otp verified sucessfully" });


} catch (error) {
    return res.status(500).json({ message: error });
}
}
module.exports.resetPassword=async(req,res)=>{
    try {
        const errors=validationResult(req);
         if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
         }
         const { email, newPassword } = req.body;
         if(!email|| !newPassword){
            return res.status(400).json({ message: "email and newPassword are required" }); 
         }
        
        const user = await userModel.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: "user not found" });
        }
        if(!user.isOtpVerified){
             return res.status(400).json({ message: "otp not verified" });
        }
        const hashPassword = await userModel.hashPassword(newPassword);
        user.password=hashPassword;
     user.isOtpVerified=false
        await user.save()
        return res.status(200).json({ message: "password is reset successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error });
    }
}









