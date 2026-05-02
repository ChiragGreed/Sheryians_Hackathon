import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:9010/api/auth",
    withCredentials: true
})

export function register(fullname, email, password, role){
    const res = api.post("/register", {
        fullname,
        email,
        password,
        role
    })

    return res
}

export function login(email, password){
    const res = api.post("/login", {
        email,
        password
    })

    return res
}