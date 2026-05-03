import adminService from "../services/admin.service.js";

export const getDashboardStats = async (req, res) => {
    try {
        const stats = await adminService.getDashboardStats();
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        console.error("Error in getDashboardStats:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getRecentConversations = async (req, res) => {
    try {
        const conversations = await adminService.getRecentConversations();
        res.status(200).json({ success: true, data: conversations });
    } catch (error) {
        console.error("Error in getRecentConversations:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
