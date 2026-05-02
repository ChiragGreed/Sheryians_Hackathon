import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

// Props (to be wired by hooks layer):
//   messages: array of message objects
//   isAITyping: boolean

// MOCK DATA — remove when hooks layer is connected
const MOCK_MESSAGES = [
  {
    _id: '1',
    role: 'assistant',
    content: 'Hello! 👋 I\'m your AI assistant. How can I help you today?',
    createdAt: new Date(Date.now() - 60000).toISOString(),
  },
  {
    _id: '2',
    role: 'user',
    content: 'I need help with my recent order.',
    createdAt: new Date(Date.now() - 45000).toISOString(),
  },
  {
    _id: '3',
    role: 'assistant',
    content: 'Sure! I\'d be happy to help with your order. Could you please share your order number so I can look it up?',
    createdAt: new Date(Date.now() - 30000).toISOString(),
  },
  {
    _id: '4',
    role: 'user',
    content: 'I want to speak to a human agent.',
    createdAt: new Date(Date.now() - 15000).toISOString(),
  },
  {
    _id: '5',
    role: 'system',
    content: 'You have been connected to a human agent. Please wait...',
    createdAt: new Date(Date.now() - 5000).toISOString(),
  },
];

const MessageList = ({ messages = MOCK_MESSAGES, isAITyping = false }) => {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAITyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-thin scrollbar-thumb-surface-container-high scrollbar-track-transparent">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-12">
          <div className="w-14 h-14 rounded-full bg-primary-fixed/10 border border-primary-fixed/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-fixed" style={{ fontSize: '28px' }}>
              smart_toy
            </span>
          </div>
          <p className="text-on-surface-variant font-body-md text-sm max-w-xs">
            Hi there! Start a conversation and I'll do my best to help you.
          </p>
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble key={msg._id} message={msg} />
      ))}

      <TypingIndicator isAITyping={isAITyping} />

      {/* Invisible anchor for auto-scroll */}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
