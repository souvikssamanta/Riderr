const mongoose=require("mongoose")
const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: [0, "Fare must be a positive number"],
  },
});

module.exports=mongoose.model('payment',paymentSchema);
