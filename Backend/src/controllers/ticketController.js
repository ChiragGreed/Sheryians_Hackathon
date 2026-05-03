import mongoose from "mongoose";
import ticketModel from "../models/ticketModel.js";
import userModel from "../models/userModel.js";
import { processText } from "../services/pipeline.service.js";

// 🔥 ASSIGN (Admin)
export const assignTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { agentId } = req.body;
        const { organizationId, role } = req.user;

        
        
        if (role !== "Admin") {
            return res.status(403).json({ error: "Only Admin can assign" });
        }
        
        const ticket = await ticketModel.findById(id);
        
        if (!ticket) return res.status(404).json({ error: "Not found" });
        
        if (ticket.organizationId.toString() !== organizationId.toString()) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const agent = await userModel.findById(agentId);
        if (!agent || agent.role !== "Agent") {
        return res.status(400).json({ error: "Invalid agent" });
        }

        ticket.assignedAgent = agentId;
        ticket.status = "assigned";

        ticket.assignmentHistory.push({ agent: agentId });

        await ticket.save();

        res.json({ message: "Assigned", ticket });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 🔥 REASSIGN
export const reassignTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { newAgentId } = req.body;
        const { organizationId, userId, role } = req.user;

        const ticket = await ticketModel.findById(id);
        if (!ticket) return res.status(404).json({ error: "Not found" });

        if (ticket.organizationId.toString() !== organizationId.toString()) {
        return res.status(403).json({ error: "Unauthorized" });
        }

        if (
        ticket.assignedAgent?.toString() !== userId &&
        role !== "Admin"
        ) {
        return res.status(403).json({ error: "Not allowed" });
        }

        ticket.assignedAgent = newAgentId;
        ticket.status = "assigned";

        ticket.assignmentHistory.push({ Agent: newAgentId });

        await ticket.save();

        res.json({ message: "Reassigned", ticket });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 🔥 TAKE
export const takeTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, organizationId } = req.user;

        const ticket = await ticketModel.findById(id);
        if (!ticket) return res.status(404).json({ error: "Not found" });

        if (ticket.organizationId.toString() !== organizationId.toString()) {
        return res.status(403).json({ error: "Unauthorized" });
        }

        ticket.assignedAgent = userId;
        ticket.status = "in_progress";

        ticket.assignmentHistory.push({ Agent: userId });

        await ticket.save();

        res.json({ message: "Taken", ticket });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 🔥 RESOLVE
export const resolveTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { response } = req.body;
        const { userId, organizationId } = req.user;

        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });
        }

        const ticket = await ticketModel.findById(id);
        if (!ticket) return res.status(404).json({ error: "Not found" });

        ticket.response = response;
        ticket.status = "resolved";
        ticket.resolvedBy = userId;

        await ticket.save();

        const learnText = `
    Support answer:
    ${response}
    Related question:
    ${ticket.query}`;

        await processText(learnText, organizationId);

        res.json({ message: "Resolved + learned", ticket });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 🔥 Admin VIEW
export const getAdminTickets = async (req, res) => {
    const { organizationId } = req.user;
    const tickets = await ticketModel.find({ organizationId });
    res.json(tickets);
};

// 🔥 AGENT VIEW
export const getMyTickets = async (req, res) => {
    const { userId } = req.user;
    const tickets = await ticketModel.find({
        assignedAgent: userId,
        status: { $ne: "resolved" },
    });
    res.json(tickets);
};


export const getTickets = async (req, res) => {
    const { organizationId } = req.user;
    const tickets = await ticketModel.find({ organizationId });
    res.json(tickets);
};