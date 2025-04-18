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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        Analysis Results
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          Original Text
        </h3>
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
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          AI Analysis
        </h3>
        <div className="bg-gray-50 p-4 rounded-md text-gray-800 whitespace-pre-line">{localNews.analysis}</div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          AI Verdict
        </h3>
        <div className="flex flex-col md:flex-row mb-4 gap-4">
          <div className="w-full md:w-1/2">
            <div className="bg-green-50 p-4 rounded-md border border-green-100">
              <div className="font-bold text-green-800 flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Real: {localNews.realPercentage}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full animate-progress"
                  style={{ width: `${localNews.realPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-red-50 p-4 rounded-md border border-red-100">
              <div className="font-bold text-red-800 flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Fake: {localNews.fakePercentage}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-red-600 h-2.5 rounded-full animate-progress"
                  style={{ width: `${localNews.fakePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Community Verdict
        </h3>
        <div className="flex flex-col md:flex-row mb-4 gap-4">
          <div className="w-full md:w-1/2">
            <div className="bg-green-50 p-4 rounded-md border border-green-100">
              <div className="font-bold text-green-800 flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                Real: {localNews.realVotes} votes ({realVotePercentage}%)
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${realVotePercentage}%` }}></div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-red-50 p-4 rounded-md border border-red-100">
              <div className="font-bold text-red-800 flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2"
                  />
                </svg>
                Fake: {localNews.fakeVotes} votes ({fakeVotePercentage}%)
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${fakeVotePercentage}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
          <h4 className="font-medium mb-3 text-gray-700 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            What do you think?
          </h4>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleVote("real")}
              disabled={voted}
              className={`btn ${
                voted ? "bg-gray-200 text-gray-500" : "btn-secondary"
              } flex items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              Real News
            </button>
            <button
              onClick={() => handleVote("fake")}
              disabled={voted}
              className={`btn ${voted ? "bg-gray-200 text-gray-500" : "btn-danger"} flex items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2"
                />
              </svg>
              Fake News
            </button>
          </div>
          {voted && (
            <div className="mt-3 text-green-600 text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Thank you for your vote!
            </div>
          )}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          Was the AI analysis helpful?
        </h3>

        <div className="mb-4">
          <textarea
            className="input"
            rows="2"
            value={feedbackComment}
            onChange={(e) => setFeedbackComment(e.target.value)}
            placeholder="Optional: Add a comment about the AI analysis"
            disabled={feedbackSubmitted}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleFeedback(true)}
            disabled={feedbackSubmitted}
            className={`btn ${
              feedbackSubmitted ? "bg-gray-200 text-gray-500" : "btn-primary"
            } flex items-center justify-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            Yes, it was helpful
          </button>
          <button
            onClick={() => handleFeedback(false)}
            disabled={feedbackSubmitted}
            className={`btn ${
              feedbackSubmitted ? "bg-gray-200 text-gray-500" : "btn-warning"
            } flex items-center justify-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2"
              />
            </svg>
            No, it wasn't helpful
          </button>
        </div>
        {feedbackSubmitted && (
          <div className="mt-3 text-green-600 text-sm flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Thank you for your feedback!
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsAnalysis
