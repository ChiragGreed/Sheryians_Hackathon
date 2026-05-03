import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:9010/api",
    withCredentials: true
});

export async function uploadContextFile(file, organizationId) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("organizationId", organizationId);

    const res = await api.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
}

export async function uploadContextText(text, organizationId) {
    const res = await api.post("/upload-text", {
        text,
        organizationId
    });
    return res.data;
}
