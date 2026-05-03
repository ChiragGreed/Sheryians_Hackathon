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



export const getTickets = async (req, res) => {
    try {
        const organizationId = req.user.organizationId;

        const tickets = await ticketModel
        .find({ organizationId })
        .sort({ createdAt: -1 });

        res.json(tickets);
    } catch (err) {
        console.error("❌ Get Tickets Error:", err);
        res.status(500).json({ error: "Failed to fetch tickets" });
    }
};


export const respondTicket = async (req, res) => {
    try {
        const { response } = req.body;
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ticket ID" });
        }

        const ticket = await ticketModel.findById(id);

        if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
        }

        ticket.response = response;
        ticket.status = "resolved";
        ticket.resolvedBy = req.user._id;

        await ticket.save();

        const learnText = `
            Support answer:
            ${response}
            Related question:
            ${ticket.query}`;

        await processText(learnText, ticket.organizationId);

        res.json({
        message: "Ticket resolved and learned successfully",
        ticket,
        });

    } catch (err) {
        console.error("❌ Respond Ticket Error:", err);
        res.status(500).json({ error: "Failed to respond to ticket" });
    }
};