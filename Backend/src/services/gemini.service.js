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
        You are a professional and friendly customer support assistant.
        Use the provided context to answer the user's question clearly and helpfully.
        Context:
        ${context}
        User Question:
        ${query}
        Instructions:
        - Answer in a natural, human tone (not robotic)
        - Keep it concise and clear
        - Only use information from the context
        - Do NOT use markdown, stars (*), dashes (-), or bullet points
        - Avoid \\n line breaks unless necessary
        - Do not make up information
        - If the answer is not found in the context, say:
          "I'm sorry, I couldn't find that information in our system. Please contact support for further assistance."
        Now provide the best possible answer.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
};