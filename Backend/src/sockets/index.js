import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import setupCustomerNamespace from "./customerNamespace.js";

const initSockets = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // JWT middleware for /customer namespace
  io.of("/customer").use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      // No token = anonymous visitor, still allow connection
      socket.user = null;
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; // { organizationId, role, etc }
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  console.log("Socket.IO initialized");
  setupCustomerNamespace(io);

  return io;
};

export default initSockets;