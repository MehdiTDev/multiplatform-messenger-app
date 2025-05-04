const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running!"));

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes); // ✅ uncommented and corrected

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIo(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    if (
      !newMessageReceived ||
      !newMessageReceived.chat ||
      !newMessageReceived.chat.users
    ) {
      console.warn("Invalid message received", newMessageReceived);
      return;
    }

    const chat = newMessageReceived.chat;

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.yellow.bold)
);
