import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

async function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    console.log("Cokies-------" + cookies);

    if (!cookies.token) {
      next(new Error("Authentication error!"));
    }
    try {
      const decode = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await userModel.findById(decode.id);
      socket.user = user;
      next();
    } catch (error) {
      next(new Error("Authentication error!"));
    }
  });

  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);
  });
}

export { initSocketServer };
