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
      <div className="card p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Trending News
        </h2>
        <div className="animate-pulse space-y-3">
          <div className="h-20 bg-gray-200 rounded-md w-full mb-4"></div>
          <div className="h-20 bg-gray-200 rounded-md w-full mb-4"></div>
          <div className="h-20 bg-gray-200 rounded-md w-full mb-4"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Trending News
        </h2>
        <div className="bg-red-50 p-4 rounded-md text-red-700 flex items-center">
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
      </div>
    )
  }

  if (trendingNews.length === 0) {
    return (
      <div className="card p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Trending News
        </h2>
        <div className="bg-yellow-50 p-4 rounded-md text-yellow-700 flex items-center">
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          No trending news available at the moment.
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        Trending News
      </h2>
      <div className="space-y-3">
        {trendingNews.map((news) => (
          <div
            key={news._id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-indigo-50 cursor-pointer transition-all duration-200 hover:shadow-md"
            onClick={() => onSelectNews(news)}
          >
            <p className="text-gray-800 line-clamp-2 mb-2 font-medium">{news.text.substring(0, 150)}...</p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <span className="badge badge-success">Real: {news.realPercentage}%</span>
                <span className="badge badge-danger">Fake: {news.fakePercentage}%</span>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {new Date(news.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendingNews
