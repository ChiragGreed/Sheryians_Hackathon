import mongoose from "mongoose";
import crypto from "crypto";

const InvitationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organizations",
        required: [true, "Organization ID is required"]
    },
    invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Invited by user ID is required"]
    },
    // FIX: token and expiresAt were missing from schema — Mongoose was silently dropping them
    token: {
        type: String,
        unique: true,
        index: true
    },
    expiresAt: {
        type: Date
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "expired"],
        default: "pending"
    },
    expiresAt: {
        type: Date,
        required: true
    },
    acceptedAt: {
        type: Date,
        default: null
    },
    acceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null
    }
}, { timestamps: true });

// Generate unique token before saving
InvitationSchema.pre('save', function () {
    if (this.isNew) {
        this.token = crypto.randomBytes(32).toString('hex');
        this.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }
});

const InvitationModel = mongoose.model("Invitations", InvitationSchema);

export default InvitationModel;