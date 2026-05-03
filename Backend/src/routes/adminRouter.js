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
