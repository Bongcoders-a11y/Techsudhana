import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import newsRoutes from "./routes/news.js"
import voteRoutes from "./routes/votes.js"
import feedbackRoutes from "./routes/feedback.js"
import trendingRoutes from "./routes/trending.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(
  cors({
    origin: "*", // During development, allow all origins
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
)

// Routes
app.use("/api/news", newsRoutes)
app.use("/api/votes", voteRoutes)
app.use("/api/feedback", feedbackRoutes)
app.use("/api/trending", trendingRoutes)

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
