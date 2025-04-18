"use client"

import { useState, useEffect } from "react"
import { getTrendingNews } from "../services/api"

const TrendingNews = ({ onSelectNews }) => {
  const [trendingNews, setTrendingNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        const news = await getTrendingNews()
        setTrendingNews(news)
      } catch (error) {
        console.error("Error fetching trending news:", error)
        setError("Failed to load trending news")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrendingNews()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Trending News</h2>
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
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Trending News</h2>
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  if (trendingNews.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Trending News</h2>
        <p className="text-gray-600">No trending news available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Trending News</h2>
      <div className="space-y-4">
        {trendingNews.map((news) => (
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
              <span className="text-xs text-gray-500">{new Date(news.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendingNews
