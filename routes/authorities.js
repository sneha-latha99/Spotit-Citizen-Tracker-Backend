import express from "express"
import Authority from "../models/Authority.js"

const router = express.Router()

// Get all authorities
router.get("/", async (req, res) => {
  try {
    const authorities = await Authority.find()
    res.json(authorities)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create authority
router.post("/", async (req, res) => {
  try {
    const authority = new Authority(req.body)
    await authority.save()
    res.json(authority)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
