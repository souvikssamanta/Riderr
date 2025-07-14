const captainModel=require('../models/captain.model');
module.exports.createCaptain= ({
    firstname,lastname,email,password,contact,plate,License,vehicleType
})=>{
if(!firstname ||!email || !password || !contact || !plate  || !vehicleType){
    throw new Error('all fields are required');
}
const captain = captainModel.create({
    fullname:{
        firstname,
        lastname
    },
    email,
    password,
    contact,
    vehicle:{
        License,
        plate,
        vehicleType
    }

})
return captain;
}
















