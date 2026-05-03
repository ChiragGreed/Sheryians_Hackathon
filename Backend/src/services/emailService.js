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
        const acceptanceLink = `${frontendUrl}/api/agent/accept-invitation?token=${invitationToken}`;

        const html = `
            < div style = "background:#0a0a0a; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, sans-serif;" >
                <div style="max-width:600px; width:100%; margin:0 auto; background:#111; border:1px solid #1a1a1a; border-radius:4px; overflow:hidden; box-shadow:0 0 60px rgba(180,255,80,0.07);">

                    <!-- Header -->
                    <div style="background:#0d0d0d; border-bottom:1px solid #1e1e1e; padding:24px 40px; display:flex; align-items:center; justify-content:space-between;">
                        <span style="color:#b4ff50; font-size:20px; font-weight:800; letter-spacing:-0.5px;">SolveX</span>
                        <span style="border:1px solid #2a2a2a; border-radius:20px; padding:5px 14px; color:#b4ff50; font-size:10px; letter-spacing:2px; text-transform:uppercase;">🤖 AI Customer Support System</span>
                    </div>

                    <!-- Body -->
                    <div style="padding:48px 40px;">
                        <div style="margin-bottom:24px;">
                            <span style="background:rgba(180,255,80,0.08); border:1px solid rgba(180,255,80,0.2); color:#b4ff50; font-size:10px; letter-spacing:2.5px; text-transform:uppercase; padding:6px 14px; border-radius:2px;">Agent Invitation</span>
                        </div>

                        <h2 style="color:#fff; font-size:28px; font-weight:800; letter-spacing:-1px; line-height:1.2; margin:0 0 20px 0; text-transform:uppercase;">You've Been<br /><span style="color:#b4ff50;">Invited.</span></h2>

                        <p style="color:#888; font-size:15px; line-height:1.7; margin:0 0 8px 0;">You have been invited to join <strong style="color:#ccc;">${organizationName}</strong> as an Agent on SolveX.</p>
                        <p style="color:#888; font-size:15px; line-height:1.7; margin:0 0 36px 0;">Click the button below to accept and get started.</p>

                        <a href="${acceptanceLink}" style="display:inline-block; padding:14px 32px; background:#b4ff50; color:#0a0a0a; text-decoration:none; border-radius:3px; font-size:12px; font-weight:800; letter-spacing:2px; text-transform:uppercase; margin-bottom:36px;">Accept Invitation →</a>

                        <div style="border-top:1px solid #1e1e1e; margin:36px 0;"></div>

                        <p style="color:#555; font-size:12px; margin:0 0 10px 0; text-transform:uppercase; letter-spacing:1px;">Or copy this link:</p>
                        <div style="background:#0d0d0d; border:1px solid #1e1e1e; border-left:3px solid #b4ff50; padding:12px 16px; border-radius:2px; margin-bottom:36px;">
                            <code style="color:#b4ff50; font-size:12px; word-break:break-all; font-family:'Courier New', monospace;">${acceptanceLink}</code>
                        </div>

                        <p style="color:#444; font-size:11px; line-height:1.6; margin:0; border-top:1px solid #1a1a1a; padding-top:24px;">
                            This invitation link will expire in <strong style="color:#555;">7 days</strong>. If you didn't expect this invitation, please ignore this email.
                        </p>
                    </div>

                    <!-- Footer -->
                    <div style="background:#0d0d0d; border-top:1px solid #1a1a1a; padding:16px 40px; display:flex; align-items:center; justify-content:space-between;">
                        <span style="color:#333; font-size:11px;">© SolveX · AI Customer Support</span>
                        <span style="color:#b4ff50; font-size:11px; letter-spacing:1px;">SECURE INVITE</span>
                    </div>

                </div>
  </div >
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
