const captainModel=require('../models/captain.model');
module.exports.createCaptain= ({
    firstname,lastname,email,password,color,plate,capacity,vehicleType
})=>{
if(!firstname ||!email || !password || !color || !plate || !capacity || !vehicleType){
    throw new Error('all fields are required');
}
const captain = captainModel.create({
    fullname:{
        firstname,
        lastname
    },
    email,
    password,
    vehicle:{
        color,
        plate,
        capacity,
        vehicleType
    }

})
return captain;
}
















