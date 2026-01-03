const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let chatHistory = [];

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.emit("chat", chatHistory);

  socket.on("message", (message) => {
    chatHistory.push(message);
    io.emit("chat", chatHistory);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on port ${PORT}`);
});
