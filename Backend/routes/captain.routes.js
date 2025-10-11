const express=require('express');
const router=express.Router()
const captainController=require("../controllers/captain.controller")
const authMiddleware=require('../middlewares/auth.middlewares')
const {body}=require('express-validator');





router.post('/register',[
    body("email").isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage("first name must have 3 characters"),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body("contact").isLength({min:10}).withMessage("Contact must be 10 characters long"),
    body('vehicle.plate').isLength({min:3}).withMessage("Plate must be at least 3 characters long"),
    body('vehicle.License').isLength({min:5}).withMessage("License must be a number"),
    body('vehicle.vehicleType').isIn(['car','motorbike','auto']).withMessage("Invalid vehicle type"),
    
    ],
    captainController.registerCaptain
)

router.post(
  "/google-login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("firstname")
      .isLength({ min: 3 })
      .withMessage("firstname must be 3 character"),
    
  ],
  captainController.googleloginCaptain
);





router.post('/login',[
    body("email").isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    ],
    captainController.loginCaptain
)

router.get("/profile",authMiddleware.authCaptain,captainController.getCaptainProfile);


router.get('/captain-logout',authMiddleware.authCaptain,captainController.logoutCaptain);

router.post("/sendOtp",[
  body("email").isEmail().withMessage("Invalid Email"),
], captainController.sendOtp);

router.post("/verifyOtp",[body
("email").isEmail().withMessage("Invalid Email"),
body("otp").isLength({min:4}).withMessage("otp must be 4 character")
],  captainController.verifyOtp);
router.post("/resetPassword",[

body("newPassword").isLength({min:8}).withMessage("password must have 8 characters")
],captainController.resetPassword);







module.exports=router;











