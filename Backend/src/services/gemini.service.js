import { GoogleGenerativeAI, TaskType } from "@google/generative-ai";
import { Config } from "../config/config.js";

const genAI = new GoogleGenerativeAI(Config.GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({
  model: "gemini-flash-lite-latest",
});

const embeddingModel = genAI.getGenerativeModel({
  model: "gemini-embedding-2-preview",
});


//embedding function
export const getEmbedding = async (text) => {
  try {
    const result = await embeddingModel.embedContent({
      content: { parts: [{ text }] },
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      outputDimensionality: 768,
    });

    return result.embedding.values;
  } catch (err) {
    console.error("❌ Embedding Error:", err);
    throw err;
  }
};


//ai response generation function
export const generateResponse = async (query, chunks) => {
    if (chunks.length === 0) {
      return "Sorry, I couldn't find relevant information. Please contact support.";
    }

    const context = chunks.join("\n");

    const prompt = `
      You are a customer support assistant.
      Context:
      ${context}
      User Question:
      ${query}
      Answer clearly using ONLY the context. If the answer is not in the context, say you don't know.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
};