import express from "express";
import { handleAI,getTickets,respondTicket } from "../controllers/aiController.js";

const router = express.Router();

router.post("/ai/respond", handleAI);

router.get("/tickets", getTickets);

router.post("/tickets/:id/respond", respondTicket);

export default router;