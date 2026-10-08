import mongoose from "mongoose"

const leaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  points: { type: Number, default: 0 },
  issuesReported: { type: Number, default: 0 },
  issuesResolved: { type: Number, default: 0 },
  city: String,
  rank: Number,
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model("Leaderboard", leaderboardSchema)
