import axios from 'axios';

const api = axios.create({
    baseURL: "https://sheryians-hackathon.onrender.com/api/auth",
    withCredentials: true
})

export async function register(username, email, password, organizationName) {
    const res = await api.post("/register", {
        username,
        email,
        password,
        organizationName
    })

    return res
}

export async function loginApi({ email, password }) {
    const res = await api.post("/login", {
        email,
        password
    })

    return res
}

export async function getMeApi() {
    const res = await api.get("/getMe")
    return res
}

export async function verifyAgentInvitationToken(token) {
    const agentApi = axios.create({
        baseURL: "https://sheryians-hackathon.onrender.com/api/agent",
        withCredentials: true
    })
    const res = await agentApi.get("/verify-invitation", {
        params: { token }
    })
    return res
}

export async function acceptAgentInvitation(token, username, password) {
    const agentApi = axios.create({
        baseURL: "https://sheryians-hackathon.onrender.com/api/agent",
        withCredentials: true
    })
    const res = await agentApi.post("/accept-invitation", {
        username,
        password
    }, {
        params: { token }
    })
    return res
}