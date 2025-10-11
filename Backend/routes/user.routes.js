const express=require("express")
const router=express.Router()
const {body, check}=require("express-validator");
const userController=require("../controllers/user.controller")
const { newPayment, checkPaymentStatus } = require("../controllers/payment.controller");
const authMiddleware=require("../middlewares/auth.middlewares")
// ---REGISTER----
router.post('/register',[
body("email").isEmail().withMessage("Invalid Email"),
body("fullname.firstname").isLength({min:3}).withMessage("firstname must be 3 character"),
body("password").isLength({min:6}).withMessage("password must have 6 characters")
],
    userController.registerUser
)

router.post(
  "/google-register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("firstname")
      .isLength({ min: 3 })
      .withMessage("firstname must be 3 character"),
    
  ],
  userController.googleregisterUser
);


 //----LOGIN----
 router.post('/login',[
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({min:6}).withMessage("password must have 6 character")
 ],userController.loginUser
)
 //---PROFILE---
router.get("/profile",authMiddleware.authUser,userController.getProfile);
//--LOGOUT---
router.get("/logout",authMiddleware.authUser,userController.logoutUser)
// reset password
router.post("/sendOtp",[
  body("email").isEmail().withMessage("Invalid Email"),
], userController.sendOtp);

router.post("/verifyOtp",[body
("email").isEmail().withMessage("Invalid Email"),
body("otp").isLength({min:4}).withMessage("otp must be 4 character")
],  userController.verifyOtp);
router.post("/resetPassword",[

body("newPassword").isLength({min:8}).withMessage("password must have 8 characters")
],userController.resetPassword);
module.exports=router




