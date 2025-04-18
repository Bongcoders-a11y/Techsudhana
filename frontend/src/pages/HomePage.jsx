"use client"

import { useState } from "react"
import NewsForm from "../components/NewsForm"
import NewsAnalysis from "../components/NewsAnalysis"
import TrendingNews from "../components/TrendingNews"
import NewsHistory from "../components/NewsHistory"

const HomePage = () => {
  const [currentNews, setCurrentNews] = useState(null)

  const handleNewsSubmitted = (news) => {
    setCurrentNews(news)
    // Scroll to the analysis section
    window.scrollTo({
      top: document.getElementById("analysis-section").offsetTop - 20,
      behavior: "smooth",
    })
  }

  const handleSelectNews = (news) => {
    setCurrentNews(news)
    // Scroll to the analysis section
    window.scrollTo({
      top: document.getElementById("analysis-section").offsetTop - 20,
      behavior: "smooth",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Fake News Detector</h1>
        <p className="text-xl text-gray-600">Analyze news articles with AI and community feedback</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <NewsForm onNewsSubmitted={handleNewsSubmitted} />

          <div id="analysis-section">{currentNews && <NewsAnalysis news={currentNews} />}</div>
        </div>

        <div className="space-y-8">
          <TrendingNews onSelectNews={handleSelectNews} />
          <NewsHistory onSelectNews={handleSelectNews} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
