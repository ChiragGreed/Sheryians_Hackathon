import axios from "axios";

const api = axios.create({
    baseURL: "https://sheryians-hackathon.onrender.com/api/ai",
    withCredentials: true
})

export async function aiRespond(data){
    const res = await api.post("/respond", data)
    return res
}