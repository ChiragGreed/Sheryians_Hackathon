import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import {assignTicket, reassignTicket, takeTicket, resolveTicket, getAdminTickets, getMyTickets} from "../controllers/ticketController.js";

const router = express.Router();

// 🔥 core actions
router.post("/:id/assign", verifyToken, isAdmin, assignTicket);
router.put("/:id/reassign", verifyToken, reassignTicket);
router.put("/:id/take", verifyToken, takeTicket);
router.put("/:id/resolve", verifyToken, resolveTicket);

// 🔥 views
router.get("/admin", verifyToken, isAdmin, getAdminTickets);
router.get("/me", verifyToken, getMyTickets);

export default router;