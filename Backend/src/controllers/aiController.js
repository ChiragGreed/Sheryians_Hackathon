import { searchChunks } from "../services/search.service.js";
import { generateResponse } from "../services/gemini.service.js";

export const handleAI = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
        return res.status(400).json({ error: "Query is required" });
        }

        const chunks = await searchChunks(query, "org1");

        const answer = await generateResponse(query, chunks);

        res.json({
            answer,
            chunks,
        });

    } catch (err) {
        console.error("❌ AI Error:", err);
        res.status(500).json({ error: "AI failed" });
    }
};