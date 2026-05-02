import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_SYSTEM_PROMPT } from "../config/constants.js";
import Message from "../models/Message.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const buildHistory = async (ticketId) => {
  const msgs = await Message.find({ ticketId })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  // Gemini uses "model" instead of "assistant"
  return msgs.reverse().map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
};

export const generateAIResponse = async (ticketId, userMessage) => {
  // Dummy mode if no API key
  if (!process.env.GEMINI_API_KEY) {
    return `Thanks for reaching out! How can I help you with: "${userMessage}"?`;
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", 
    systemInstruction: AI_SYSTEM_PROMPT,
  });

  const history = await buildHistory(ticketId);

  const chat = model.startChat({ history });

  const result = await chat.sendMessage(userMessage);
  return result.response.text();
};