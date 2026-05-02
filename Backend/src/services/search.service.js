import { getEmbedding, model } from "./gemini.service.js";
import { index } from "../config/pinecone.js";

export const searchChunks = async (query) => {
    const vector = await getEmbedding(query);

    const result = await index.query({
        vector,
        topK: 3,
        includeMetadata: true,
    });

    const bestMatch = result.matches[0];

    if (!bestMatch || bestMatch.score < 0.7) {
        return [];
    }

    return [bestMatch.metadata.text];
};