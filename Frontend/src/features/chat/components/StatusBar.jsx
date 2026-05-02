import React from 'react';

// Props (to be wired by hooks layer):
//   socketStatus: 'idle' | 'connecting' | 'connected' | 'disconnected'
//   ticketStatus: 'open' | 'resolved' | 'escalated' | 'closed' | null

const STATUS_CONFIG = {
  // Socket statuses
  idle:         { label: 'Initializing...',    dotClass: 'bg-on-surface-variant', pulse: false },
  connecting:   { label: 'Connecting...',      dotClass: 'bg-yellow-400',         pulse: true  },
  connected:    { label: 'Online',             dotClass: 'bg-primary-fixed',      pulse: false },
  disconnected: { label: 'Connection lost',    dotClass: 'bg-error',              pulse: false },
  // Ticket statuses (override when relevant)
  escalated:    { label: 'Agent joined',       dotClass: 'bg-primary-fixed',      pulse: true  },
  resolved:     { label: 'Resolved',           dotClass: 'bg-primary-fixed',      pulse: false },
  closed:       { label: 'Chat closed',        dotClass: 'bg-on-surface-variant', pulse: false },
};

const StatusBar = ({ socketStatus = 'connecting', ticketStatus = null }) => {
  // Ticket status takes priority over socket status for display
  const activeKey = (ticketStatus === 'escalated' || ticketStatus === 'resolved' || ticketStatus === 'closed')
    ? ticketStatus
    : socketStatus;

  const config = STATUS_CONFIG[activeKey] || STATUS_CONFIG.idle;

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b border-outline/10 bg-surface-container-lowest">
      {/* Dot indicator */}
      <span className="relative flex h-2 w-2">
        {config.pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.dotClass} opacity-60`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dotClass}`} />
      </span>
      <span className="text-xs font-body-md text-on-surface-variant">
        {config.label}
      </span>

      {/* Escalated badge */}
      {ticketStatus === 'escalated' && (
        <span className="ml-auto flex items-center gap-1 text-[10px] text-primary-fixed border border-primary-fixed/30 bg-primary-fixed/5 rounded-full px-2 py-0.5 font-label-bold uppercase tracking-wider">
          <span className="material-symbols-outlined" style={{ fontSize: '11px' }}>support_agent</span>
          Live agent
        </span>
      )}
    </div>
  );
};

export default StatusBar;
