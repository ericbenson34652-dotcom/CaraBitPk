import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import OpenAI from "openai"; // <-- Import OpenAI client
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

app.use("/auth", authRoutes);
app.use("/verify", verifyRoutes);
app.use("/api/cars", carRoutes);

// ===== OPENAI CONFIGURATION =====
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ===== AI PRICE ESTIMATOR ROUTE =====
app.post("/api/estimate", async (req, res) => {
  try {
    const { make, model, year, mileage, condition } = req.body;

    if (!make || !model || !year || !mileage || !condition) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const prompt = `
    Estimate a fair market price for a used car based on these details:
    Make: ${make}
    Model: ${model}
    Year: ${year}
    Mileage: ${mileage} miles
    Condition: ${condition}

    Provide a single estimated price in USD without explanation.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Use a cheaper and faster model
      messages: [{ role: "user", content: prompt }],
      max_tokens: 50,
    });

    const estimatedPrice = completion.choices[0].message.content.trim();
    res.json({ estimatedPrice });
  } catch (error) {
    console.error("Error generating estimate:", error);
    res.status(500).json({ error: "Failed to estimate price" });
  }
});

// ===== SOCKET.IO BIDDING =====
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("placeBid", (data) => {
    console.log(`New bid placed: ${JSON.stringify(data)}`);
    io.emit("newBid", data);
  });
});

// ===== START SERVER =====
server.listen(5000, () => console.log("Backend running on port 5000"));
