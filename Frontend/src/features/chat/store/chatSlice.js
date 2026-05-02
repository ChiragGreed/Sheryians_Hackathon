import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ticketId: null,           // Set after join:room succeeds
    messages: [],             // Array of { _id, role, content, createdAt }
    socketStatus: 'idle',     // Frontend-only: 'idle' | 'connecting' | 'connected' | 'disconnected'
    ticketStatus: null,       // Mirrors backend enum: 'open' | 'resolved' | 'escalated' | 'closed'
    isAITyping: false,        // Controls AI typing bubble visibility
    isUserTyping: false,      // Other party is typing (for agent view)
    error: null,              // Error message string or null
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // Called after room:joined — saves ticketId
        setTicketId: (state, action) => {
            state.ticketId = action.payload;
        },

        // Updates the Socket.IO connection state (frontend-only)
        setSocketStatus: (state, action) => {
            state.socketStatus = action.payload; // 'idle' | 'connecting' | 'connected' | 'disconnected'
        },

        // Updates the backend ticket status (from room:joined or ticket:escalated)
        setTicketStatus: (state, action) => {
            state.ticketStatus = action.payload; // 'open' | 'resolved' | 'escalated' | 'closed'
        },

        // Loads full message history at once (on room:joined)
        setMessages: (state, action) => {
            state.messages = action.payload;
        },

        // Appends a single new message (on message:new)
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },

        // Toggles AI typing indicator (on ai:typing)
        setAITyping: (state, action) => {
            state.isAITyping = action.payload;
        },

        // Toggles other-user typing indicator (on user:typing)
        setUserTyping: (state, action) => {
            state.isUserTyping = action.payload;
        },

        // Stores an error message (on error:general)
        setError: (state, action) => {
            state.error = action.payload;
        },

        // Full reset on component unmount
        resetChat: () => initialState,
    },
});

export const {
    setTicketId,
    setSocketStatus,
    setTicketStatus,
    setMessages,
    addMessage,
    setAITyping,
    setUserTyping,
    setError,
    resetChat,
} = chatSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────
// Use these in hooks/components instead of writing state.chat.xxx everywhere

export const selectTicketId      = (state) => state.chat.ticketId;
export const selectMessages      = (state) => state.chat.messages;
export const selectSocketStatus  = (state) => state.chat.socketStatus;
export const selectTicketStatus  = (state) => state.chat.ticketStatus;
export const selectIsAITyping    = (state) => state.chat.isAITyping;
export const selectIsUserTyping  = (state) => state.chat.isUserTyping;
export const selectChatError     = (state) => state.chat.error;

export default chatSlice.reducer;
