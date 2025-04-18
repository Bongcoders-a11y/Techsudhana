"use client"

import { useState, useEffect } from "react"
import { getAllNews, markAsTrending } from "../services/api"

const NewsHistory = ({ onSelectNews }) => {
  const [newsHistory, setNewsHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchNewsHistory = async () => {
      try {
        const news = await getAllNews()
        setNewsHistory(news)
      } catch (error) {
        console.error("Error fetching news history:", error)
        setError("Failed to load news history")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNewsHistory()
  }, [])

  const handleMarkAsTrending = async (e, id) => {
    e.stopPropagation()
    try {
      await markAsTrending(id)

      // Update the local state to reflect the change
      setNewsHistory((prevNews) => prevNews.map((news) => (news._id === id ? { ...news, isTrending: true } : news)))
    } catch (error) {
      console.error("Error marking as trending:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Analyses</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Analyses</h2>
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  if (newsHistory.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Analyses</h2>
        <p className="text-gray-600">No news analyses available yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Analyses</h2>
      <div className="space-y-4">
        {newsHistory.map((news) => (
          <div
            key={news._id}
            className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onSelectNews(news)}
          >
            <p className="text-gray-800 line-clamp-2 mb-2">{news.text.substring(0, 150)}...</p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <span className="text-sm text-green-600">Real: {news.realPercentage}%</span>
                <span className="text-sm text-red-600">Fake: {news.fakePercentage}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{new Date(news.createdAt).toLocaleDateString()}</span>
                {!news.isTrending && (
                  <button
                    onClick={(e) => handleMarkAsTrending(e, news._id)}
                    className="text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition-colors"
                  >
                    Mark Trending
                  </button>
                )}
                {news.isTrending && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Trending</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsHistory
