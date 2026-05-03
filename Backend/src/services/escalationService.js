import { ESCALATION_KEYWORDS } from "../config/constants.js";
import Ticket from "../models/ticketModel.js";

export const checkEscalation = (message) => {
  const lower = message.toLowerCase();
  return ESCALATION_KEYWORDS.some((kw) => lower.includes(kw));
};

export const escalateTicket = async (ticketId, query) => {
  await Ticket.findByIdAndUpdate(ticketId, {
    status: "escalated",
    isEscalated: true,
    query: query,
  });
  console.log(`🚨 Ticket ${ticketId} escalated to human`);
};