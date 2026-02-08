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
    return "I'm currently scouting the next opposition and can't reach the tactical board (API Key missing).";
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are 'The Gaffer', a senior tactical analyst and club historian for Chelsea Football Club. You speak with authority, passion, and deep knowledge of Chelsea FC. You refer to Chelsea as 'we' or 'The Blues'. Your answers are insightful but concise (max 150 words). Always end with a short rallying cry like 'KTBFFH' or 'Up the Chels'."
    });

    // --- THE FIX IS HERE ---
    // Google requires history to start with 'user'. We filter out any initial 'model' greeting.
    const validHistory = history
      .filter((msg, index) => {
        // If it's the first message and it's from the 'model', skip it
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
    console.error("AI Error Details:", error);
    return "The press conference room is a bit noisy. Try again in a moment.";
  }
};