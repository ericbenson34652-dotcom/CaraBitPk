import express from "express";
import { runOCR } from "../utils/openaiOCR.js";

const router = express.Router();

// CNIC verification using OCR
router.post("/cnic", async (req, res) => {
  try {
    const { imageUrl } = req.body; // image URL or base64
    const extractedText = await runOCR(imageUrl);

    if (extractedText.includes("CNIC")) {
      return res.json({ verified: true, message: "CNIC verified successfully" });
    } else {
      return res.status(400).json({ verified: false, message: "Invalid CNIC" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mock CPLC record check
router.post("/cplc", async (req, res) => {
  const { cnic } = req.body;
  const flaggedCNICs = ["42101-1234567-8", "42202-7654321-0"];
  const isFlagged = flaggedCNICs.includes(cnic);
  res.json({ cnic, clear: !isFlagged });
});

export default router;
