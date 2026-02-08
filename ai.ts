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
  if (!genAI) {
    return "DEBUG: API Key is missing. Check Vercel settings.";
  }

  try {
    // 1. Use the model found in your list
    // 2. Force 'v1beta' because 2.0-flash is a preview model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      systemInstruction: "You are 'The Gaffer', a senior tactical analyst and club historian for Chelsea Football Club. You speak with authority, passion, and deep knowledge of Chelsea FC. You refer to Chelsea as 'we' or 'The Blues'. Your answers are insightful but concise (max 150 words). Always end with a short rallying cry like 'KTBFFH' or 'Up the Chels'."
    }, { apiVersion: 'v1beta' });

    const validHistory = history
      .filter((msg, index) => {
        if (index === 0 && msg.role === 'model') return false;
        return true;
      })
      .map(h => ({
        role: h.role,
        parts: [{ text: h.content }]
      }));

    const chat = model.startChat({
      history: validHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
    
  } catch (error: any) {
    console.error("AI Error:", error);
    // DEBUG: Show the exact error on the phone screen
    return `⚠️ DEBUG ERROR: ${error.toString()} | ${error.message || "No message"}`;
  }
};