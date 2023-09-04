const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res) => {
  const userName = prompt("Please enter your name:");
  if (userName !== null && userName !== "") {
    // User entered a name; proceed with WebSocket connection
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } else {
    // User didn't enter a name; you can handle this case or display an error message
    res.send("Please enter a valid name to proceed.");
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat-message", (msg, name) => {
    console.log("message: " + msg, name.name);
    io.emit("chat message", name.name + ":" + " " + msg);
  });
});

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
