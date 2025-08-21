const invoiceSchema = new mongoose.Schema({
    registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true },
    amount: Number,
    gstNumber: String,
    gstRate: Number,
    gstAmount: Number,
    totalAmount: Number,
    invoiceFileUrl: String, // PDF stored in S3/GCS
    issuedAt: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model("Invoice", invoiceSchema);