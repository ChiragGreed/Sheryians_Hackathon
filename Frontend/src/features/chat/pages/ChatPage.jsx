import React from 'react';
import ChatSidebar from '../components/ChatSidebar';
import ThreadList from '../components/ThreadList';
import ChatWindow from '../components/ChatWindow';

const ChatPage = () => {
  return (
    <div className="w-full h-screen flex bg-background overflow-hidden">
      {/* Panel 1 — Left navigation sidebar */}
      <ChatSidebar />

      {/* Panel 2 — Thread list */}
      <ThreadList />

      {/* Panel 3 — Active chat */}
      <ChatWindow />
    </div>
  );
};

export default ChatPage;