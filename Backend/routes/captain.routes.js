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
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage("Invalid vehicle type"),
    
    ],
    captainController.registerCaptain
)
router.post('/login',[
    body("email").isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    ],
    captainController.loginCaptain
)

router.get("/profile",authMiddleware.authCaptain,captainController.getCaptainProfile);


router.get('/captain-logout',authMiddleware.authCaptain,captainController.logoutCaptain);
module.exports=router;











