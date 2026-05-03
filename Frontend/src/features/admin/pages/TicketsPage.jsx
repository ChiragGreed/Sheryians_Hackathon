import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import AdminHeader from '../components/AdminHeader';
import { getAdminTickets, takeTicket, resolveTicket } from '../services/ticket.api';

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [response, setResponse] = useState('');

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await getAdminTickets();
      if (res.success) {
        setTickets(res.tickets);
      }
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleTakeTicket = async (id) => {
    try {
      await takeTicket(id);
      fetchTickets();
    } catch (error) {
      console.error("Failed to take ticket", error);
    }
  };

  const handleResolveTicket = async (id) => {
    if (!response.trim()) return;
    try {
      await resolveTicket(id, response);
      setSelectedTicket(null);
      setResponse('');
      fetchTickets();
    } catch (error) {
      console.error("Failed to resolve ticket", error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'escalated': return 'bg-error/10 text-error border-error/20';
      case 'open': return 'bg-primary-fixed/10 text-primary-fixed border-primary-fixed/20';
      case 'in_progress': return 'bg-warning/10 text-warning border-warning/20';
      case 'resolved': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-surface-container text-on-surface-variant';
    }
  };

  return (
    <div className="w-full h-screen flex bg-background text-on-surface overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <AdminHeader />
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-headline-md text-2xl">Support Tickets</h1>
              <p className="text-on-surface-variant">Manage and resolve escalated customer queries</p>
            </div>
            <button 
                onClick={fetchTickets}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-sm font-label-bold"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <span className="w-8 h-8 rounded-full border-2 border-primary-fixed border-t-transparent animate-spin"></span>
            </div>
          ) : tickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-on-surface-variant">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-20">confirmation_number</span>
              <p>No tickets found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {tickets.map((ticket) => (
                <div 
                  key={ticket._id} 
                  className={`p-6 rounded-2xl border transition-all ${selectedTicket?._id === ticket._id ? 'border-primary-fixed bg-primary-fixed/5 ring-1 ring-primary-fixed' : 'border-outline/10 bg-surface-container-lowest hover:border-outline/30'}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                        <span className="material-symbols-outlined">person</span>
                      </div>
                      <div>
                        <p className="font-label-bold text-xs uppercase tracking-wider text-on-surface-variant">Visitor ID</p>
                        <p className="font-body-md truncate max-w-[200px]">{ticket.visitorId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-label-bold uppercase tracking-widest border ${getStatusStyle(ticket.status)}`}>
                        {ticket.status.replace('_', ' ')}
                        </span>
                        <p className="text-[10px] text-on-surface-variant font-label-medium">
                            {new Date(ticket.createdAt).toLocaleString()}
                        </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="font-label-bold text-xs uppercase tracking-wider text-on-surface-variant mb-2">Last Message / Query</p>
                    <div className="p-4 rounded-xl bg-surface-container/50 border border-outline/5">
                        <p className="text-sm italic text-on-surface">"{ticket.query || 'No query text available'}"</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    {ticket.status === 'escalated' && (
                      <button 
                        onClick={() => handleTakeTicket(ticket._id)}
                        className="px-4 py-2 rounded-lg bg-primary-fixed text-on-primary text-sm font-label-bold hover:brightness-110 transition-all"
                      >
                        Take Ticket
                      </button>
                    )}
                    {ticket.status === 'in_progress' && !selectedTicket && (
                        <button 
                            onClick={() => setSelectedTicket(ticket)}
                            className="px-4 py-2 rounded-lg bg-primary-fixed text-on-primary text-sm font-label-bold hover:brightness-110 transition-all"
                        >
                            Reply & Resolve
                        </button>
                    )}
                  </div>

                  {selectedTicket?._id === ticket._id && (
                    <div className="mt-6 pt-6 border-t border-outline/10 space-y-4 animate-in fade-in slide-in-from-top-2">
                        <div>
                            <label className="block font-label-bold text-xs uppercase tracking-wider text-on-surface-variant mb-2">Internal Response</label>
                            <textarea 
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                className="w-full h-32 p-4 rounded-xl bg-surface-container border border-outline/20 focus:outline-none focus:border-primary-fixed transition-colors text-sm"
                                placeholder="Type your response here. This will be added to the knowledge base..."
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setSelectedTicket(null)}
                                className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors text-sm font-label-bold"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => handleResolveTicket(ticket._id)}
                                className="px-4 py-2 rounded-lg bg-primary-fixed text-on-primary text-sm font-label-bold hover:brightness-110 transition-all shadow-md shadow-primary-fixed/20"
                            >
                                Resolve & Save to KB
                            </button>
                        </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TicketsPage;
