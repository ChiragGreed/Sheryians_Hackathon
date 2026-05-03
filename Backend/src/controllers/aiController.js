import { searchChunks } from "../services/search.service.js";
import { generateAIResponse } from "../services/gemini.service.js";
import { processText } from "../services/pipeline.service.js";
import mongoose from "mongoose";
import ticketModel from "../models/ticketModel.js";
import userModel from "../models/userModel.js";

export const handleAI = async (req, res) => {
    try {
        const { query, visitorId } = req.body;
        const organizationId = req.user?.organizationId;

        if (!query || !organizationId) {
        return res.status(400).json({
            error: "Query and organization ID are required",
        });
        }

        const chunks = await searchChunks(query, organizationId);

        if (chunks.length === 0) {
        const ticket = await ticketModel.create({
            query,
            visitorId: visitorId || "anonymous-user",
            organizationId,
            status: "open",
        });

        return res.json({
            answer:
            "I couldn't find that information. A support ticket has been created. and an agent will get back to you soon. Thank you for your patience!",
            ticketId: ticket._id,
        });
        }

        const answer = await generateAIResponse({ query, chunks });

        res.json({ answer });

    } catch (err) {
        console.error("❌ AI Error:", err);
        res.status(500).json({ error: "AI failed" });
    }
};





