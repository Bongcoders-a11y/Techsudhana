import News from "../models/News.js"
import { analyzeNews } from "../services/geminiService.js"

// Submit news for analysis
export const submitNews = async (req, res) => {
  try {
    const { text } = req.body

    if (!text) {
      return res.status(400).json({ message: "News text is required" })
    }

    // Analyze news using Gemini API
    const { analysis, realPercentage, fakePercentage } = await analyzeNews(text)

    // Create new news entry
    const newsEntry = new News({
      text,
      analysis,
      realPercentage,
      fakePercentage,
    })

    await newsEntry.save()

    res.status(201).json(newsEntry)
  } catch (error) {
    console.error("Error submitting news:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Get news by ID
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id)

    if (!news) {
      return res.status(404).json({ message: "News not found" })
    }

    res.status(200).json(news)
  } catch (error) {
    console.error("Error getting news:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Get all news entries
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 })
    res.status(200).json(news)
  } catch (error) {
    console.error("Error getting all news:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Get trending news
export const getTrendingNews = async (req, res) => {
  try {
    const trendingNews = await News.find({ isTrending: true }).sort({ createdAt: -1 })
    res.status(200).json(trendingNews)
  } catch (error) {
    console.error("Error getting trending news:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Update news as trending
export const markAsTrending = async (req, res) => {
  try {
    const { id } = req.params
    const news = await News.findByIdAndUpdate(id, { isTrending: true }, { new: true })

    if (!news) {
      return res.status(404).json({ message: "News not found" })
    }

    res.status(200).json(news)
  } catch (error) {
    console.error("Error marking news as trending:", error)
    res.status(500).json({ message: "Server error" })
  }
}
