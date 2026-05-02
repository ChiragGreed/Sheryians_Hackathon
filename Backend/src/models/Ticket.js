import mongoose from "mongoose";
import { DUMMY_ORG_ID } from "../config/constants.js";

const ticketSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      default: DUMMY_ORG_ID,
    },
    visitorId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "escalated", "closed"],
      default: "open",
    },
    isEscalated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;