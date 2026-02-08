import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

try {
  // Safe environment check for browser vs node
  const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;
  
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
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
    // Fallback if no API key is present (for demo purposes)
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "I'm currently scouting the next opposition and can't reach the tactical board (API Key missing). However, I can tell you that we need to control the midfield and utilize our pace on the wings!";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
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
    return "The press conference room is a bit noisy. Could you repeat that?";
  }
};