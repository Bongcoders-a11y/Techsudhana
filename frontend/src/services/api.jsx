import axios from "axios"

const API_URL = "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// News API
export const submitNewsForAnalysis = async (text) => {
  const response = await api.post("/news", { text })
  return response.data
}

export const getNewsById = async (id) => {
  const response = await api.get(`/news/${id}`)
  return response.data
}

export const getAllNews = async () => {
  const response = await api.get("/news")
  return response.data
}

export const getTrendingNews = async () => {
  const response = await api.get("/news/trending")
  return response.data
}

export const markAsTrending = async (id) => {
  const response = await api.patch(`/news/${id}/trending`)
  return response.data
}

// Vote API
export const voteOnNews = async (id, voteType) => {
  const response = await api.post(`/votes/${id}`, { voteType })
  return response.data
}

// Feedback API
export const submitFeedback = async (newsId, isUseful, comment) => {
  const response = await api.post("/feedback", { newsId, isUseful, comment })
  return response.data
}

export const getFeedbackByNewsId = async (newsId) => {
  const response = await api.get(`/feedback/${newsId}`)
  return response.data
}
export default api