import React from 'react';
import { Link, useLocation } from 'react-router';

// Left navigation sidebar — matches image 2 style
// Props (to be wired later): user, onLogout

const NAV_ITEMS = [
  { icon: 'grid_view',      label: 'Dashboard',    path: '/'           },
  { icon: 'chat',           label: 'Messages',     path: '/chat'       },
  { icon: 'confirmation_number', label: 'Tickets', path: '/tickets'    },
  { icon: 'smart_toy',      label: 'AI Assistant', path: '/assistant'  },
];

const ChatSidebar = ({ onLogout = () => {} }) => {
  const location = useLocation();

  return (
    <aside className="w-52 flex-shrink-0 flex flex-col bg-surface-container-lowest border-r border-outline/10 h-full">

      {/* ── Brand badge ─────────────────────────────────────────── */}
      <div className="px-4 py-5 border-b border-outline/10">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse flex-shrink-0" />
          <span className="font-headline-md text-sm text-on-surface">Core Terminal</span>
        </div>
        <p className="text-[10px] text-on-surface-variant font-label-bold uppercase tracking-widest pl-4">
          v2.0.4 · Online
        </p>
      </div>

      {/* ── Navigation ──────────────────────────────────────────── */}
      <nav className="flex-1 py-4 px-2 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group
                ${isActive
                  ? 'bg-primary-fixed/10 text-primary-fixed border border-primary-fixed/20'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}
              `}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '18px', fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="font-body-md text-sm">{item.label}</span>
              {isActive && (
                <span className="ml-auto w-1 h-1 rounded-full bg-primary-fixed" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── New Request CTA ─────────────────────────────────────── */}
      <div className="px-3 pb-3">
        <button
          id="new-request-btn"
          className="w-full flex items-center justify-center gap-2 bg-primary-fixed text-on-primary py-2.5 rounded-lg font-label-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all duration-150 shadow-md shadow-primary-fixed/20"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
          New Request
        </button>
      </div>

      {/* ── Bottom actions ──────────────────────────────────────── */}
      <div className="border-t border-outline/10 px-2 py-3 space-y-0.5">
        <Link
          to="/support"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all text-sm font-body-md"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>help_outline</span>
          Support
        </Link>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-error hover:bg-error/5 transition-all text-sm font-body-md"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default ChatSidebar;
