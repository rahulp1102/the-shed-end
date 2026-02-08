import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

try {
  // VITE_GEMINI_API_KEY is automatically exposed by Vite to the browser
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  } else {
    console.warn("Gemini API Key is missing. Make sure VITE_GEMINI_API_KEY is set.");
  }
} catch (e) {
  console.warn("Gemini API Key initialization failed.", e);
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export const sendMessageToGaffer = async (message: string, history: ChatMessage[]): Promise<string> => {
  if (!ai) {
    // Fallback if no API key is present
    // This simulates a delay so it feels like a real network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "I'm currently scouting the next opposition and can't reach the tactical board (API Key missing). Please check your Vercel Environment Variables and ensure 'VITE_GEMINI_API_KEY' is set.";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.0-flash', // Updated to latest efficient model
      config: {
        systemInstruction: "You are 'The Gaffer', a senior tactical analyst and club historian for Chelsea Football Club. You speak with authority, passion, and deep knowledge of Chelsea FC. You refer to Chelsea as 'we' or 'The Blues'. Your answers are insightful but concise (max 150 words), focusing on stats, history, or tactical nuances. If asked about rivals (Spurs, Arsenal), keep it professional but with a slight competitive edge. Always end with a short rallying cry like 'KTBFFH' or 'Up the Chels' where appropriate.",
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.content }]
      }))
    });

    const response = await chat.sendMessage({ message });
    return response.text || "I'm reviewing the VAR footage... try asking again.";
  } catch (error) {
    console.error("AI Interaction Error:", error);
    return "The press conference room is a bit noisy. Could you repeat that? (Check console for error details)";
  }
};