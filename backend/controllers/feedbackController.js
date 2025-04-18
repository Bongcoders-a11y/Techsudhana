import Feedback from "../models/Feedback.js"

// Submit feedback on AI analysis
export const submitFeedback = async (req, res) => {
  try {
    const { newsId, isUseful, comment } = req.body

    if (!newsId) {
      return res.status(400).json({ message: "News ID is required" })
    }

    if (typeof isUseful !== "boolean") {
      return res.status(400).json({ message: "isUseful must be a boolean" })
    }

    const feedback = new Feedback({
      newsId,
      isUseful,
      comment,
    })

    await feedback.save()

    res.status(201).json(feedback)
  } catch (error) {
    console.error("Error submitting feedback:", error)
    res.status(500).json({ message: "Server error" })
  }
}

// Get feedback for a news item
export const getFeedbackByNewsId = async (req, res) => {
  try {
    const { newsId } = req.params

    const feedback = await Feedback.find({ newsId })

    res.status(200).json(feedback)
  } catch (error) {
    console.error("Error getting feedback:", error)
    res.status(500).json({ message: "Server error" })
  }
}
