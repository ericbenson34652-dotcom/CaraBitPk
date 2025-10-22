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

// ===== ROUTES =====
import authRoutes from "./routes/auth.js";
import verifyRoutes from "./routes/verify.js";
import carRoutes from "./routes/cars.js";
import aiPriceRoute from "./aiPrice.js"; // <-- Import AI price route

// Use routes
app.use("/auth", authRoutes);
app.use("/verify", verifyRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/ai-price", aiPriceRoute); // <-- Register AI price route

// ===== SOCKET.IO BIDDING =====
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("placeBid", (data) => {
    console.log(`New bid placed: ${JSON.stringify(data)}`);
    io.emit("newBid", data);
  });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
