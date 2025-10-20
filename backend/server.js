import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Routes
import authRoutes from "./backend/routes/auth.js";
import verifyRoutes from "./backend/routes/verify.js";
import carRoutes from "./backend/routes/cars.js";

app.use("/auth", authRoutes);
app.use("/verify", verifyRoutes);
app.use("/cars", carRoutes);

// Socket.io bidding events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("placeBid", (data) => {
    io.emit("newBid", data);
  });
});

server.listen(5000, () => console.log("Backend running on port 5000"));
