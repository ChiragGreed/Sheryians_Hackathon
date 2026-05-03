import React from 'react';

// Props (to be wired by hooks layer):
//   message: { _id, role, content, createdAt }

const formatTime = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const MessageBubble = ({ message }) => {
  const { role, content, createdAt } = message;

  // ─── System / escalation message ──────────────────────────────────────────
  if (role === 'system') {
    return (
      <div className="flex justify-center my-4">
        <div className="flex items-center gap-2 px-4 py-1.5 border border-outline/20 rounded-full">
          <span className="material-symbols-outlined text-primary-fixed" style={{ fontSize: '12px' }}>
            support_agent
          </span>
          <span
            className="text-[10px] text-on-surface-variant font-label-bold uppercase tracking-widest"
          >
            {content}
          </span>
        </div>
      </div>
    );
  }

  // ─── User message (right-aligned, green) ──────────────────────────────────
  if (role === 'user') {
    return (
      <div className="flex justify-end items-end gap-3 mb-4">
        <div className="flex flex-col items-end max-w-[65%]">
          <div className="bg-primary-fixed text-on-primary px-4 py-3 rounded-2xl rounded-br-sm font-body-md text-sm leading-relaxed">
            {content}
          </div>
          <span className="text-[10px] text-on-surface-variant mt-1.5 font-body-md">
            {formatTime(createdAt)} · <span className="text-primary-fixed/70">DELIVERED</span>
          </span>
        </div>
        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline/20 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '16px' }}>
            person
          </span>
        </div>
      </div>
    );
  }

  // ─── Assistant message (left-aligned, dark card) ───────────────────────────
  return (
    <div className="flex items-start gap-3 mb-4">
      {/* AI avatar */}
      <div className="w-8 h-8 rounded-full bg-primary-fixed/10 border border-primary-fixed/20 flex items-center justify-center flex-shrink-0 mt-1">
        <span className="material-symbols-outlined text-primary-fixed" style={{ fontSize: '16px' }}>
          smart_toy
        </span>
      </div>
      <div className="flex flex-col items-start max-w-[65%]">
        <div className="bg-surface-container border border-outline/10 text-on-surface px-4 py-3 rounded-2xl rounded-tl-sm font-body-md text-sm leading-relaxed">
          {content}
        </div>
        <span className="text-[10px] text-on-surface-variant mt-1.5 font-body-md">
          {formatTime(createdAt)} · <span className="text-outline">AI</span>
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
