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

export async function getMeApi({ email, password }) {
    const res = await api.get("/getMe")
    return res
}