import express from "express"
import Issue from "../models/Issue.js"
import User from "../models/User.js"

const router = express.Router()

// Generate complaint ID
const generateComplaintId = () => {
  const date = new Date()
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "")
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `SPOT-${dateStr}-${random}`
}

// Create issue
router.post("/", async (req, res) => {
  try {
    const { title, description, category, location, photos, trainNumber, reporterEmail } = req.body

    const complaintId = generateComplaintId()
    const issue = new Issue({
      complaintId,
      title,
      description,
      category,
      location,
      photos,
      trainNumber,
      reporterEmail,
    })

    await issue.save()

    // Award points to reporter
    if (reporterEmail) {
      await User.updateOne({ email: reporterEmail }, { $inc: { points: 10, issuesReported: 1 } })
    }

    res.json({ complaintId, issue })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all issues
router.get("/", async (req, res) => {
  try {
    const { status, category, city } = req.query
    const filter = {}
    if (status) filter.status = status
    if (category) filter.category = category

    const issues = await Issue.find(filter).sort({ createdAt: -1 })
    res.json(issues)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get issue by ID
router.get("/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
    if (!issue) return res.status(404).json({ error: "Issue not found" })
    res.json(issue)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update issue status
router.patch("/:id", async (req, res) => {
  try {
    const { status, note, assignedAuthority } = req.body
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status, assignedAuthority, updatedAt: new Date() },
      { new: true },
    )

    if (note) {
      issue.notes.push({ text: note, addedBy: "admin", timestamp: new Date() })
      await issue.save()
    }

    res.json(issue)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Add comment
router.post("/:id/comments", async (req, res) => {
  try {
    const { text, author } = req.body
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { text, author, timestamp: new Date() } } },
      { new: true },
    )
    res.json(issue)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
