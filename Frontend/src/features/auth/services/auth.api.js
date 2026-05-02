import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:9010/api/auth",
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

export function loginApi({ email, password }) {
    const res = api.post("/login", {
        email,
        password
    })

    console.log(res);
    return res
}

export function getMeApi({ email, password }) {
    const res = api.get("/getMe")
    return res
}