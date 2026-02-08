import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API
// We use 'import.meta.env' to access VITE_ variables safely
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
} else {
  console.warn("VITE_GEMINI_API_KEY is missing. Chat will not work.");
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export const sendMessageToGaffer = async (message: string, history: ChatMessage[]): Promise<string> => {
  if (!genAI) {
    return "I'm currently scouting the next opposition and can't reach the tactical board (API Key missing). Please check your Vercel Environment Variables.";
  }

  try {
    // Use the stable, standard model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are 'The Gaffer', a senior tactical analyst and club historian for Chelsea Football Club. You speak with authority, passion, and deep knowledge of Chelsea FC. You refer to Chelsea as 'we' or 'The Blues'. Your answers are insightful but concise (max 150 words). Always end with a short rallying cry like 'KTBFFH' or 'Up the Chels'."
    });

    // Convert history to the format Google expects
    const chatHistory = history.map(h => ({
      role: h.role,
      parts: [{ text: h.content }]
    }));

    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
    
  } catch (error: any) {
    console.error("AI Error Details:", error);
    
    // Friendly error handling
    if (error.message?.includes('API key')) {
      return "My tactical notes are locked away. (Invalid API Key - check Vercel settings)";
    }
    return "The press conference room is a bit noisy (Connection Error). Try again in a moment.";
  }
};