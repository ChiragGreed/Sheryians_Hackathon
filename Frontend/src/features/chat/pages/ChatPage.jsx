import React from 'react';
import { useSelector } from 'react-redux';
import ChatSidebar from '../../../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import { useChat } from '../hooks/useChat';
import { useAi } from '../hooks/useAi';
import { addMessage } from '../store/chatSlice';
import { useDispatch } from 'react-redux';

const ChatPage = () => {
  const dispatch = useDispatch();
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
    ticketId, // Added ticketId from useChat
  } = useChat(token);

  // Wire the new AI RAG hook
  const { getAiResponse, loading: isAiLoading, error: aiError } = useAi();

  const handleAskAI = async (query) => {
    if (!query) return;
    
    // 1. Manually add user message to the UI
    const userMsg = {
      _id: `user_${Date.now()}`,
      content: query,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    dispatch(addMessage(userMsg));

    try {
      // 2. Call the AI RAG pipeline
      const response = await getAiResponse({ 
        query, 
        visitorId: localStorage.getItem('solvex_visitor_id'),
      });

      // 3. Add AI answer to the UI
      if (response && response.answer) {
        dispatch(addMessage({
          _id: `ai_${Date.now()}`,
          content: response.answer,
          role: 'assistant',
          createdAt: new Date().toISOString()
        }));
      }
    } catch (err) {
      console.error("AI Assist Error:", err);
    }
  };

 
  return (
    <div className="w-full h-screen flex bg-background overflow-hidden">
      {/* Panel 1 — Left navigation sidebar */}
      <ChatSidebar />

      {/* Panel 3 — Active chat (fully wired) */}
      <ChatWindow
        messages={messages}
        socketStatus={socketStatus}
        ticketStatus={ticketStatus}
        isAITyping={isAITyping || isAiLoading} // Show typing if either socket or HTTP AI is active
        onSendMessage={sendMessage}
        onTyping={sendTyping}
        onAskAI={handleAskAI} // New action
      />

      {/* Global socket/AI error banner */}
      {(error || aiError) && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-error/10 border border-error/40 text-error text-xs font-body-md rounded-lg shadow-lg">
          {error || aiError}
        </div>
      )}
    </div>
  );
};

export default ChatPage;