// backend/aiPrice.js
import express from "express";
const router = express.Router();

// Mock AI price estimation logic
router.post("/", async (req, res) => {
  try {
    const { make, model, year, mileage, condition } = req.body;

    // Simple mock formula for demo
    const basePrice = 30000;
    const depreciation = (new Date().getFullYear() - year) * 1200;
    const mileagePenalty = mileage * 0.05;
    const conditionFactor =
      condition === "excellent" ? 1.1 : condition === "good" ? 1.0 : 0.9;

    const estimatedPrice = Math.max(
      basePrice - depreciation - mileagePenalty,
      1000
    ) * conditionFactor;

    res.json({ success: true, estimatedPrice: estimatedPrice.toFixed(2) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
