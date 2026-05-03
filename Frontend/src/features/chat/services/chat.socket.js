import { io } from 'socket.io-client';

// ─── Singleton socket for /customer namespace ──────────────────────────────
// The token is optional. Guests connect without one; logged-in users pass it
// so the backend can attach organizationId to the socket.

let socket = null;

/**
 * Call once when the chat page mounts.
 * @param {string|null} token  JWT from Redux auth state (or null for guests)
 */
export function createSocket(token = null) {
  if (socket) return socket; // already created — return same instance

  socket = io('http://localhost:9010/customer', {
    autoConnect: false,        // we control when to connect
    withCredentials: true,
    auth: token ? { token } : {},
  });

  return socket;
}

/** Disconnect and destroy the singleton — call on ChatPage unmount */
export function destroySocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

/** Get existing socket (throws if not created yet) */
export function getSocket() {
  if (!socket) throw new Error('Socket not initialised. Call createSocket() first.');
  return socket;
}

// ─── Emit helpers ─────────────────────────────────────────────────────────────

/** Tell the server which ticket room to join (or create a new one) */
export function emitJoinRoom({ ticketId = null, visitorId = null } = {}) {
  getSocket().emit('join:room', { ticketId, visitorId });
}

/** Send a user message */
export function emitMessage(content) {
  getSocket().emit('customer:message', { content });
}

/** Broadcast typing status */
export function emitTyping(isTyping) {
  getSocket().emit('user:typing', { typing: isTyping });
}
