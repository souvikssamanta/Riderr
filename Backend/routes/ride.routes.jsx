const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const {body,query} = require("express-validator");
router.post('/create',authMiddleware.authUser,
    body("pickup").isString().isLength({min:3}).withMessage("pickup is required"),
    body("destination").isString().isLength({min:3}).withMessage("destination is required"),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('vehicleType is required and should be one of auto, car, motorcycle'),
    rideController.createRide

);
router.get('/get-fare',authMiddleware.authUser,
query("pickup").isString().isLength({min:3}).withMessage('invalid pickup'),
query("destination").isString().isLength({min:3}).withMessage('invalid destination'),
rideController.getFare
)
router.post('/confirm',
authMiddleware.authCaptain,
body("rideId").isString().withMessage('rideId is required'),
rideController.confirmRide
)

router.get(
  "/start-ride",
  authMiddleware.authCaptain,
  query("rideId").isString().withMessage("rideid required"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("otp is required and should be 6 digits"),
 
  rideController.startRide
);

router.post('/finish-ride',
  authMiddleware.authCaptain,
  body("rideId").isString().withMessage("rideId is required"),
  rideController.finishRide
);




module.exports = router;