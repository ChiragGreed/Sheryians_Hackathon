import React from 'react';

const getStatusBadge = (status) => {
  switch(status) {
    case 'Escalated':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-label-bold bg-error/10 text-error">
          <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Escalated
        </span>
      );
    case 'Open':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-label-bold bg-primary-fixed/10 text-primary-fixed">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></span> Open
        </span>
      );
    case 'Resolved':
    case 'Closed':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-label-bold bg-green-500/10 text-green-500">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Resolved
        </span>
      );
    default:
      return status;
  }
};

const RecentConversations = ({ conversations = [] }) => {
  return (
    <section className="bg-surface-container-lowest rounded-2xl border border-outline/10 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-outline/10 flex items-center justify-between">
        <h2 className="font-headline-md text-lg">Recent Conversations</h2>
        <button className="text-sm font-label-bold text-primary-fixed hover:brightness-110">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-container text-on-surface-variant font-label-bold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Channel</th>
              <th className="px-6 py-4">Handled By</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline/10">
            {conversations.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-on-surface-variant">
                  No recent conversations found.
                </td>
              </tr>
            ) : (
              conversations.map((conv) => (
                <tr key={conv.id} className="hover:bg-surface-container/50 transition-colors">
                  <td className="px-6 py-4 font-body-md truncate max-w-[150px]">{conv.user}</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(conv.status)}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{conv.channel}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined text-[18px] ${conv.handledBy === 'AI Assistant' ? 'text-primary-fixed' : 'text-on-surface-variant'}`}>
                        {conv.handledBy === 'AI Assistant' ? 'smart_toy' : 'person'}
                      </span>
                      {conv.handledBy}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">
                    {new Date(conv.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant hover:text-primary-fixed transition-colors">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentConversations;
