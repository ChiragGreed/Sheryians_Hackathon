import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        query: {
            type: String,
            required: true,
        },
        visitorId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["open", "resolved"],
            default: "open",
        },
        organizationId: {
            type: String,
            default: "org1",
        },
        response: {
            type: String, 
        },
    },
    { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);