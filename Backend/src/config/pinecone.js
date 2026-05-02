import { Pinecone } from "@pinecone-database/pinecone";
import {Config} from "./config.js";

const pinecone = new Pinecone({
  apiKey: Config.PINECONE_API_KEY,
});

// connect to your index
export const index = pinecone.Index(process.env.PINECONE_INDEX);