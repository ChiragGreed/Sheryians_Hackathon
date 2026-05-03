import express from 'express';
import { getDashboardStats, getRecentConversations } from '../controllers/adminController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply verifyToken middleware if you want to restrict to logged in users, 
// for now keeping it open or using verifyToken based on your auth flow.
// Using verifyToken to be safe.
router.get("/dashboard/stats", verifyToken, getDashboardStats);
router.get("/dashboard/conversations", verifyToken, getRecentConversations);

export default router;
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
    sendAgentInvitation,
    acceptAgentInvitation,
    verifyInvitationToken,
    getOrganizationInvitations,
    cancelInvitation
} from "../controllers/agentController.js";

const adminRouter = express.Router();

// Send agent invitation (Admin only)
adminRouter.post("/invite", verifyToken, sendAgentInvitation);

// Accept agent invitation (Public route with token) - POST request
adminRouter.post("/accept-invitation", acceptAgentInvitation);

// Verify invitation token (Public route with token)
adminRouter.get("/verify-invitation", verifyInvitationToken);

// Get organization invitations (Admin only)
adminRouter.get("/invitations", verifyToken, getOrganizationInvitations);

// Cancel invitation (Admin only)
adminRouter.delete("/invitations/:invitationId", verifyToken, cancelInvitation);

export default adminRouter;
