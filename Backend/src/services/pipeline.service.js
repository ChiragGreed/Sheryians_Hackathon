import { getEmbedding } from "./gemini.service.js";
import { index } from "../config/pinecone.js";

const chunkText = (text) => {
    const words = text.split(" ");
    const size = 400;
    const chunks = [];

    for (let i = 0; i < words.length; i += size) {
        chunks.push(words.slice(i, i + size).join(" "));
    }

    return chunks;
};


export const processText = async (text, orgId) => {
    try {
        const chunks = chunkText(text);

        const vectors = [];

        for (let chunk of chunks) {
        const embedding = await getEmbedding(chunk);

        console.log("Embedding length:", embedding?.length); 

        if (embedding && embedding.length === 768) {
            vectors.push({
            id: crypto.randomUUID(),
            values: embedding,
            metadata: {
                text: chunk,
                orgId,
            },
            });
        }
        }

        console.log("Vectors count:", vectors.length); 

        if (vectors.length === 0) {
        throw new Error("No vectors created");
        }

        await index.upsert({
            namespace: "default",
            records: vectors.map(v => ({
                id: v.id,
                values: v.values,
                metadata: v.metadata,
            })),
        });

        console.log("✅ Stored in Pinecone");
    } catch (err) {
        console.error("❌ Pipeline error:", err);
    }
};