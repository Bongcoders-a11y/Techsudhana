"use client"

import { useState } from "react"
import { voteOnNews, submitFeedback } from "../services/api"

const NewsAnalysis = ({ news }) => {
  const [voted, setVoted] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [feedbackComment, setFeedbackComment] = useState("")
  const [localNews, setLocalNews] = useState(news)
  const [showFullText, setShowFullText] = useState(false)

  const handleVote = async (voteType) => {
    if (voted) return
    try {
      const updatedNews = await voteOnNews(news._id, voteType)
      setLocalNews(updatedNews)
      setVoted(true)
    } catch (error) {
      console.error("Error voting:", error)
    }
  }

  const handleFeedback = async (isUseful) => {
    if (feedbackSubmitted) return
    try {
      await submitFeedback(news._id, isUseful, feedbackComment)
      setFeedbackSubmitted(true)
    } catch (error) {
      console.error("Error submitting feedback:", error)
    }
  }

  const totalVotes = localNews.realVotes + localNews.fakeVotes
  const realVotePercentage = totalVotes > 0 ? Math.round((localNews.realVotes / totalVotes) * 100) : 0
  const fakeVotePercentage = totalVotes > 0 ? Math.round((localNews.fakeVotes / totalVotes) * 100) : 0
  const truncatedText = localNews.text.length > 300 ? `${localNews.text.substring(0, 300)}...` : localNews.text

  return (
    <div id="analysis-section" className="card p-6 mb-8 animate-slide-up">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        🧠 Analysis Results
      </h2>

      {/* Original Text */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">📰 Original Text</h3>
        <div className="bg-gray-50 p-4 rounded-md text-gray-800">
          {showFullText ? localNews.text : truncatedText}
          {localNews.text.length > 300 && (
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="text-indigo-600 hover:text-indigo-800 font-medium ml-2"
            >
              {showFullText ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </section>

      {/* AI Analysis */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">🤖 AI Analysis</h3>
        <div className="bg-gray-50 p-4 rounded-md text-gray-800 whitespace-pre-line">
          {localNews.analysis}
        </div>
      </section>

      {/* AI Verdict */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">🧾 AI Verdict</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <div className="bg-green-50 p-4 rounded-md border border-green-100">
              <p className="font-bold text-green-800 mb-2">Real: {localNews.realPercentage}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${localNews.realPercentage}%` }}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-red-50 p-4 rounded-md border border-red-100">
              <p className="font-bold text-red-800 mb-2">Fake: {localNews.fakePercentage}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{ width: `${localNews.fakePercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Voting */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">🌍 Community Verdict</h3>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => handleVote("real")}
            disabled={voted}
            className={`px-4 py-2 rounded text-white ${voted ? "bg-green-300" : "bg-green-600 hover:bg-green-700"}`}
          >
            👍 Real ({realVotePercentage}%)
          </button>
          <button
            onClick={() => handleVote("fake")}
            disabled={voted}
            className={`px-4 py-2 rounded text-white ${voted ? "bg-red-300" : "bg-red-600 hover:bg-red-700"}`}
          >
            👎 Fake ({fakeVotePercentage}%)
          </button>
        </div>
      </section>

      {/* Feedback */}
      <section>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">💬 Feedback</h3>
        {!feedbackSubmitted ? (
          <>
            <textarea
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
              placeholder="Your comments..."
              className="w-full p-3 border rounded-md mb-4"
            />
            <div className="flex gap-4">
              <button
                onClick={() => handleFeedback(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                ✅ Helpful
              </button>
              <button
                onClick={() => handleFeedback(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                ❌ Not Helpful
              </button>
            </div>
          </>
        ) : (
          <div className="text-green-600 font-medium">✅ Thank you for your feedback!</div>
        )}
      </section>
    </div>
  )
}

export default NewsAnalysis
