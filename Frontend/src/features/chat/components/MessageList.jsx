import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

// Props (to be wired by hooks layer):
//   messages: array of message objects
//   isAITyping: boolean

const MessageList = ({ messages = [], isAITyping = false }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAITyping]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-fixed/10 border border-primary-fixed/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary-fixed" style={{ fontSize: '32px' }}>
              smart_toy
            </span>
          </div>
          <div>
            <p className="text-on-surface font-headline-md text-base mb-1">No messages yet</p>
            <p className="text-on-surface-variant font-body-md text-sm max-w-xs">
              Start a conversation — I'm here to help.
            </p>
          </div>
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble key={msg._id} message={msg} />
      ))}

      <TypingIndicator isAITyping={isAITyping} />
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
