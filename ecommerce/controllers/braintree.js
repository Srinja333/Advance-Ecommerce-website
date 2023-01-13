const User = require("../models/user");
const braintree = require("braintree");


//below used for use enviroment variable
require("dotenv").config();

//below used for connect to braintree
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//by below way we generate token whenever request coming to this route router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken);
exports.generateToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};


exports.processPayment = (req, res) => {
 //below two variables got from client
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  //charge
  let newTransaction = gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (error, result) => {
      //below response to frontend
      if (error) {
        res.status(500).json(error);
      } else {
        ///console.log("ppbt",result);
        res.json(result);
      }
    }
  );
};

