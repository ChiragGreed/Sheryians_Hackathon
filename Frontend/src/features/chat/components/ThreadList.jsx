import React, { useState } from 'react';

// Middle panel — Active threads list
// Props (to be wired by hooks layer):
//   threads: array of thread/ticket objects
//   activeThreadId: string
//   onSelectThread(threadId): function

// Mock threads for UI preview — replace with real data when hooks layer connects
const MOCK_THREADS = [
  {
    id: 'thread-1',
    name: 'Support Ticket #001',
    preview: 'I need help with my billing issue...',
    time: '2m ago',
    isActive: true,
    isOnline: true,
  },
  {
    id: 'thread-2',
    name: 'Security Query #002',
    preview: 'Unidentified login attempt detected...',
    time: '1h ago',
    isActive: false,
    isOnline: false,
  },
  {
    id: 'thread-3',
    name: 'API Integration #003',
    preview: 'Check the latest API documentation...',
    time: 'Yesterday',
    isActive: false,
    isOnline: false,
  },
];

const ThreadList = ({
  threads = MOCK_THREADS,
  activeThreadId = 'thread-1',
  onSelectThread = (id) => console.log('Select thread:', id),
}) => {
  const [searchValue, setSearchValue] = useState('');

  const filtered = threads.filter(
    (t) =>
      t.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      t.preview.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="w-64 flex-shrink-0 flex flex-col border-r border-outline/10 bg-background h-full">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="px-4 pt-5 pb-3 border-b border-outline/10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-label-bold text-xs text-on-surface uppercase tracking-widest">
            Active Threads
          </h2>
          <span className="px-2 py-0.5 bg-primary-fixed/10 border border-primary-fixed/20 rounded-full text-[10px] text-primary-fixed font-label-bold">
            {threads.length} Active
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" style={{ fontSize: '14px' }}>
            search
          </span>
          <input
            type="text"
            placeholder="Search threads..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline/15 text-on-surface text-xs font-body-md pl-8 pr-3 py-2 rounded-lg placeholder:text-on-surface-variant outline-none focus:border-primary-fixed/40 focus:ring-1 focus:ring-primary-fixed/20 transition-all"
          />
        </div>
      </div>

      {/* ── Thread items ────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto py-2">
        {filtered.length === 0 && (
          <p className="text-center text-on-surface-variant text-xs font-body-md py-8">
            No threads found.
          </p>
        )}

        {filtered.map((thread) => {
          const isSelected = thread.id === activeThreadId;
          return (
            <button
              key={thread.id}
              onClick={() => onSelectThread(thread.id)}
              className={`
                w-full flex items-start gap-3 px-4 py-3 text-left transition-all duration-150 border-l-2
                ${isSelected
                  ? 'bg-surface-container border-primary-fixed'
                  : 'border-transparent hover:bg-surface-container/50'}
              `}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0 mt-0.5">
                <div className="w-9 h-9 rounded-full bg-surface-container-high border border-outline/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '18px' }}>
                    confirmation_number
                  </span>
                </div>
                {thread.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-fixed border-2 border-background" />
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-headline-md text-xs text-on-surface truncate">{thread.name}</span>
                  <span className="text-[10px] text-on-surface-variant font-body-md flex-shrink-0 ml-1">{thread.time}</span>
                </div>
                <p className="text-[11px] text-on-surface-variant font-body-md truncate">{thread.preview}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThreadList;
