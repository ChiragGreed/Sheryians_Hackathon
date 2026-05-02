import Ticket from "../models/ticketModel.js";
import Message from "../models/Message.js";
import { generateAIResponse } from "../services/gemini.service.js";
import { DUMMY_ORG_ID } from "../config/constants.js";

// POST /api/chat/message
export const sendMessage = async (req, res) => {
  try {
    const { ticketId, content, visitorId } = req.body;

    let ticket = ticketId ? await Ticket.findById(ticketId) : null;
    if (!ticket) {
      ticket = await Ticket.create({
        organizationId: DUMMY_ORG_ID,
        visitorId: visitorId || "anonymous",
      });
    }

    await Message.create({ ticketId: ticket._id, role: "user", content });

    const aiText = await generateAIResponse(ticket._id, content);
    const aiMsg = await Message.create({
      ticketId: ticket._id,
      role: "assistant",
      content: aiText,
    });

    res.status(200).json({ success: true, ticketId: ticket._id, reply: aiMsg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/chat/history/:ticketId
export const getChatHistory = async (req, res) => {
  try {
    const messages = await Message.find({ ticketId: req.params.ticketId })
      .sort({ createdAt: 1 })
      .lean();
    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};