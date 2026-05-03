import axios from 'axios';

const api = axios.create({
    baseURL: "https://sheryians-hackathon.onrender.com/api/tickets",
    withCredentials: true
});

export async function getAdminTickets() {
    const res = await api.get("/admin");
    return res.data;
}

export async function getMyTickets() {
    const res = await api.get("/me");
    return res.data;
}

export async function resolveTicket(id, response) {
    const res = await api.put(`/${id}/resolve`, { response });
    return res.data;
}

export async function takeTicket(id) {
    const res = await api.put(`/${id}/take`);
    return res.data;
}
