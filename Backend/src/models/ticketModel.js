import mongoose from "mongoose";
import { DUMMY_ORG_ID } from "../config/constants.js";

const ticketSchema = new mongoose.Schema(
  {
    // 🔹 User question (AI fallback input)
    query: {
      type: String,
    },

    // 🔹 Admin response
    response: {
      type: String,
    },

    // 🔹 Who asked (for tracking user/session)
    visitorId: {
      type: String,
      required: true,
    },

    // 🔹 Organization (multi-tenant support)
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizations",
      required: false,
    },

    // 🔹 Ticket status
    status: {
      type: String,
      enum: ["open", "resolved", "escalated", "closed"],
      default: "open",
    },

    // 🔹 Escalation flag
    isEscalated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;