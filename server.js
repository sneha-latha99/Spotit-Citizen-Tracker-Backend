import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js"
import issueRoutes from "./routes/issues.js"
import authorityRoutes from "./routes/authorities.js"
import leaderboardRoutes from "./routes/leaderboard.js"
import chatbotRoutes from "./routes/chatbot.js"

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/spotit")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/issues", issueRoutes)
app.use("/api/authorities", authorityRoutes)
app.use("/api/leaderboard", leaderboardRoutes)
app.use("/api/chatbot", chatbotRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "SpotIt API is running" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`SpotIt backend running on port ${PORT}`)
})
