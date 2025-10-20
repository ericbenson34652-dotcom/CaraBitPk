import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runOCR(imageUrl) {
  try {
    const result = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: "Extract CNIC number and details from this image." },
            { type: "input_image", image_url: imageUrl },
          ],
        },
      ],
    });

    return result.output_text || "No text detected";
  } catch (err) {
    console.error("OCR Error:", err.message);
    return "OCR failed";
  }
}
