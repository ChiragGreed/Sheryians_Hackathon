import React from 'react';
import ChatWindow from '../components/ChatWindow';

const ChatPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background p-4 md:p-8">
      {/* Ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary-fixed/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary-fixed/5 blur-[140px] rounded-full" />
      </div>

      {/* Chat card */}
      <div className="relative z-10 w-full max-w-lg h-[680px] flex flex-col bg-background border border-outline/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 primary-glow">
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;