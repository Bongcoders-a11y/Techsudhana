"use client"

import { useState } from "react"
import { voteOnNews, submitFeedback } from "../services/api"

const NewsAnalysis = ({ news }) => {
  const [voted, setVoted] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [feedbackComment, setFeedbackComment] = useState("")
  const [localNews, setLocalNews] = useState(news)

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

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Analysis Results</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Original Text</h3>
        <div className="bg-gray-50 p-4 rounded-md text-gray-800">{localNews.text}</div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">AI Analysis</h3>
        <div className="bg-gray-50 p-4 rounded-md text-gray-800 whitespace-pre-line">{localNews.analysis}</div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">AI Verdict</h3>
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <div className="bg-green-100 p-3 rounded-md">
              <div className="font-bold text-green-800">Real: {localNews.realPercentage}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${localNews.realPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="w-1/2 pl-2">
            <div className="bg-red-100 p-3 rounded-md">
              <div className="font-bold text-red-800">Fake: {localNews.fakePercentage}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${localNews.fakePercentage}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Community Verdict</h3>
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <div className="bg-green-100 p-3 rounded-md">
              <div className="font-bold text-green-800">
                Real: {localNews.realVotes} votes ({realVotePercentage}%)
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${realVotePercentage}%` }}></div>
              </div>
            </div>
          </div>
          <div className="w-1/2 pl-2">
            <div className="bg-red-100 p-3 rounded-md">
              <div className="font-bold text-red-800">
                Fake: {localNews.fakeVotes} votes ({fakeVotePercentage}%)
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${fakeVotePercentage}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-medium mb-2 text-gray-700">What do you think?</h4>
          <div className="flex space-x-4">
            <button
              onClick={() => handleVote("real")}
              disabled={voted}
              className={`px-4 py-2 rounded-md ${
                voted ? "bg-gray-200 text-gray-500" : "bg-green-500 text-white hover:bg-green-600"
              } transition-colors`}
            >
              Real News
            </button>
            <button
              onClick={() => handleVote("fake")}
              disabled={voted}
              className={`px-4 py-2 rounded-md ${
                voted ? "bg-gray-200 text-gray-500" : "bg-red-500 text-white hover:bg-red-600"
              } transition-colors`}
            >
              Fake News
            </button>
          </div>
          {voted && <p className="mt-2 text-gray-600 text-sm">Thank you for your vote!</p>}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Was the AI analysis helpful?</h3>

        <div className="mb-4">
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
            value={feedbackComment}
            onChange={(e) => setFeedbackComment(e.target.value)}
            placeholder="Optional: Add a comment about the AI analysis"
            disabled={feedbackSubmitted}
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => handleFeedback(true)}
            disabled={feedbackSubmitted}
            className={`px-4 py-2 rounded-md ${
              feedbackSubmitted ? "bg-gray-200 text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"
            } transition-colors`}
          >
            Yes, it was helpful
          </button>
          <button
            onClick={() => handleFeedback(false)}
            disabled={feedbackSubmitted}
            className={`px-4 py-2 rounded-md ${
              feedbackSubmitted ? "bg-gray-200 text-gray-500" : "bg-yellow-500 text-white hover:bg-yellow-600"
            } transition-colors`}
          >
            No, it wasn't helpful
          </button>
        </div>
        {feedbackSubmitted && <p className="mt-2 text-gray-600 text-sm">Thank you for your feedback!</p>}
      </div>
    </div>
  )
}

export default NewsAnalysis
