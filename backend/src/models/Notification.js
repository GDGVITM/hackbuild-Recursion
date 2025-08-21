const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    channel: { type: String, enum: ["email", "sms", "whatsapp", "browser"], required: true },
    message: String,
    status: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
    sentAt: Date
  });

module.exports = mongoose.model("Notification", notificationSchema);