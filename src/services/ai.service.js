import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({
    // apiKey: process.env.GEMINI_API_KEY,
});

async function generateResponse(content) {
  try {
    console.log("Generating response for:", content);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: content,
    });

    console.log("AI Response received:", response.text);
    return response.text;
  } catch (error) {
    console.error("Error in AI service:", error);
    return "I'm sorry, I'm having trouble processing your request. Please check your API key and try again.";
  }
}

export const aiService = { generateResponse };
