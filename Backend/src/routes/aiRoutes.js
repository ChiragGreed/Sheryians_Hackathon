import express from "express";
import { handleAI } from "../controllers/aiController.js";

const router = express.Router();

router.post("/ai/respond", handleAI);

export default router;