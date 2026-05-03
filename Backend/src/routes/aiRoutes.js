import express from "express";
import { handleAI } from "../controllers/aiController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/respond", verifyToken, handleAI);

export default router;