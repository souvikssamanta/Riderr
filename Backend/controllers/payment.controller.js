const paymentModel = require("../models/payment.model.js");
const razorpay = require("razorpay");
const crypto=require('crypto');
//intialize razorpay
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports.newpayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const orderData = {
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(), 
    };

    const newOrder = new paymentModel(orderData);
    await newOrder.save();

    const options = {
      amount: Number(amount) * 100, // ensure integer paise
      currency: "INR",
      receipt: newOrder._id.toString(), // use receipt for Razorpay
    };
    const order = await razorpayInstance.orders.create(options);

    res.status(200).json({ success: true, order }); // fixed typo and key
  } catch (error) {
    console.error("Payment error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Payment failed",
        error: error.message,
      });
  }
};
module.exports.verification=async(req,res)=>{
const{razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body;
const body = razorpay_order_id + "|" + razorpay_payment_id;
const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex")
console.log("expectedSignature",expectedSignature);
console.log("razorpay_signature",razorpay_signature);
const isAuthentic = razorpay_signature === expectedSignature;
console.log("isAuthentic",isAuthentic);
if(isAuthentic){

return  res.status(200).json({ success: true});
}
else{
return  res.status(400).json({ success: false });
}



}



