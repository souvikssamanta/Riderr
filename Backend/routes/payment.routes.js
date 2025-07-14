
const authMiddleware = require("../middlewares/auth.middlewares");
const { body, query } = require("express-validator");
const {newpayment,verification} = require("../controllers/payment.controller.js");
const express = require("express");
const router = express();

router.post("/payment", authMiddleware.authUser,newpayment);
router.post("/verification", authMiddleware.authUser,verification);

module.exports = router;






