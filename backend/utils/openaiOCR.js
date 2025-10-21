import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Executes OCR on an image URL using the OpenAI Vision API.
 * @param {string} imageUrl - The URL (public) or base64 data (prefixed with 'data:image/...') of the image.
 * @returns {Promise<string>} The extracted text from the image.
 */
export async function runOCR(imageUrl) {
  try {
    // FIX: Changed the model to a valid vision model (gpt-4-turbo) and corrected the API method 
    // and payload structure for image input.
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", 
      messages: [
        {
          role: "user",
          content: [
            // Text prompt to guide the extraction
            { type: "text", text: "Extract the complete CNIC number and all personal details from this image. Return only the extracted text, nothing else." },
            // Image payload using the required 'image_url' type
            { 
                type: "image_url", 
                image_url: { 
                    url: imageUrl,
                    detail: "low" // Optimization for speed/cost
                } 
            },
          ],
        },
      ],
      max_tokens: 500, 
    });

    // Safely extract the generated text from the standard response structure
    return response.choices?.[0]?.message?.content || "No text detected";
    
  } catch (err) {
    console.error("OCR API Error:", err.message);
    // Return a controlled error message
    return "OCR failed due to API error.";
  }
}
