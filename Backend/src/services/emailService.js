import nodemailer from "nodemailer";
import { Config } from "../config/config.js";

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: Config.GOOGLE_USER,
        clientId: Config.GOOGLE_CLIENT_ID,
        clientSecret: Config.GOOGLE_CLIENT_SECRET,
        refreshToken: Config.GOOGLE_REFRESH_TOKEN
    }
});

// Verify transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.log("Email service error:", error);
    } else {
        console.log("Email service is ready");
    }
});

/**
 * Send agent invitation email
 * @param {string} recipientEmail - Email of the agent to invite
 * @param {string} organizationName - Name of the organization
 * @param {string} invitationToken - Unique invitation token
 * @param {string} frontendUrl - Frontend base URL for the acceptance link
 */
export const sendAgentInvitationEmail = async (recipientEmail, organizationName, invitationToken, frontendUrl = "http://localhost:5173") => {
    try {
        const acceptanceLink = `${frontendUrl}/accept-invitation?token=${invitationToken}`;

        const mailOptions = {
            from: Config.GOOGLE_USER,
            to: recipientEmail,
            subject: `You're invited to join ${organizationName} as an Agent`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2>Agent Invitation</h2>
                    <p>You have been invited to join <strong>${organizationName}</strong> as an Agent.</p>
                    <p>Click the link below to accept the invitation:</p>
                    <p>
                        <a href="${acceptanceLink}" style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">
                            Accept Invitation
                        </a>
                    </p>
                    <p>Or copy this link in your browser:</p>
                    <p><code>${acceptanceLink}</code></p>
                    <p style="color: #666; font-size: 12px;">
                        This invitation link will expire in 7 days. If you didn't expect this invitation, please ignore this email.
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Invitation email sent:", info.response);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending invitation email:", error);
        throw new Error("Failed to send invitation email: " + error.message);
    }
};

/**
 * Send agent acceptance confirmation email
 * @param {string} recipientEmail - Email to send confirmation to
 * @param {string} organizationName - Name of the organization
 */
export const sendAgentAcceptanceConfirmation = async (recipientEmail, organizationName) => {
    try {
        const mailOptions = {
            from: Config.GOOGLE_USER,
            to: recipientEmail,
            subject: `Welcome to ${organizationName}!`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2>Welcome!</h2>
                    <p>Thank you for accepting the invitation to join <strong>${organizationName}</strong>.</p>
                    <p>You have been successfully assigned the Agent role and can now:</p>
                    <ul>
                        <li>Access the organization's resources</li>
                        <li>Collaborate with other team members</li>
                        <li>Manage customer interactions</li>
                    </ul>
                    <p>Log in to get started: <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}">Login</a></p>
                    <p>If you have any questions, please contact the organization administrator.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Confirmation email sent:", info.response);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending confirmation email:", error);
        throw new Error("Failed to send confirmation email: " + error.message);
    }
};

export default {
    sendAgentInvitationEmail,
    sendAgentAcceptanceConfirmation
};
