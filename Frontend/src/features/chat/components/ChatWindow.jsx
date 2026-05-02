import React from 'react';
import StatusBar from './StatusBar';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

// Props (to be wired by hooks layer):
//   messages, socketStatus, ticketStatus, isAITyping
//   onSendMessage, onTyping
//
// All props have UI-preview defaults so this works standalone.

const ChatWindow = ({
  messages,           // undefined → MessageList uses its MOCK_MESSAGES
  socketStatus = 'connected',
  ticketStatus = null,
  isAITyping = false,
  onSendMessage,
  onTyping,
}) => {
  const isDisabled = ticketStatus === 'resolved' || ticketStatus === 'closed';

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">

      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="flex items-center gap-3 px-5 py-4 border-b border-outline/10 bg-surface-container-lowest flex-shrink-0">
        {/* Brand icon */}
        <div className="w-9 h-9 rounded-full bg-primary-fixed/10 border border-primary-fixed/20 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-primary-fixed" style={{ fontSize: '20px' }}>
            smart_toy
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="font-headline-md text-sm text-on-surface leading-tight">SolveX AI</h1>
          <p className="text-[11px] text-on-surface-variant font-body-md">Customer support assistant</p>
        </div>

        {/* Menu / minimize button (UI only) */}
        <button
          id="chat-menu-btn"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
          aria-label="Chat options"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_vert</span>
        </button>
      </header>

      {/* ── Status bar ──────────────────────────────────────────── */}
      <StatusBar socketStatus={socketStatus} ticketStatus={ticketStatus} />

      {/* ── Message area ────────────────────────────────────────── */}
      <MessageList messages={messages} isAITyping={isAITyping} />

      {/* ── Input ───────────────────────────────────────────────── */}
      <MessageInput
        onSendMessage={onSendMessage}
        onTyping={onTyping}
        disabled={isDisabled}
      />
    </div>
  );
};

export default ChatWindow;
