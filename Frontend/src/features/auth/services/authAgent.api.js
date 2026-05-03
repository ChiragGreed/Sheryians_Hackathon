const agentApi = axios.create({
    baseURL: "https://sheryians-hackathon.onrender.com/api/agent",
    withCredentials: true
})


export async function verifyAgentInvitationToken(token) {
    const res = await agentApi.get("/verify-invitation", {
        params: { token }
    })
    return res
}

export async function acceptAgentInvitation(token, username, password) {
    const res = await agentApi.post("/accept-invitation", {
        username,
        password
    }, {
        params: { token }
    })
    return res
}