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

// Accept agent invitation (Public route with token)
adminRouter.post("/accept-invitation", acceptAgentInvitation);

// Verify invitation token (Public route with token)
adminRouter.get("/verify-token", verifyInvitationToken);

// Get organization invitations (Admin only)
adminRouter.get("/invitations", verifyToken, getOrganizationInvitations);

// Cancel invitation (Admin only)
adminRouter.delete("/invitations/:invitationId", verifyToken, cancelInvitation);

export default adminRouter;
