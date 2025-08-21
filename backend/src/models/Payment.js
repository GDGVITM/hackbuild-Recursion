const paymentSchema = new mongoose.Schema({
    registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true },
    amount: Number,
    currency: { type: String, default: "INR" },
    paymentProvider: String, // e.g., Razorpay, Stripe
    paymentId: String, // from gateway
    status: { type: String, enum: ["pending", "success", "failed", "refunded"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
    gstBreakdown: {
      cgst: Number,
      sgst: Number,
      igst: Number
    },
    refundId: String
  });
  
  module.exports = mongoose.model("Payment", paymentSchema);