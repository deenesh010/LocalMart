const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// Route to initiate payment
router.post('/initiate', async (req, res) => {
  const payload = req.body;

  const uuid = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  // const payload = {
  //   amount,
  //   total_amount: amount,
  //   product_delivery_charge: 0,
  //   product_service_charge: 0,
  //   product_code: String(productId),
  //   transaction_uuid: uuid,
  //   success_url: process.env.SUCCESS_URL,
  //   failure_url: process.env.FAILURE_URL,
  //   merchant_id: process.env.MERCHANT_ID,
  // };

  try {
    const response = await axios.post(process.env.ESEWA_PAYMENT_URL, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json({ paymentUrl: response.data.payment_url });
  } catch (error) {
    // console.error('Esewa error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Payment initiation failed' });
  }
});


// Route to verify payment
router.get("/verify", async (req, res) => {
  const { refId, transaction_uuid } = req.query;

  try {
    const response = await axios.post(process.env.ESEWA_PAYMENT_STATUS_URL, {
      refId,
      transaction_uuid,
      merchant_id: process.env.MERCHANT_ID,
    });

    if (response.data.status === "COMPLETE") {
      // Update order status in the database
      res.redirect("/payment-success");
    } else {
      res.redirect("/payment-failure");
    }
  } catch (error) {
    res.status(500).json({ error: "Payment verification failed" });
  }
});

module.exports = router;
