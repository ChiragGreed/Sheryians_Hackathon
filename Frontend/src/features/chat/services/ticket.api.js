import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9010/api",
  withCredentials: true 
});

// 🔥 ADMIN
export async function getAdminTicketsAPI() {
    const response = await API.get("/tickets/admin");
    return response;
}

// 🔥 AGENT
export async function getMyTicketsAPI() {
    const response = await API.get("/tickets/me");
    return response;
}

// 🔥 ACTIONS
export async function assignTicketAPI(ticketId, agentId){
    const response = await API.post(`/tickets/${ticketId}/assign`, { agentId });
    return response
}

export async function takeTicketAPI(ticketId){
    const response = await API.put(`/tickets/${ticketId}/take`);
    return response
}

export async function resolveTicketAPI(ticketId, response){
    const data =await API.put(`/tickets/${ticketId}/resolve`, { response });
    return data
}

export async function reassignTicketAPI(ticketId, newAgentId){
    const response = await API.put(`/tickets/${ticketId}/reassign`, { newAgentId });
    return response
}


