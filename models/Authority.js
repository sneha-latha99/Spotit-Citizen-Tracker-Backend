import mongoose from "mongoose"

const authoritySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["IRCTC", "GHMC", "Traffic", "Water", "Sanitation", "Other"],
    required: true,
  },
  email: { type: String, required: true },
  phone: String,
  apiWebhook: String,
  jurisdictions: {
    type: { type: String, default: "Polygon" },
    coordinates: [[[Number]]],
  },
  slaDays: { type: Number, default: 7 },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Authority", authoritySchema)
