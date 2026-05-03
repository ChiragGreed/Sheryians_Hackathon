// search.service.js
import { getEmbedding } from "./gemini.service.js";
import { index } from "../config/pinecone.js";
import { TaskType } from "@google/generative-ai";   // ← import TaskType here too

const SCORE_THRESHOLD = 0.70;

export const searchChunks = async (query, organizationId) => {
    // ✅ Fix 1: use RETRIEVAL_QUERY for the search vector
    const vector = await getEmbedding(query, TaskType.RETRIEVAL_QUERY);

    const result = await index.query({
        vector,
        topK: 5,
        includeMetadata: true,
        filter: {
            organizationId: { $eq: organizationId.toString() },
        },
    });

    console.log("RAW MATCHES:", result.matches);

    if (!result.matches || result.matches.length === 0) return [];

    // ✅ Fix 3: filter out low-score matches
    const relevant = result.matches.filter(m => m.score >= SCORE_THRESHOLD);

    console.log(`Matches above threshold (${SCORE_THRESHOLD}):`, relevant.length);

    return relevant.map(m => m.metadata.text);
};