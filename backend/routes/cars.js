import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Add a car (only verified sellers)
router.post("/add", async (req, res) => {
  try {
    const { userId, title, price, image } = req.body;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user?.verified) {
      return res.status(403).json({ error: "User not verified for selling" });
    }

    const car = await prisma.car.create({
      data: { title, price, image, userId },
    });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all cars
router.get("/list", async (req, res) => {
  const cars = await prisma.car.findMany({ include: { user: true } });
  res.json(cars);
});

export default router;
