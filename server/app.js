const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Local frontend (dev),
    methods: ["GET", "POST"],
  },
});

let chatHistory = [];

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.emit("chat", chatHistory); // Send chat history to new user

  socket.on("chat", (newChats) => {
    chatHistory = newChats;
    io.emit("chat", chatHistory); // Broadcast to all users
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on port ${PORT}`);
});
