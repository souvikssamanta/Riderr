const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "Firstname must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Lastname must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    unique: true,
    selct: false,
  },
  socketid: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  contact: {
    type: Number,
    required: true,
    min: [10, "Capacity must be at least 10"],
  },
  vehicle: {
    License: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 characters long"],
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorbike", "auto"],
    },
  },
  socketId: {
    type: String,
  },

  location: {
    ltd: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
    captainSchema.statics.hashPassword = async function (password) {
        return await bcrypt.hash(password, 10);
    }   


const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel;








