import express from "express";
import {
  createOrder,
  verifyPayment,
  getPaymentDetails,
  refundPayment
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.get("/payment/:paymentId", getPaymentDetails);
router.post("/refund", refundPayment);
router.get("/razorpay-key", (req, res) => {
  res.json({ 
    key: process.env.RAZORPAY_KEY_ID 
  });
});

export default router;
