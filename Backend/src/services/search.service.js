import { getEmbedding, model } from "./gemini.service.js";
import { index } from "../config/pinecone.js";

export const searchChunks = async (query, organizationId) => {
    const vector = await getEmbedding(query);

    const result = await index.query({
        vector,
        topK: 3,
        includeMetadata: true,
        filter: {
            organizationId: { $eq: organizationId.toString() },
        },
    });

    console.log("RAW MATCHES:", result.matches);

    if (!result.matches || result.matches.length === 0) return [];

  // 👉 always return top match (no strict threshold)
    return result.matches.map(m => m.metadata.text);
};