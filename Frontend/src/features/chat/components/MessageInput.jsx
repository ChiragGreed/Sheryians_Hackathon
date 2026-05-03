import React, { useState, useRef } from 'react';

// Props (to be wired by hooks layer):
//   onSendMessage(content: string)
//   onTyping(isTyping: boolean)
//   disabled: boolean

const MessageInput = ({
  onSendMessage = (content) => console.log('Send:', content),
  onTyping = () => {},
  onAskAI = () => {},
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const typingTimeoutRef = useRef(null);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onTyping(true);
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => onTyping(false), 1000);

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
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = inputValue.trim().length > 0 && !disabled;

  return (
    <div className="border-t border-outline/10 bg-surface-container-lowest px-4 py-3">
      <div className="flex items-end gap-2">
        {/* Attach button */}
        <button
          className="w-9 h-9 flex-shrink-0 flex items-center justify-center text-on-surface-variant hover:text-primary-fixed transition-colors rounded-lg hover:bg-surface-container"
          aria-label="Attach file"
          type="button"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>attach_file</span>
        </button>

        {/* Input area */}
        <div className="flex-1 flex items-end bg-surface-container border border-outline/15 rounded-xl px-3 py-2 focus-within:border-primary-fixed/40 focus-within:ring-1 focus-within:ring-primary-fixed/20 transition-all">
          <textarea
            ref={textareaRef}
            id="chat-input"
            rows={1}
            className="flex-1 bg-transparent text-on-surface font-body-md text-sm placeholder:text-on-surface-variant outline-none resize-none leading-relaxed py-0.5 max-h-[140px] overflow-y-auto"
            placeholder={disabled ? 'Chat session ended.' : 'Compose message...'}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
          {/* Emoji button */}
          <button
            className="flex-shrink-0 ml-2 text-on-surface-variant hover:text-primary-fixed transition-colors"
            type="button"
            aria-label="Emoji"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>sentiment_satisfied</span>
          </button>
        </div>

        {/* AI Assistant button */}
        <button
          onClick={() => {
            const trimmed = inputValue.trim();
            if (trimmed) {
              onAskAI(trimmed);
              setInputValue('');
            }
          }}
          disabled={!canSend}
          type="button"
          aria-label="Ask AI Assistant"
          className={`
            flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 mr-1
            ${canSend
              ? 'bg-secondary-fixed text-on-secondary hover:brightness-110 active:scale-95 shadow-lg shadow-secondary-fixed/20'
              : 'bg-surface-container text-on-surface-variant cursor-not-allowed opacity-40'}
          `}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>send</span>
        </button>
      </div>

      {/* Bottom status strip */}
      <div className="flex items-center justify-center gap-4 mt-2.5 pt-2 border-t border-outline/5">
        <span className="flex items-center gap-1.5 text-[9px] text-on-surface-variant font-label-bold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-pulse inline-block" />
          Neural uplink active
        </span>
        <span className="text-outline/30 text-[10px]">·</span>
        <span className="flex items-center gap-1.5 text-[9px] text-on-surface-variant font-label-bold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed/50 inline-block" />
          AES-256 enabled
        </span>
      </div>
    </div>
  );
};

export default MessageInput;
