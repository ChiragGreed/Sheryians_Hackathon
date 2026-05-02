import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Organization name is required"]
    },
    slug: {
        type: String,
        unique: true,
        required: [true, "Organization slug is required"]
    }

}, { timestamps: true })

const organizationModel = mongoose.model("organizations", organizationSchema);

export default organizationModel