import { GoogleGenerativeAI, TaskType } from "@google/generative-ai";
import { Config } from "../config/config.js";
import Message from "../models/Message.js";

const genAI = new GoogleGenerativeAI(Config.GEMINI_API_KEY);

// 🔹 MAIN MODEL
export const model = genAI.getGenerativeModel({
  model: "gemini-flash-lite-latest", // stable
});

// 🔹 EMBEDDING MODEL
const embeddingModel = genAI.getGenerativeModel({
  model: "gemini-embedding-2-preview",
});


// =============================
// 🔥 BUILD CHAT HISTORY
// =============================
const buildHistory = async (ticketId) => {
  const msgs = await Message.find({ ticketId })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  return msgs.reverse().map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
};


// =============================
// 🔥 EMBEDDING FUNCTION
// =============================
// gemini.service.js

// Add a taskType parameter with a default
export const getEmbedding = async (text, taskType = TaskType.RETRIEVAL_DOCUMENT) => {
  try {
    const result = await embeddingModel.embedContent({
      content: { parts: [{ text }] },
      taskType,                        // ← now dynamic
      outputDimensionality: 768,
    });
    return result.embedding.values;
  } catch (err) {
    console.error("❌ Embedding Error:", err);
    throw err;
  }
};


// =============================
// 🔥 FINAL AI RESPONSE (RAG + CHAT)
// =============================
export const generateAIResponse = async ({
  ticketId,
  query,
  chunks = [],
}) => {
  try {
    const history = ticketId ? await buildHistory(ticketId) : [];

    const context = chunks.length ? chunks.join("\n") : "No context available";

    const prompt = `
You are a professional and friendly customer support assistant.

Context:
${context}

User Question:
${query}

Instructions:
- Answer in clean plain text
- No markdown, no *, no bullets
- Keep it concise and human
- Use ONLY the context if available
  Now answer:
  `;

    const chat = model.startChat({ history });

    const result = await chat.sendMessage(prompt);

    return result.response.text();

  } catch (err) {
    console.error("❌ AI Response Error:", err);
    throw err;
  }
};