import React from 'react';

// Props (to be wired by hooks layer):
//   isAITyping: boolean — show/hide this indicator

const TypingIndicator = ({ isAITyping = true }) => {
  if (!isAITyping) return null;

  return (
    <div className="flex items-end gap-2 mb-2">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-primary-fixed/10 border border-primary-fixed/20 flex items-center justify-center flex-shrink-0">
        <span className="material-symbols-outlined text-primary-fixed" style={{ fontSize: '14px' }}>
          smart_toy
        </span>
      </div>

      {/* Bubble */}
      <div className="bg-surface-container border border-outline/10 rounded-xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-bounce"
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-bounce"
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-bounce"
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  );
};

export default TypingIndicator;
