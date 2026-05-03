import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:9010/api/admin",
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
