import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "assistant", "agent"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    metadata: {
      isEscalationTrigger: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

messageSchema.index({ ticketId: 1, createdAt: 1 });

const Message = mongoose.model("Message", messageSchema);
export default Message;