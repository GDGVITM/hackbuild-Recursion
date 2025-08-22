import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ["Auditorium", "Hall", "Lab", "Classroom", "Outdoor", "Conference Room", "Other"]
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  location: {
    building: String,
    floor: String,
    room: String
  },
  facilities: [{
    type: String,
    enum: ["Projector", "Sound System", "WiFi", "Air Conditioning", "Wheelchair Access", "Kitchen", "Parking"]
  }],
  status: {
    type: String,
    enum: ["Available", "Booked", "Maintenance", "Reserved"],
    default: "Available"
  },
  currentBooking: {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    },
    startTime: Date,
    endTime: Date,
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  restrictions: [String],
  hourlyRate: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
venueSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Indexes for efficient querying
venueSchema.index({ status: 1 });
venueSchema.index({ type: 1 });
venueSchema.index({ capacity: 1 });
venueSchema.index({ isActive: 1 });

const Venue = mongoose.model("Venue", venueSchema);

export default Venue;
