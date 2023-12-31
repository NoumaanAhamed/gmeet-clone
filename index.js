const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.broadcast.emit("a user has connected");
  // console.log("user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log(`message from user ${socket.id}: ${msg}`);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
