const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);
connectDB();
const app = express();


app.use(cors());


app.use(express.json()); // to accept JSON data

app.get("/", (req, res) => res.send("API is running!"));

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`.yellow.bold)
);
