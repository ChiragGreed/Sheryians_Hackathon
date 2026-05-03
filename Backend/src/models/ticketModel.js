import mongoose from "mongoose";
import { DUMMY_ORG_ID } from "../config/constants.js";

const ticketSchema = new mongoose.Schema(
  {
    // 🔹 User question (AI fallback input)
    query: {
      type: String,
      required: true,
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
      required: true,
    },

    // 🔹 Ticket status
    status: {
      type: String,
      enum: ["open", "assigned", "in_progress", "resolved", "escalated"],
      default: "open",
    },

    // 🔹 Escalation flag
    isEscalated: {
      type: Boolean,
      default: false,
    },

    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    assignmentHistory:[
    {
      agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      assignedAt: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;