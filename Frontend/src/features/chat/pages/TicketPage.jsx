import React, { useState, useEffect } from 'react';
import { getAdminTicketsAPI, resolveTicketAPI, takeTicketAPI } from '../services/ticket.api';

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTickets = async () => {
    try {
      const res = await getAdminTicketsAPI();
      // FIX: backend now returns { success, tickets } — was setTickets(res.data) which set the whole object
      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(fetchTickets, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleTakeTicket = async (id) => {
    try {
      await takeTicketAPI(id);
      fetchTickets();
    } catch (err) {
      alert('Failed to claim ticket');
    }
  };

  const handleResolveTicket = async (e) => {
    e.preventDefault();
    if (!response.trim()) return;

    setIsSubmitting(true);
    try {
      await resolveTicketAPI(selectedTicket._id, response);
      setResponse('');
      setSelectedTicket(null);
      fetchTickets();
    } catch (err) {
      alert('Failed to resolve ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'escalated': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'in_progress': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'resolved': return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-on-surface-variant font-label-bold uppercase tracking-widest">
        Loading Tickets...
      </div>
    );
  }

  return (
    <div className="p-8 h-full flex flex-col gap-6 overflow-hidden">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="font-headline-md text-2xl">Support Tickets</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage AI-escalated queries and customer support</p>
        </div>
        <button
          onClick={fetchTickets}
          className="flex items-center gap-2 px-4 py-2 bg-surface-container border border-outline/10 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-surface-container-high transition-all"
        >
          <span className={`material-symbols-outlined text-[18px] ${loading ? 'animate-spin' : ''}`}>refresh</span>
          Refresh Queue
        </button>
      </header>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Ticket List */}
        <div className="w-1/2 bg-surface-container-lowest border border-outline/10 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-outline/10 bg-surface-container-lowest/50">
            <h2 className="text-sm font-label-bold uppercase tracking-wider text-on-surface-variant">
              Active Queue ({tickets.length})
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-outline/5">
            {tickets.length === 0 ? (
              <div className="p-12 text-center text-on-surface-variant italic">
                No tickets in the queue. Everything looks good!
              </div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-5 cursor-pointer transition-all hover:bg-surface-container-low ${selectedTicket?._id === ticket._id ? 'bg-primary-fixed/5 border-l-4 border-primary-fixed' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-mono">
                      ID: {ticket._id.slice(-6)}
                    </span>
                  </div>
                  {/* FIX: show fallback if query is empty */}
                  <h3 className="text-sm font-body-md text-on-surface line-clamp-2 mb-2">
                    {ticket.query || <span className="italic text-on-surface-variant">No query provided</span>}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px]">person</span>
                    {ticket.visitorId}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="flex-1 bg-surface-container-lowest border border-outline/10 rounded-2xl flex flex-col overflow-hidden">
          {selectedTicket ? (
            <div className="flex flex-col h-full">
              <header className="p-6 border-b border-outline/10 flex justify-between items-center">
                <div>
                  <h2 className="font-headline-md text-lg">Ticket Details</h2>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest font-label-bold mt-1">
                    STATUS: <span className={getStatusColor(selectedTicket.status).split(' ')[1]}>{selectedTicket.status}</span>
                  </p>
                </div>
                {selectedTicket.status !== 'in_progress' && selectedTicket.status !== 'resolved' && (
                  <button
                    onClick={() => handleTakeTicket(selectedTicket._id)}
                    className="bg-primary-fixed text-on-primary px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all"
                  >
                    Claim Ticket
                  </button>
                )}
              </header>

              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <section>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-2">Customer Query</label>
                  <div className="p-4 bg-surface-container rounded-xl text-sm leading-relaxed text-on-surface">
                    {selectedTicket.query || <span className="italic text-on-surface-variant">No query provided</span>}
                  </div>
                </section>

                {selectedTicket.status === 'resolved' ? (
                  <section>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-2">Final Resolution</label>
                    <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl text-sm leading-relaxed text-on-surface">
                      {selectedTicket.response}
                    </div>
                  </section>
                ) : (
                  <section className="flex-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-2">Post Response</label>
                    <div className="flex flex-col gap-4">
                      <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Type your resolution here. This will also be used to train the AI..."
                        className="w-full h-48 p-4 bg-surface-container border border-outline/10 rounded-xl text-sm text-on-surface focus:outline-none focus:border-primary-fixed/50 transition-all resize-none"
                      />
                      <button
                        onClick={handleResolveTicket}
                        disabled={isSubmitting || !response.trim()}
                        className="bg-primary-fixed text-on-primary py-3 rounded-xl text-sm font-bold uppercase tracking-wider hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        {isSubmitting ? 'Processing...' : 'Resolve & Update AI Knowledge'}
                      </button>
                    </div>
                  </section>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-on-surface-variant gap-4">
              <span className="material-symbols-outlined text-[48px] opacity-20">confirmation_number</span>
              <p className="text-sm font-body-md italic">Select a ticket from the queue to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketPage;