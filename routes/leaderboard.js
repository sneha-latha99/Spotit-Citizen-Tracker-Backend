import express from "express"
import User from "../models/User.js"

const router = express.Router()

// Get leaderboard
router.get("/", async (req, res) => {
  try {
    const { scope, city } = req.query
    const filter = {}
    if (scope === "city" && city) filter.city = city

    const leaderboard = await User.find(filter)
      .sort({ points: -1 })
      .limit(100)
      .select("name points issuesReported city")

    res.json(leaderboard)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
