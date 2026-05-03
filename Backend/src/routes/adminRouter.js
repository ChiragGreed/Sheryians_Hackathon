import express from 'express';
import { getDashboardStats, getRecentConversations } from '../controllers/adminController.js';
import { verifyToken } from "../middleware/authMiddleware.js";
import {
    sendAgentInvitation,
    acceptAgentInvitation,
    verifyInvitationToken,
    getOrganizationInvitations,
    cancelInvitation
} from "../controllers/agentController.js";

const adminRouter = express.Router();

// Dashboard routes
adminRouter.get("/dashboard/stats", verifyToken, getDashboardStats);
adminRouter.get("/dashboard/conversations", verifyToken, getRecentConversations);

// Send agent invitation (Admin only)
adminRouter.post("/invite", verifyToken, sendAgentInvitation);

// Accept agent invitation (Public route with token)
adminRouter.post("/accept-invitation", acceptAgentInvitation);

// Verify invitation token (Public route)
adminRouter.get("/verify-invitation", verifyInvitationToken);

// Get organization invitations (Admin only)
adminRouter.get("/invitations", verifyToken, getOrganizationInvitations);

// Cancel invitation (Admin only)
adminRouter.delete("/invitations/:invitationId", verifyToken, cancelInvitation);

export default adminRouter;
