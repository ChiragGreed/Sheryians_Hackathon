import axios from 'axios';

const api = axios.create({
    baseURL: "https://sheryians-hackathon.onrender.com//api/admin",
    withCredentials: true
});

export async function getDashboardStats() {
    const res = await api.get("/dashboard/stats");
    return res.data;
}

export async function getRecentConversations() {
    const res = await api.get("/dashboard/conversations");
    return res.data;
}
