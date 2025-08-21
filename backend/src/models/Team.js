const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    leader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // leader included or separate
    createdAt: { type: Date, default: Date.now },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  });