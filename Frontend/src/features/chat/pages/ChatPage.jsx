import React from 'react';
import { useSelector } from 'react-redux';
import ChatSidebar from '../components/ChatSidebar';
import ThreadList from '../components/ThreadList';
import ChatWindow from '../components/ChatWindow';
import { useChat } from '../hooks/useChat';

const ChatPage = () => {
  // Get JWT token from Redux auth state (null = anonymous/guest visitor)
  const token = useSelector((state) => state.auth.token ?? null);

  // Wire the entire chat stack — hook handles socket + Redux
  const {
    messages,
    socketStatus,
    ticketStatus,
    isAITyping,
    error,
    sendMessage,
    sendTyping,
  } = useChat(token);

  return (
    <div className="w-full h-screen flex bg-background overflow-hidden">
      {/* Panel 1 — Left navigation sidebar */}
      <ChatSidebar />

      {/* Panel 3 — Active chat (fully wired) */}
      <ChatWindow
        messages={messages}
        socketStatus={socketStatus}
        ticketStatus={ticketStatus}
        isAITyping={isAITyping}
        onSendMessage={sendMessage}
        onTyping={sendTyping}
      />

      {/* Global socket error banner */}
      {error && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-error/10 border border-error/40 text-error text-xs font-body-md rounded-lg shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default ChatPage;