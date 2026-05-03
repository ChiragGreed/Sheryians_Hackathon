import { google } from "googleapis";
import { Config } from "../config/config.js";

const getGmailService = async () => {
    const oauth2Client = new google.auth.OAuth2(
        Config.GOOGLE_CLIENT_ID,
        Config.GOOGLE_CLIENT_SECRET,
    );

    oauth2Client.setCredentials({
        refresh_token: Config.GOOGLE_REFRESH_TOKEN,
    });

    return google.gmail({ version: "v1", auth: oauth2Client });
};

const buildMimeMessage = (to, from, subject, htmlBody) => {
    const message = [
        `From: ${from}`,
        `To: ${to}`,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset=utf-8`,
        ``,
        htmlBody,
    ].join("\n");

    return Buffer.from(message).toString("base64url");
};

const sendEmail = async (to, subject, htmlBody) => {
    const gmail = await getGmailService();
    const raw = buildMimeMessage(to, Config.GOOGLE_USER, subject, htmlBody);

    const res = await gmail.users.messages.send({
        userId: "me",
        requestBody: { raw },
    });

    return res.data;
};

/**
 * Send agent invitation email
 * @param {string} recipientEmail - Email of the agent to invite
 * @param {string} organizationName - Name of the organization
 * @param {string} invitationToken - Unique invitation token
 * @param {string} frontendUrl - Frontend base URL for the acceptance link
 */
export const sendAgentInvitationEmail = async (recipientEmail, organizationName, invitationToken, frontendUrl = "https://sheryians-hackathon.onrender.com") => {
    try {
        const acceptanceLink = `${frontendUrl}/accept-invitation?token=${invitationToken}`;

        const html = `
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
        `;

        const data = await sendEmail(
            recipientEmail,
            `You're invited to join ${organizationName} as an Agent`,
            html
        );

        console.log("Invitation email sent:", data.id);
        return { success: true, messageId: data.id };
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
        const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>Welcome!</h2>
                <p>Thank you for accepting the invitation to join <strong>${organizationName}</strong>.</p>
                <p>You have been successfully assigned the Agent role and can now:</p>
                <ul>
                    <li>Access the organization's resources</li>
                    <li>Collaborate with other team members</li>
                    <li>Manage customer interactions</li>
                </ul>
                <p>Log in to get started: <a href="${Config.FRONTEND_URL || "http://localhost:5173"}">Login</a></p>
                <p>If you have any questions, please contact the organization administrator.</p>
            </div>
        `;

        const data = await sendEmail(
            recipientEmail,
            `Welcome to ${organizationName}!`,
            html
        );

        console.log("Confirmation email sent:", data.id);
        return { success: true, messageId: data.id };
    } catch (error) {
        console.error("Error sending confirmation email:", error);
        throw new Error("Failed to send confirmation email: " + error.message);
    }
};

export default {
    sendAgentInvitationEmail,
    sendAgentAcceptanceConfirmation
};
