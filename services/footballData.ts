import { Player } from '../types';

// We use the public test key '3' for TheSportsDB
const API_URL = 'https://www.thesportsdb.com/api/v1/json/3/lookup_all_players.php?id=133610';

export const fetchSquad = async (): Promise<Player[]> => {
  try {
    console.log("Fetching squad from TheSportsDB..."); 
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data received:", data); // This will show in your browser console

    if (!data.player) return [];

    // Map the API messy data to your clean Player type
    return data.player.map((p: any) => ({
      id: p.idPlayer,
      name: p.strPlayer,
      number: p.strNumber ? parseInt(p.strNumber) : 0,
      position: mapPosition(p.strPosition),
      image: p.strCutout || p.strThumb || 'https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png',
      nationality: p.strNationality,
      age: calculateAge(p.dateBorn),
      height: p.strHeight || 'N/A',
      foot: p.strSide || 'Right',
      joined: p.dateSigned ? new Date(p.dateSigned).toLocaleDateString() : 'Unknown',
      contractExpiry: '2026', // API doesn't provide this, leaving as placeholder
      marketValue: p.strWage ? `€${p.strWage}` : 'Unknown',
      stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 },
      status: 'Available'
    }));
  } catch (error) {
    console.error("FAILED to fetch squad:", error);
    return [];
  }
};

// Helpers
const calculateAge = (dob: string) => {
  if (!dob) return 0;
  return new Date().getFullYear() - new Date(dob).getFullYear();
};

const mapPosition = (pos: string): "GK" | "DEF" | "MID" | "FWD" => {
  if (!pos) return "MID";
  const p = pos.toLowerCase();
  if (p.includes("goalkeeper")) return "GK";
  if (p.includes("defender") || p.includes("back")) return "DEF";
  if (p.includes("midfield")) return "MID";
  return "FWD";
};