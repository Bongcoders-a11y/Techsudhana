import { GoogleGenAI } from "@google/genai"
import dotenv from "dotenv"

dotenv.config()

const analyzeNews = async (newsText) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    })

    const config = {
      responseMimeType: "text/plain",
    }

    const model = "gemini-2.5-flash-preview-04-17"

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

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ]

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    })

    let fullResponse = ""
    for await (const chunk of response) {
      fullResponse += chunk.text
    }

    // Extract percentages using regex
    const realPercentageMatch = fullResponse.match(/Real percentage: (\d+)/)
    const fakePercentageMatch = fullResponse.match(/Fake percentage: (\d+)/)

    const realPercentage = realPercentageMatch ? Number.parseInt(realPercentageMatch[1]) : 50
    const fakePercentage = fakePercentageMatch ? Number.parseInt(fakePercentageMatch[1]) : 50

    return {
      analysis: fullResponse,
      realPercentage,
      fakePercentage,
    }
  } catch (error) {
    console.error("Error analyzing news with Gemini:", error)
    throw new Error("Failed to analyze news")
  }
}

export { analyzeNews }
