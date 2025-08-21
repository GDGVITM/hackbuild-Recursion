// models.js
import mongoose from "mongoose";

/* ============================
   USER
============================ */
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, // bcrypt hashed
  phone: { type: String },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College" }, 
  createdAt: { type: Date, default: Date.now },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    whatsapp: { type: Boolean, default: false },
    browser: { type: Boolean, default: true }
  },
});
export const User = mongoose.model("User", userSchema);

/* ============================
   COMMITTEE
============================ */
const committeeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  createdAt: { type: Date, default: Date.now }
});
export const Committee = mongoose.model("Committee", committeeSchema);

/* ============================
   COMMITTEE ROLE (user ↔ committee mapping)
============================ */
const committeeRoleSchema = new mongoose.Schema({
  committee: { type: mongoose.Schema.Types.ObjectId, ref: "Committee", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { 
    type: String, 
    enum: ["organizer", "volunteer", "member"], 
    default: "member"
  },
  assignedAt: { type: Date, default: Date.now }
});
export const CommitteeRole = mongoose.model("CommitteeRole", committeeRoleSchema);

/* ============================
   EVENT
============================ */
const CATEGORY_TYPES = [
  "Technology",
  "Business",
  "Education",
  "Health & Wellness",
  "Other"
];

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  committee: { type: mongoose.Schema.Types.ObjectId, ref: "Committee" },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  location: String,
  maxAttendees: Number,
  categories: {
    type: [String],
    enum: CATEGORY_TYPES,
  },
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
  price: { type: Number, default: 0 },
  image: { type: String },
  integrations: {
    googleCalendarId: String,
    externalApis: [{ name: String, endpoint: String }]
  },
});

export const Event = mongoose.model("Event", eventSchema);
/* ============================
   EVENT ROLE (user ↔ event mapping)
============================ */
const eventRoleSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { 
    type: String, 
    enum: ["organizer", "volunteer", "student"], 
    default: "student" 
  },
  assignedAt: { type: Date, default: Date.now }
});
export const EventRole = mongoose.model("EventRole", eventRoleSchema);

/* ============================
   REGISTRATION
============================ */
const registrationSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  qrToken: { type: String, required: true, unique: true }, 
  paymentStatus: { type: String, enum: ["pending", "completed", "refunded"], default: "pending" },
  coupens: [{ type: String }], 
  isWaitlisted: { type: Boolean, default: false },
  waitlistPosition: Number,
  refunded: { type: Boolean, default: false },
  checkedIn: { type: Boolean, default: false },
  checkedInAt: Date,
  submission: {
    githubLink: { type: String },
    projectLink: { type: String },
    pptLink: { type: String },
    extraFields: { type: Map, of: String }
  },
  createdAt: { type: Date, default: Date.now },
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
  communicationLog: [{
    channel: { type: String, enum: ["email", "sms", "whatsapp", "browser"] },
    message: String,
    sentAt: { type: Date, default: Date.now }
  }]
});
export const Registration = mongoose.model("Registration", registrationSchema);

/* ============================
   TEAM
============================ */
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  leader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  createdAt: { type: Date, default: Date.now },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
});
export const Team = mongoose.model("Team", teamSchema);

/* ============================
   PAYMENT
============================ */
const paymentSchema = new mongoose.Schema({
  registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true },
  amount: Number,
  currency: { type: String, default: "INR" },
  paymentProvider: String, 
  paymentId: String, 
  status: { type: String, enum: ["pending", "success", "failed", "refunded"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  gstBreakdown: {
    cgst: Number,
    sgst: Number,
    igst: Number
  },
  refundId: String
});
export const Payment = mongoose.model("Payment", paymentSchema);

/* ============================
   AUDIT
============================ */
const auditSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  target: String, 
  timestamp: { type: Date, default: Date.now },
  ipAddress: String,
  userAgent: String
});
export const Audit = mongoose.model("Audit", auditSchema);

/* ============================
   INVOICE
============================ */
const invoiceSchema = new mongoose.Schema({
  registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true },
  amount: Number,
  gstNumber: String,
  gstRate: Number,
  gstAmount: Number,
  totalAmount: Number,
  invoiceFileUrl: String, 
  issuedAt: { type: Date, default: Date.now }
});
export const Invoice = mongoose.model("Invoice", invoiceSchema);

/* ============================
   NOTIFICATION
============================ */
const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  channel: { type: String, enum: ["email", "sms", "whatsapp", "browser"], required: true },
  message: String,
  status: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
  sentAt: Date
});
export const Notification = mongoose.model("Notification", notificationSchema);
