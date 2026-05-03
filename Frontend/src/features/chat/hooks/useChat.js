import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTicketId,
  setSocketStatus,
  setTicketStatus,
  setMessages,
  addMessage,
  setAITyping,
  setUserTyping,
  setError,
  resetChat,
  selectTicketId,
  selectMessages,
  selectSocketStatus,
  selectTicketStatus,
  selectIsAITyping,
  selectChatError,
} from '../store/chatSlice';
import {
  createSocket,
  destroySocket,
  emitJoinRoom,
  emitMessage,
  emitTyping,
} from '../services/chat.socket';

const VISITOR_KEY = 'solvex_visitor_id';
const TICKET_KEY  = 'solvex_ticket_id';

function getOrCreateVisitorId() {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = `visitor_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

/**
 * useChat — wires Layer 1 (socket) to Layer 2 (Redux) and exposes clean
 * actions + data to the UI layer.
 *
 * @param {string|null} token  JWT from Redux auth state. Pass null for guests.
 */
export function useChat(token = null) {
  const dispatch = useDispatch();

  // ─── Redux selectors ────────────────────────────────────────────────────
  const ticketId     = useSelector(selectTicketId);
  const messages     = useSelector(selectMessages);
  const socketStatus = useSelector(selectSocketStatus);
  const ticketStatus = useSelector(selectTicketStatus);
  const isAITyping   = useSelector(selectIsAITyping);
  const error        = useSelector(selectChatError);

  // ─── Socket setup & teardown ─────────────────────────────────────────────
  useEffect(() => {
    const socket = createSocket(token);

    // ── Connection lifecycle ──────────────────────────────────────────────
    dispatch(setSocketStatus('connecting'));
    socket.connect();

    socket.on('connect', () => {
      dispatch(setSocketStatus('connected'));

      // Rejoin existing ticket or start a new one
      const savedTicketId = localStorage.getItem(TICKET_KEY);
      const visitorId     = getOrCreateVisitorId();
      emitJoinRoom({ ticketId: savedTicketId, visitorId });
    });

    socket.on('disconnect', () => {
      dispatch(setSocketStatus('disconnected'));
    });

    socket.on('connect_error', (err) => {
      dispatch(setSocketStatus('disconnected'));
      dispatch(setError(err.message));
    });

    // ── Chat events ───────────────────────────────────────────────────────
    socket.on('room:joined', ({ ticketId: id, status, history }) => {
      dispatch(setTicketId(id));
      dispatch(setTicketStatus(status));
      dispatch(setMessages(history));
      localStorage.setItem(TICKET_KEY, id);   // persist for return visits
    });

    socket.on('message:new', (message) => {
      dispatch(addMessage(message));
    });

    socket.on('ai:typing', ({ typing }) => {
      dispatch(setAITyping(typing));
    });

    socket.on('ticket:escalated', (systemMsg) => {
      dispatch(addMessage({ ...systemMsg, _id: `sys_${Date.now()}`, createdAt: new Date().toISOString() }));
      dispatch(setTicketStatus('escalated'));
    });

    socket.on('user:typing', ({ typing }) => {
      dispatch(setUserTyping(typing));
    });

    socket.on('error:general', ({ message }) => {
      dispatch(setError(message));
    });

    // ── Cleanup on unmount ────────────────────────────────────────────────
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('room:joined');
      socket.off('message:new');
      socket.off('ai:typing');
      socket.off('ticket:escalated');
      socket.off('user:typing');
      socket.off('error:general');
      destroySocket();
      dispatch(resetChat());
    };
  }, [dispatch, token]);

  // ─── Actions exposed to UI ───────────────────────────────────────────────
  const sendMessage = useCallback((content) => {
    if (!content?.trim()) return;
    emitMessage(content.trim());
  }, []);

  const sendTyping = useCallback((isTyping) => {
    emitTyping(isTyping);
  }, []);

  return {
    // State
    ticketId,
    messages,
    socketStatus,
    ticketStatus,
    isAITyping,
    error,
    // Actions
    sendMessage,
    sendTyping,
  };
}
