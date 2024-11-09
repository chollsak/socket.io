const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Add CORS support

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // Change this to the client URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

const PORT = 3005;

io.on('connection', (socket) => {
  console.log("User connected");

  socket.on('disconnect', () => {
    console.log("User disconnected");
  });

  socket.on('new_user_login', (data) => {
    console.log('ran 2nd')
    io.emit('new_user_login', { message: data.message });
  });
});

server.listen(PORT, () => {
  console.log('Socket.io running on port 3005');
});
