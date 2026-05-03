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

    const matches = result.matches.slice(0, 3); 

    const bestMatch = matches.find(m => m.score > 0.7);

    if (!bestMatch) return [];

    return [bestMatch.metadata.text];
};