import React, { useState, useRef } from 'react';

// Props (to be wired by hooks layer):
//   onSendMessage(content: string) — called when user submits
//   onTyping(isTyping: boolean)    — called on keypress / blur

const MessageInput = ({
  onSendMessage = (content) => console.log('Send:', content),
  onTyping = (isTyping) => console.log('Typing:', isTyping),
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const typingTimeoutRef = useRef(null);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);

    // Notify typing started
    onTyping(true);

    // Debounce: notify typing stopped after 1s of inactivity
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      onTyping(false);
    }, 1000);

    // Auto-resize textarea
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
    }
  };

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || disabled) return;

    onSendMessage(trimmed);
    setInputValue('');
    onTyping(false);
    clearTimeout(typingTimeoutRef.current);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    // Send on Enter (not Shift+Enter)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = inputValue.trim().length > 0 && !disabled;

  return (
    <div className="px-4 py-3 border-t border-outline/10 bg-background">
      <div className="flex items-end gap-2 bg-surface-container-lowest border border-outline/20 rounded-xl px-3 py-2 focus-within:border-primary-fixed/50 focus-within:ring-1 focus-within:ring-primary-fixed/20 transition-all duration-200">
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          id="chat-input"
          rows={1}
          className="flex-1 bg-transparent text-on-surface font-body-md text-sm placeholder:text-on-surface-variant outline-none resize-none leading-relaxed py-1 max-h-[140px] overflow-y-auto"
          placeholder={disabled ? 'Connected to agent. Chat is now live.' : 'Type a message...'}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />

        {/* Send Button */}
        <button
          id="chat-send-btn"
          onClick={handleSend}
          disabled={!canSend}
          className={`
            flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200
            ${canSend
              ? 'bg-primary-fixed text-on-primary hover:bg-white active:scale-95 shadow-sm shadow-primary-fixed/20'
              : 'bg-surface-container text-on-surface-variant cursor-not-allowed opacity-50'}
          `}
          aria-label="Send message"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            send
          </span>
        </button>
      </div>

      {/* Hint text */}
      <p className="text-[10px] text-on-surface-variant mt-1.5 text-center font-body-md">
        Press <kbd className="px-1 py-0.5 bg-surface-container rounded text-[9px]">Enter</kbd> to send · <kbd className="px-1 py-0.5 bg-surface-container rounded text-[9px]">Shift+Enter</kbd> for new line
      </p>
    </div>
  );
};

export default MessageInput;
