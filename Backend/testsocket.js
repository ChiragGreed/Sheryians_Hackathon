// testsocket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000/customer", // ← change 5000 to 3000
  {
  transports: ["polling", "websocket"],
  reconnection: false,
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);
  socket.emit("join:room", { visitorId: "test-visitor-123" });
});

socket.on("room:joined", (data) => {
  console.log("Room joined:", data);
  socket.emit("customer:message", { content: "Hello I need help" });
});

socket.on("message:new", (msg) => {
  console.log("Message:", msg.role, "→", msg.content);
});

socket.on("ai:typing", ({ typing }) => {
  console.log(typing ? "AI typing..." : "AI done");
});

socket.on("ticket:escalated", (data) => {
  console.log("Escalated:", data.content);
});

socket.on("connect_error", (err) => {
  console.log("Error:", err.message);
  console.log("Description:", err.description);
});