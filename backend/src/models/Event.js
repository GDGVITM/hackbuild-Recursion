const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    location: String,
    maxAttendees: Number,
    categories: [String],
    tracks: [{
      name: String,
      description: String,
      startTime: Date,
      endTime: Date,
      location: String,
      maxAttendees: Number
    }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    integrations: {
      googleCalendarId: String,
      externalApis: [{ name: String, endpoint: String }]
    },
  });
  
  module.exports = mongoose.model("Event", eventSchema);
  