import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { aiService } from "../services/ai.service.js";
import messageModel from "../models/messageModel.js";

async function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  io.use(async (socket, next) => {
    const cookies = socket.handshake.headers.cookie
      ? cookie.parse(socket.handshake.headers.cookie)
      : {};
    socket.cookies = cookies;
    console.log("Cokies-------", cookies);

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
    socket.on("ai-message", async (message) => {
      console.log("Message from client:", message);
      const userMessage = await messageModel.create({
        user: socket.user._id,
        chat: message.chatId,
        content: message.content,
        role: "user",
      });
      const chatHistory = await messageModel.find({
        chat: message.chatId,
      });
      console.log("Full chat history:", chatHistory.map((item) => {
          return {
            role: item.role,
            parts: [{ text: item.content }],
          };
        }));
      
    

      const response = await aiService.generateResponse(chatHistory.map(item=> {
         return {
            role: item.role,
            parts: [{ text: item.content }],
          };
        }));
      const aiMessage = await messageModel.create({
        user: socket.user._id,
        chat: message.chatId,
        content: response,
        role: "model",
      });
      socket.emit("ai-response", {
        content: response,
        chatId: message.chatId,
      });
    });
  });
}

export { initSocketServer };
