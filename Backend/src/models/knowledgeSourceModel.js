import mongoose from "mongoose";

const knowledgeSourceSchema = new mongoose.Schema(
{
    type: {
        type: String, // "pdf" | "text"
        required: true,
    },
    content: {
        type: String, 
    },
    fileName: {
        type: String, 
    },
    organizationId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["processing", "processed", "failed"],
        default: "processing",
    },
},
    { timestamps: true }
);

export default mongoose.model("KnowledgeSource", knowledgeSourceSchema);