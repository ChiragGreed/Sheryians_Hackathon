import React from 'react';

// Props (to be wired by hooks layer):
//   message: { _id, role, content, createdAt }
//     role: 'user' | 'assistant' | 'system'

const formatTime = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const MessageBubble = ({ message }) => {
  const { role, content, createdAt } = message;

  // ─── System message (escalation notice) ───────────────────────────────────
  if (role === 'system') {
    return (
      <div className="flex justify-center my-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-surface-container border border-primary-fixed/20 rounded-full">
          <span className="material-symbols-outlined text-primary-fixed" style={{ fontSize: '14px' }}>
            support_agent
          </span>
          <span className="text-xs text-on-surface-variant font-body-md">{content}</span>
        </div>
      </div>
    );
  }

  // ─── User message (right-aligned) ─────────────────────────────────────────
  if (role === 'user') {
    return (
      <div className="flex justify-end items-end gap-2 mb-3 group">
        <div className="flex flex-col items-end max-w-[75%]">
          <div className="bg-primary-fixed text-on-primary px-4 py-2.5 rounded-xl rounded-br-sm font-body-md text-sm leading-relaxed">
            {content}
          </div>
          <span className="text-[10px] text-on-surface-variant mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {formatTime(createdAt)}
          </span>
        </div>
        {/* User avatar */}
        <div className="w-7 h-7 rounded-full bg-surface-container-high border border-outline/20 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '14px' }}>
            person
          </span>
        </div>
      </div>
    );
  }

  // ─── Assistant message (left-aligned) ─────────────────────────────────────
  return (
    <div className="flex items-end gap-2 mb-3 group">
      {/* AI avatar */}
      <div className="w-7 h-7 rounded-full bg-primary-fixed/10 border border-primary-fixed/20 flex items-center justify-center flex-shrink-0">
        <span className="material-symbols-outlined text-primary-fixed" style={{ fontSize: '14px' }}>
          smart_toy
        </span>
      </div>
      <div className="flex flex-col items-start max-w-[75%]">
        <div className="bg-surface-container border border-outline/10 text-on-surface px-4 py-2.5 rounded-xl rounded-bl-sm font-body-md text-sm leading-relaxed">
          {content}
        </div>
        <span className="text-[10px] text-on-surface-variant mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {formatTime(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
