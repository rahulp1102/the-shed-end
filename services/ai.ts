import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export const sendMessageToGaffer = async (message: string, history: ChatMessage[]): Promise<string> => {
  // 1. Check if API Key exists
  if (!genAI) {
    return "DEBUG ERROR: API Key is missing. Make sure VITE_GEMINI_API_KEY is in Vercel.";
  }

  try {
    // 2. Initialize Model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // 3. Clean History (The most common crash cause)
    // We remove the very first message if it's from the bot, because Google bans that.
    const validHistory = history
      .filter((msg, index) => {
        if (index === 0 && msg.role === 'model') return false;
        return true;
      })
      .map(h => ({
        role: h.role,
        parts: [{ text: h.content }]
      }));

    // 4. Start Chat
    const chat = model.startChat({
      history: validHistory,
    });

    // 5. Send Message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
    
  } catch (error: any) {
    console.error("AI Error:", error);
    
    // --- DEBUG: PRINT THE REAL ERROR TO THE USER ---
    return `DEBUG ERROR DETAILS: ${error.message || error.toString()}`;
  }
};