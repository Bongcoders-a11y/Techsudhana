import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv"

dotenv.config()

const analyzeNews = async (newsText) => {
  try {
    const ai = new GoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    })

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" }) // Or your version

    const prompt = `
      Analyze the following news text and determine if it contains misinformation or fake news.
      Provide a detailed analysis explaining your reasoning.
      Also, give a percentage estimate of how likely this news is real or fake.
      
      News text: "${newsText}"
      
      Format your response as follows:
      
      Analysis: [Your detailed analysis]
      Real percentage: [0-100]%
      Fake percentage: [0-100]%
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const realPercentageMatch = text.match(/Real percentage: (\d+)/)
    const fakePercentageMatch = text.match(/Fake percentage: (\d+)/)

    const realPercentage = realPercentageMatch ? Number.parseInt(realPercentageMatch[1]) : 50
    const fakePercentage = fakePercentageMatch ? Number.parseInt(fakePercentageMatch[1]) : 50

    return {
      analysis: text,
      realPercentage,
      fakePercentage,
    }
  } catch (error) {
    console.error("Error analyzing news with Gemini:", error)

    return {
      analysis:
        "Sorry, we couldn't analyze this news article at the moment. Our AI service is experiencing issues. Please try again later.",
      realPercentage: 50,
      fakePercentage: 50,
    }
  }
}

export { analyzeNews }
