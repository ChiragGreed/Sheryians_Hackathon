import mongoose from "mongoose";

export const DUMMY_ORG_ID = new mongoose.Types.ObjectId("000000000000000000000001");
// ↑ Swap this with req.user.organizationId after M1 JWT is done

export const ESCALATION_KEYWORDS = [
  "human",
  "agent",
  "real person",
  "talk to someone",
];

export const AI_SYSTEM_PROMPT = `You are a helpful customer support assistant. 
Be concise, friendly, and professional.`;