import "dotenv/config";
import app from "./src/app.js";
import { initSocketServer } from "./src/sockets/socket.server.js";
import { createServer } from "http";

const httpServer = createServer(app);

import connectDB from "./src/config/db/db.js";
const PORT=process.env.PORT;
connectDB();
initSocketServer(httpServer);

httpServer.listen(PORT,()=>{
    console.log("Server running on :"+PORT);
});