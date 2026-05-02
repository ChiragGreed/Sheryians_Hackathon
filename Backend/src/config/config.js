import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../../.env') });

if (!process.env.MONGO_URI) {
    throw new Error("Mongo Uri not found in environmental variables")
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT Secret not found in environmental variables")
}

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("Google client id not found in environmental variables")
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Google client secret not found in environmental variables")
}

if (!process.env.PINECONE_API_KEY) {
    throw new Error("Pinecone API key not found in environmental variables")
}

if (!process.env.PINECONE_INDEX) {
    throw new Error("Pinecone index not found in environmental variables")
}

if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key not found in environmental variables")
}

if (!process.env.HUGGINGFACE_API_KEY) {
    throw new Error("HuggingFace API key not found in environmental variables")
}

export const Config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    PORT: process.env.PORT,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_INDEX: process.env.PINECONE_INDEX,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    huggingFaceApiKey: process.env.HUGGINGFACE_API_KEY,
    
}