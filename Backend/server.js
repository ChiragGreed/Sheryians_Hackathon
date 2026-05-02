import "dotenv/config";
import http from "http";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { Config } from './src/config/config.js';
import initSockets from "./src/sockets/index.js";

const PORT = Config.PORT || process.env.PORT || 5000;

const start = async () => {
  await connectDB();

  const httpServer = http.createServer(app);   
  initSockets(httpServer);                      

  httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Socket.IO ready on /customer namespace`);
  });
};

start();