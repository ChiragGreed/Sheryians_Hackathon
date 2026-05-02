import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:9010/api/auth",
    withCredentials: true
})

export function registerApi({ username, email, password, organizationName }) {
    const res = api.post("/register", {
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

    return res
}