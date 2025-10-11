
const nodemailer = require("nodemailer");
const transporter =nodemailer.createTransport ({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});
module.exports.sendMail=async(to,otp) => {
  const info = await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: to,
    subject:"Reset Your Password",
   
    html: `<p>Your otp for Password Reset is <b>${otp}</b> it Expires in 5 minutes </p>`
  });

}




