// test-socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:9010/customer", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);

  // Test 1: Join a room
  socket.emit("join:room", { visitorId: "test-visitor-123" });
});

socket.on("room:joined", (data) => {
  console.log("📦 Room joined:", data);

  // Test 2: Send a message
  socket.emit("customer:message", { content: "Hello I need help" });
});

socket.on("message:new", (msg) => {
  console.log("💬 New message:", msg.role, "→", msg.content);
});

socket.on("ai:typing", ({ typing }) => {
  console.log(typing ? "🤖 AI is typing..." : "🤖 AI done typing");
});

socket.on("ticket:escalated", (data) => {
  console.log("🚨 Escalated:", data);
});

socket.on("error:general", (err) => {
  console.log("❌ Error:", err.message);
});

socket.on("connect_error", (err) => {
  console.log("❌ Connection failed:", err.message);
});