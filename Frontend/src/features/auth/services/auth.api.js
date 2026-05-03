import axios from 'axios'

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

export async function login(email, password){
    const res = await api.post("/login", {
        email,
        password
    })

    return res
}