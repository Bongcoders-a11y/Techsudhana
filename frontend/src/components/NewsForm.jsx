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
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Analyze News</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="newsText" className="block text-gray-700 font-medium mb-2">
            Paste news text to analyze
          </label>
          <textarea
            id="newsText"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="6"
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            placeholder="Paste news article or text here..."
            disabled={isLoading}
          />
        </div>

        {error && <div className="mb-4 text-red-500">{error}</div>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Analyzing..." : "Analyze News"}
        </button>
      </form>
    </div>
  )
}

export default NewsForm
