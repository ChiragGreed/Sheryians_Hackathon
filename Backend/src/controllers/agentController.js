import InvitationModel from "../models/InvitationModel.js";
import userModel from "../models/userModel.js";
import organizationModel from "../models/organizationModel.js";
import { sendAgentInvitationEmail, sendAgentAcceptanceConfirmation } from "../services/emailService.js";
import JWT from "jsonwebtoken";
import { Config } from "../config/config.js";
import mongoose from "mongoose";

/**
 * Send agent invitation email
 * Admin only - sends invitation to potential agent
 */
export const sendAgentInvitation = async (req, res) => {
    try {
        const { agentEmail } = req.body;
        const adminId = req.user.userId; // From auth middleware

        if (!agentEmail) {
            return res.status(400).json({
                success: false,
                message: "Agent email is required"
            });
        }

        // Get admin user to extract organization
        const admin = await userModel.findById(adminId);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin user not found"
            });
        }

        if (admin.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Only admins can send agent invitations"
            });
        }

        if (!admin.organizationId) {
            return res.status(400).json({
                success: false,
                message: "Admin must be part of an organization"
            });
        }

        // Check if user already exists in organization
        const existingUser = await userModel.findOne({
            email: agentEmail,
            organizationId: admin.organizationId
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists in this organization"
            });
        }

        // Check if invitation already pending
        const existingInvitation = await InvitationModel.findOne({
            email: agentEmail,
            organizationId: admin.organizationId,
            status: "pending"
        });

        if (existingInvitation && existingInvitation.expiresAt > new Date()) {
            return res.status(400).json({
                success: false,
                message: "A pending invitation already exists for this email"
            });
        }

        // Create invitation
        const invitation = await InvitationModel.create({
            email: agentEmail,
            organizationId: admin.organizationId,
            invitedBy: adminId
        });

        // Get organization details
        const organization = await organizationModel.findById(admin.organizationId);

        // Send invitation email
        const frontendUrl = "https://sheryians-hackathon.onrender.com" || "http://localhost:9010";
        await sendAgentInvitationEmail(
            agentEmail,
            organization.name,
            invitation.token,
            frontendUrl
        );

        res.status(201).json({
            success: true,
            message: "Invitation sent successfully",
            invitation: {
                id: invitation._id,
                email: invitation.email,
                status: invitation.status,
                expiresAt: invitation.expiresAt
            }
        });

    } catch (error) {
        console.error("Error in sendAgentInvitation:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send invitation",
            error: error.message
        });
    }
};

/**
 * Accept agent invitation and create user account
 */
export const acceptAgentInvitation = async (req, res) => {
    try {
        const token = req.query.token;
        const { username, password } = req.body;

        if (!token || !username || !password) {
            return res.status(400).json({
                success: false,
                message: "Token, username, and password are required"
            });
        }

        // Find invitation
        const invitation = await InvitationModel.findOne({ token });

        if (!invitation) {
            return res.status(404).json({
                success: false,
                message: "Invalid invitation token"
            });
        }

        // Check if invitation is still valid
        if (invitation.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: `Invitation has already been ${invitation.status}`
            });
        }

        if (invitation.expiresAt < new Date()) {
            invitation.status = "expired";
            await invitation.save();

            return res.status(400).json({
                success: false,
                message: "Invitation has expired"
            });
        }

        // Check if user with email already exists
        const existingUser = await userModel.findOne({ email: invitation.email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            });
        }

        // Check if username is taken
        const existingUsername = await userModel.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: "Username is already taken"
            });
        }

        const session = await mongoose.startSession();

        try {
            let newUser;
            await session.withTransaction(async () => {
                // Create new user with Agent role
                [newUser] = await userModel.create([{
                    username,
                    email: invitation.email,
                    password,
                    role: "Agent",
                    organizationId: invitation.organizationId
                }], { session });

                // Update invitation
                await InvitationModel.updateOne(
                    { _id: invitation._id },
                    {
                        status: "accepted",
                        acceptedAt: new Date(),
                        acceptedBy: newUser._id
                    },
                    { session }
                );
            });

            // Send confirmation email
            const organization = await organizationModel.findById(invitation.organizationId);
            await sendAgentAcceptanceConfirmation(newUser.email, organization.name);

            // Generate JWT token
            const jwtToken = JWT.sign(
                {
                    userId: newUser._id,
                    organizationId: newUser.organizationId,
                    role: newUser.role
                },
                Config.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.cookie("token", jwtToken);

            res.status(200).json({
                success: true,
                message: "Invitation accepted successfully",
                token: jwtToken,
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role,
                    organizationId: newUser.organizationId
                }
            });

        } catch (error) {
            session.endSession();
            throw error;
        } finally {
            session.endSession();
        }

    } catch (error) {
        console.error("Error in acceptAgentInvitation:", error);
        res.status(500).json({
            success: false,
            message: "Failed to accept invitation",
            error: error.message
        });
    }
};

/**
 * Verify invitation token (check if valid)
 */
export const verifyInvitationToken = async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is required"
            });
        }

        const invitation = await InvitationModel.findOne({ token }).populate("organizationId", "name");

        if (!invitation) {
            return res.status(404).json({
                success: false,
                message: "Invalid invitation token"
            });
        }

        if (invitation.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: `Invitation has already been ${invitation.status}`
            });
        }

        if (invitation.expiresAt < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Invitation has expired"
            });
        }

        res.status(200).json({
            success: true,
            message: "Invitation token is valid",
            invitation: {
                email: invitation.email,
                organizationName: invitation.organizationId.name,
                expiresAt: invitation.expiresAt
            }
        });

    } catch (error) {
        console.error("Error in verifyInvitationToken:", error);
        res.status(500).json({
            success: false,
            message: "Failed to verify token",
            error: error.message
        });
    }
};

/**
 * Get all pending invitations for an organization (Admin only)
 */
export const getOrganizationInvitations = async (req, res) => {
    try {
        const adminId = req.user;

        const admin = await userModel.findById(adminId);

        if (!admin || admin.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Only admins can view invitations"
            });
        }

        const invitations = await InvitationModel
            .find({ organizationId: admin.organizationId })
            .populate("invitedBy", "username email")
            .populate("acceptedBy", "username email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            invitations
        });

    } catch (error) {
        console.error("Error in getOrganizationInvitations:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch invitations",
            error: error.message
        });
    }
};

/**
 * Cancel invitation (Admin only)
 */
export const cancelInvitation = async (req, res) => {
    try {
        const adminId = req.user;
        const { invitationId } = req.params;

        const admin = await userModel.findById(adminId);

        if (!admin || admin.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Only admins can cancel invitations"
            });
        }

        const invitation = await InvitationModel.findOne({
            _id: invitationId,
            organizationId: admin.organizationId
        });

        if (!invitation) {
            return res.status(404).json({
                success: false,
                message: "Invitation not found"
            });
        }

        if (invitation.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "Can only cancel pending invitations"
            });
        }

        invitation.status = "rejected";
        await invitation.save();

        res.status(200).json({
            success: true,
            message: "Invitation cancelled successfully"
        });

    } catch (error) {
        console.error("Error in cancelInvitation:", error);
        res.status(500).json({
            success: false,
            message: "Failed to cancel invitation",
            error: error.message
        });
    }
};

export default {
    sendAgentInvitation,
    acceptAgentInvitation,
    verifyInvitationToken,
    getOrganizationInvitations,
    cancelInvitation
};
