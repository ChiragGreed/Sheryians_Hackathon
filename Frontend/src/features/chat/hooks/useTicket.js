import { useState, useEffect } from "react";
import {
  getAdminTicketsAPI,
  getMyTicketsAPI,
  assignTicketAPI,
  takeTicketAPI,
  resolveTicketAPI,
  reassignTicketAPI
} from "../api/ticket.api";

export const useTickets = (role) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔥 FETCH
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res =
        role === "admin"
          ? await getAdminTicketsAPI()
          : await getMyTicketsAPI();

      setTickets(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTickets();
  }, [role]);

  // 🔥 ASSIGN
  const assignTicket = async (ticketId, agentId) => {
    await assignTicketAPI(ticketId, agentId);
    fetchTickets();
  };

  // 🔥 TAKE
  const takeTicket = async (ticketId) => {
    await takeTicketAPI(ticketId);
    fetchTickets();
  };

  // 🔥 RESOLVE
  const resolveTicket = async (ticketId, response) => {
    await resolveTicketAPI(ticketId, response);
    fetchTickets();
  };

  // 🔥 REASSIGN
  const reassignTicket = async (ticketId, newAgentId) => {
    await reassignTicketAPI(ticketId, newAgentId);
    fetchTickets();
  };

  return {
    tickets,
    loading,
    error,
    assignTicket,
    takeTicket,
    resolveTicket,
    reassignTicket,
    refetch: fetchTickets
  };
};