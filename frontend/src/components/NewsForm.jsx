"use client"

import { useState } from "react"
import { submitNewsForAnalysis } from "../services/api"

const NewsForm = ({ onNewsSubmitted }) => {
  const [newsText, setNewsText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!newsText.trim()) {
      setError("Please enter news text")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await submitNewsForAnalysis(newsText)
      setNewsText("")
      onNewsSubmitted(result)
    } catch (error) {
      console.error("Error submitting news:", error)
      setError("Failed to analyze news. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card p-6 mb-8 animate-fade-in">
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        Analyze News
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="newsText" className="block text-gray-700 font-medium mb-2">
            Paste news text to analyze
          </label>
          <textarea
            id="newsText"
            className="input"
            rows="6"
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            placeholder="Paste news article or text here..."
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        <button type="submit" className="btn btn-primary w-full flex justify-center items-center" disabled={isLoading}>
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Analyze News
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default NewsForm
