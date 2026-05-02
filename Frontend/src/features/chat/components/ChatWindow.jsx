import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

// Right panel — active chat area
// Props (to be wired by hooks layer):
//   messages, isAITyping, ticketStatus, socketStatus
//   onSendMessage, onTyping
//   activeThread: { name, status }

const ChatWindow = ({
  messages,
  isAITyping = false,
  ticketStatus = null,
  socketStatus = 'connected',
  onSendMessage,
  onTyping,
  activeThread = { name: 'New Conversation', status: 'OPEN' },
}) => {
  const isDisabled = ticketStatus === 'resolved' || ticketStatus === 'closed';

  // Map ticket/socket status to display label
  const statusLabel = ticketStatus === 'escalated'
    ? 'AGENT CONNECTED'
    : ticketStatus === 'resolved'
    ? 'RESOLVED'
    : ticketStatus === 'closed'
    ? 'CLOSED'
    : socketStatus === 'connected'
    ? 'AI ONLINE'
    : socketStatus === 'connecting'
    ? 'CONNECTING...'
    : 'OFFLINE';

  const statusColor = ticketStatus === 'escalated'
    ? 'text-primary-fixed'
    : ticketStatus === 'resolved' || ticketStatus === 'closed'
    ? 'text-on-surface-variant'
    : socketStatus === 'connected'
    ? 'text-primary-fixed'
    : 'text-error';

  return (
    <div className="flex-1 flex flex-col bg-background h-full min-w-0">

      {/* ── Chat header ─────────────────────────────────────────── */}
      <header className="flex items-center gap-4 px-6 py-4 border-b border-outline/10 bg-surface-container-lowest flex-shrink-0">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary-fixed/10 border border-primary-fixed/20 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-primary-fixed" style={{ fontSize: '22px' }}>
            smart_toy
          </span>
        </div>

        {/* Name + status */}
        <div className="flex-1 min-w-0">
          <h1 className="font-headline-md text-sm text-on-surface truncate">{activeThread.name}</h1>
          <p className={`text-[10px] font-label-bold uppercase tracking-widest ${statusColor}`}>
            STATUS: {statusLabel}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" aria-label="Call">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>call</span>
          </button>
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" aria-label="Video call">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>videocam</span>
          </button>
          <button className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" aria-label="More options">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>more_vert</span>
          </button>
        </div>
      </header>

      {/* ── Session start marker ─────────────────────────────────── */}
      <div className="flex justify-center pt-4 pb-1">
        <span className="text-[9px] text-on-surface-variant font-label-bold uppercase tracking-widest border border-outline/10 rounded-full px-3 py-1">
          System Start: New Session
        </span>
      </div>

      {/* ── Messages ────────────────────────────────────────────── */}
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
