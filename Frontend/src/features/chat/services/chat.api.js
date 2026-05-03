import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9010/api/chat',
  withCredentials: true,
});

/**
 * Fetch message history for a ticket.
 * GET /api/chat/history/:ticketId
 * @returns {Promise<Array>} array of message objects
 */
export async function fetchChatHistory(ticketId) {
  const res = await api.get(`/history/${ticketId}`);
  return res.data.messages;
}

/**
 * Send a message via REST (fallback if socket is unavailable).
 * POST /api/chat/message
 */
export async function sendMessageREST({ ticketId, content, visitorId }) {
  const res = await api.post('/message', { ticketId, content, visitorId });
  return res.data;
}
