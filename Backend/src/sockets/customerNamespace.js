import Ticket from "../models/ticketModel.js";
import Message from "../models/Message.js";
import { generateAIResponse } from "../services/gemini.service.js";
import {
  checkEscalation,
  escalateTicket,
} from "../services/escalationService.js";
import { DUMMY_ORG_ID } from "../config/constants.js";

const setupCustomerNamespace = (io) => {
  const customer = io.of("/customer"); // /customer namespace

  customer.on("connection", (socket) => {
    console.log(`Visitor connected: ${socket.id}`);

    // ─── join:room ────────────────────────────────────────────
    socket.on("join:room", async ({ ticketId, visitorId }) => {
      try {
        let ticket = ticketId ? await Ticket.findById(ticketId) : null;

        if (!ticket) {
          ticket = await Ticket.create({
            organizationId: socket.user?.organizationId || DUMMY_ORG_ID, // ← fix here
            visitorId: visitorId || socket.id,
          });
        }

        const roomId = ticket._id.toString();
        socket.join(roomId);
        socket.ticketId = roomId;

        const history = await Message.find({ ticketId: roomId })
          .sort({ createdAt: 1 })
          .lean();

        socket.emit("room:joined", {
          ticketId: roomId,
          status: ticket.status,
          history,
        });

        console.log(`📦 ${socket.id} joined room ${roomId}`);
      } catch (err) {
        socket.emit("error:general", { message: "Failed to join room" });
        console.error("join:room error:", err);
      }
    });

    // ─── customer:message ─────────────────────────────────────
    socket.on("customer:message", async ({ content }) => {
      const ticketId = socket.ticketId;
      if (!ticketId || !content?.trim()) return;

      try {
        // 1. Save user message to DB
        const userMsg = await Message.create({
          ticketId,
          role: "user",
          content: content.trim(),
        });

        // Broadcast to room (so agents/other tabs see it)
        customer.to(ticketId).emit("message:new", userMsg);

        // 2. Check escalation — "human" keyword detect karo
        if (checkEscalation(content)) {
          await escalateTicket(ticketId);

          await Message.findByIdAndUpdate(userMsg._id, {
            "metadata.isEscalationTrigger": true,
          });

          const escalationMsg = {
            role: "system",
            content: "You have been connected to a human agent. Please wait...",
          };

          socket.emit("ticket:escalated", escalationMsg);
          customer.to(ticketId).emit("ticket:escalated", escalationMsg);
          return; // stop — don't send AI reply
        }

        // 3. Show typing indicator
        socket.emit("ai:typing", { typing: true });

        // 4. Get AI response
        const aiText = await generateAIResponse(ticketId, content.trim());

        // 5. Save AI message to DB
        const aiMsg = await Message.create({
          ticketId,
          role: "assistant",
          content: aiText,
        });

        // 6. Send reply back
        socket.emit("ai:typing", { typing: false });
        socket.emit("message:new", aiMsg);
      } catch (err) {
        socket.emit("ai:typing", { typing: false });
        socket.emit("error:general", { message: "Something went wrong" });
        console.error("customer:message error:", err);
      }
    });

    // ─── typing indicator ─────────────────────────────────────
    socket.on("user:typing", ({ typing }) => {
      if (socket.ticketId) {
        socket.to(socket.ticketId).emit("user:typing", { typing });
      }
    });

    // ─── disconnect ───────────────────────────────────────────
    socket.on("disconnect", () => {
      console.log(`🔴 Visitor disconnected: ${socket.id}`);
    });
  });
};

export default setupCustomerNamespace;
