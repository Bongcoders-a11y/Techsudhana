"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Fake News Detector</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-indigo-100">
              Analyze news articles with AI and community feedback to combat misinformation
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <NewsForm onNewsSubmitted={handleNewsSubmitted} />

              {currentNews && <NewsAnalysis news={currentNews} />}
            </div>

            <div className="space-y-8">
              <TrendingNews onSelectNews={handleSelectNews} />
              <NewsHistory onSelectNews={handleSelectNews} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
