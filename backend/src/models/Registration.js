const registrationSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    qrToken: { type: String, required: true, unique: true }, // JWT or random UUID
    paymentStatus: { type: String, enum: ["pending", "completed", "refunded"], default: "pending" },
    coupens: [{ type: String }], // e.g., ["early-bird", "student-discount"]
    isWaitlisted: { type: Boolean, default: false },
    waitlistPosition: Number, // position in the waitlist if applicable
    refunded: { type: Boolean, default: false },
    checkedIn: { type: Boolean, default: false },
    checkedInAt: Date,
    // For event-specific requirements
    submission: {
      githubLink: { type: String },   // optional
      projectLink: { type: String },  // optional
      pptLink: { type: String },      // optional
      extraFields: { type: Map, of: String } // flexible key-value (custom fields)
    },
    createdAt: { type: Date, default: Date.now },
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
    communicationLog: [{
      channel: { type: String, enum: ["email", "sms", "whatsapp", "browser"] },
      message: String,
      sentAt: { type: Date, default: Date.now }
    }]
  });