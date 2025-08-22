import mongoose from "mongoose";

const committeeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  }, 
  description: String,
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  events: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Event" 
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Indexes for efficient querying
committeeSchema.index({ name: 1 });
committeeSchema.index({ isActive: 1 });

const Committee = mongoose.model("Committee", committeeSchema);

export default Committee;
