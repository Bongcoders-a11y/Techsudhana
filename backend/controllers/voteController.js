import News from "../models/News.js"

// Vote on news (real or fake)
export const voteOnNews = async (req, res) => {
  try {
    const { id } = req.params
    const { voteType } = req.body

    if (!["real", "fake"].includes(voteType)) {
      return res.status(400).json({ message: "Invalid vote type" })
    }

    const news = await News.findById(id)

    if (!news) {
      return res.status(404).json({ message: "News not found" })
    }

    // Update vote count
    if (voteType === "real") {
      news.realVotes += 1
    } else {
      news.fakeVotes += 1
    }

    await news.save()

    res.status(200).json(news)
  } catch (error) {
    console.error("Error voting on news:", error)
    res.status(500).json({ message: "Server error" })
  }
}
