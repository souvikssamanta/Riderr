const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "captain",
  },
  pickup: {
    type: String,
    required: true,
    minlength: [3, "Pickup location must be at least 3 characters long"],
  },
  destination: {
    type: String,
    required: true,
    minlength: [3, "Destination must be at least 3 characters long"],
  },
  fare: {
    type: Number,
    required: true,
    min: [0, "Fare must be a positive number"],
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "canceled"],
    default: "pending",
  },

  distance: {
    type: Number,
  },
  paymentType: {
    type:String,
    enum: ["cash","online"],
    default: "cash",
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp: {
    type: String,
    select: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports=mongoose.model('ride',rideSchema);




























