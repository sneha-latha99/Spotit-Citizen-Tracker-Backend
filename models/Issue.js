import mongoose from "mongoose"

const issueSchema = new mongoose.Schema({
  complaintId: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Train", "Road", "Sanitation", "Lighting", "Water", "Traffic", "Other"],
    required: true,
  },
  location: {
    lat: Number,
    lng: Number,
    address: String,
  },
  photos: [String], // Cloudinary URLs
  trainNumber: String,
  reporterEmail: String,
  reporterId: mongoose.Schema.Types.ObjectId,
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved", "Escalated"],
    default: "Pending",
  },
  assignedAuthority: mongoose.Schema.Types.ObjectId,
  notes: [{ text: String, addedBy: String, timestamp: Date }],
  comments: [{ text: String, author: String, timestamp: Date }],
  escalatedToMedia: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model("Issue", issueSchema)
