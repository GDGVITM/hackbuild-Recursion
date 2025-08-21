import razorpay from "../utils/razorPay.js";
import crypto from "crypto";


export const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const options = {
      amount: amount * 100, // convert to paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing payment verification details" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ error: "Failed to verify payment" });
  }
};

export const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await razorpay.payments.fetch(paymentId);

    res.json({ success: true, payment });
  } catch (err) {
    console.error("Error fetching payment details:", err);
    res.status(500).json({ error: "Failed to fetch payment details" });
  }
};


export const refundPayment = async (req, res) => {
  try {
    const { payment_id, amount } = req.body;

    const refund = await razorpay.payments.refund(payment_id, {
      amount: amount ? amount * 100 : undefined,
    });

    res.json({ success: true, refund });
  } catch (err) {
    console.error("Error refunding payment:", err);
    res.status(500).json({ error: "Failed to process refund" });
  }
};
