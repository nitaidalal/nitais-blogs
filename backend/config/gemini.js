import { GoogleGenAI } from "@google/genai";

// dotenv.config();


// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", // You can also use "gemini-1.5-flash" or other available models
    contents: prompt,
  });
  console.log(response.text);
  return response.text;
}

export default main;
