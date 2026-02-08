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
    // We use gemini-1.5-flash because it is the standard for the free tier
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are 'The Gaffer', a senior tactical analyst and club historian for Chelsea Football Club. You speak with authority, passion, and deep knowledge of Chelsea FC. You refer to Chelsea as 'we' or 'The Blues'. Your answers are insightful but concise (max 150 words). Always end with a short rallying cry like 'KTBFFH' or 'Up the Chels'."
    });

    const validHistory = history
      .filter((msg, index) => {
        // Remove the first message if it's from the bot (Google rule)
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
    
    // If the 404 persists, we tell the user exactly what to do
    if (error.message?.includes('404')) {
      return "Tactical Error: The 'Generative Language API' is disabled on your Google account. Please enable it in the Google Cloud Console.";
    }
    
    return "The press conference room is a bit noisy (Connection Error). Try again in a moment.";
  }
};