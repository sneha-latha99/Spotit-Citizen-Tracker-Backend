import express from "express"
import Issue from "../models/Issue.js"

const router = express.Router()

// Chatbot query
router.post("/", async (req, res) => {
  try {
    const { query, userId } = req.body

    // Simple rule-based chatbot
    if (query.includes("status") || query.includes("SPOT-")) {
      const complaintId = query.match(/SPOT-\d{8}-\d{4}/)?.[0]
      if (complaintId) {
        const issue = await Issue.findOne({ complaintId })
        if (issue) {
          return res.json({
            response: `Your complaint ${complaintId} is currently ${issue.status}. Last updated: ${issue.updatedAt}`,
          })
        }
      }
    }

    res.json({ response: "How can I help you? You can report an issue, track a complaint, or view the leaderboard." })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
