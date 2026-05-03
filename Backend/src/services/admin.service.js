import Ticket from "../models/ticketModel.js";

class AdminService {
    async getDashboardStats() {
        const totalTickets = await Ticket.countDocuments();
        const openTickets = await Ticket.countDocuments({ status: "open" });
        const resolvedTickets = await Ticket.countDocuments({ status: "resolved" });
        
        // AI Resolution rate = (resolved tickets that were not escalated) / total resolved tickets
        const resolvedByAI = await Ticket.countDocuments({ status: "resolved", isEscalated: false });
        const aiResolutionRate = resolvedTickets > 0 ? ((resolvedByAI / resolvedTickets) * 100).toFixed(1) : 0;
        
        // Mock average response time and CSAT for now since we don't have fields for them yet
        const avgResponseTime = "1m 12s";
        const csatScore = "4.8";

        return {
            openTickets,
            aiResolutionRate: `${aiResolutionRate}%`,
            avgResponseTime,
            csatScore
        };
    }

    async getRecentConversations() {
        // Fetch recent tickets
        const tickets = await Ticket.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .lean();
            
        // Map to what UI expects
        return tickets.map(ticket => {
            let uiStatus = "Open";
            if (ticket.isEscalated) uiStatus = "Escalated";
            else if (ticket.status === "resolved" || ticket.status === "closed") uiStatus = "Resolved";

            return {
                id: ticket._id,
                user: ticket.visitorId || "Unknown Visitor",
                status: uiStatus,
                channel: "Web Chat",
                handledBy: ticket.isEscalated ? "Human Agent" : "AI Assistant",
                time: ticket.createdAt
            };
        });
    }
}

export default new AdminService();
