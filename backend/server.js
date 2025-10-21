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

// Routes - THIS MUST BE CORRECT FOR YOUR STRUCTURE
// The path './routes/cars.js' assumes that 'routes' is a sibling folder to 'server.js'
import authRoutes from "./routes/auth.js";
import verifyRoutes from "./routes/verify.js";
import carRoutes from "./routes/cars.js";


app.use("/auth", authRoutes);
app.use("/verify", verifyRoutes);
app.use("/api/cars", carRoutes);

// Socket.io bidding events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("placeBid", (data) => {
    console.log(`New bid placed: ${JSON.stringify(data)}`);
    io.emit("newBid", data);
  });
});

server.listen(5000, () => console.log("Backend running on port 5000"));
