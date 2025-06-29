const express = require("express");
const router = express.Router();
const axios = require("axios");

const Host_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";

router.get("/pay", (req, res) => {
  const payEndpoint = "pg/v1/pay";
  const merchantTransactionId = uniqId();
  const userId = "123";

  const payLoad = {
    merchantId: "MERCHANTUAT",
    merchantTransactionId: merchantTransactionId,
    merchantUserId: userId,
    amount: 100,
    redirectUrl: `${import.meta.env.VITE_BASE_URL}/${merchantTransactionId}`,
    redirectMode: "REDIRECT",
    mobileNumber: "9999999999",

    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };




  
  const options = {
    method: "post",
    url: `${Host_URL}/${payEndpoint}`,
    headers: {
      accept: "text/plain",
      "Content-Type": "application/json",
    },
    data: {},
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

//router.post("/status/:id", checkPaymentStatus);
