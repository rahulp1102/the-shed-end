// src/services/footballData.ts
import { Player } from '../types'; // Import your existing Player type

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';
const CHELSEA_TEAM_ID = '133610'; // TheSportsDB ID for Chelsea

export const fetchSquad = async (): Promise<Player[]> => {
  try {
    // 1. Fetch all players for Chelsea
    const response = await fetch(`${BASE_URL}/lookup_all_players.php?id=${CHELSEA_TEAM_ID}`);
    const data = await response.json();

    if (!data.player) {
      throw new Error("No players found");
    }

    // 2. Transform the API data into YOUR app's format
    // The API gives us messy keys like "strPlayer", we need to map them to "name", "position", etc.
    const squad: Player[] = data.player.map((p: any) => ({
      id: p.idPlayer,
      name: p.strPlayer,
      number: p.strNumber ? parseInt(p.strNumber) : 0, // Handle missing numbers
      position: mapPosition(p.strPosition), // Helper to standardize positions
      image: p.strCutout || p.strThumb || '', // Best quality cutout first, then thumb
      nationality: p.strNationality,
      age: calculateAge(p.dateBorn),
      height: p.strHeight || 'N/A',
      foot: p.strSide || 'Right', // API sometimes misses this, default to Right
      joined: p.dateSigned ? new Date(p.dateSigned).toLocaleDateString() : 'Unknown',
      contractExpiry: '2026', // API often doesn't have this, we might need to mock or omit
      marketValue: '€' + (p.strWage ? parseInt(p.strWage) * 100 : 'Unknown'), // Rough estimate or hide
      stats: { // The API doesn't give live match stats in this endpoint, so we initialize basic
        appearances: 0,
        goals: 0,
        assists: 0,
        cleanSheets: 0,
        rating: 0
      },
      status: 'Available' // Default status
    }));

    return squad;
  } catch (error) {
    console.error("Error fetching squad:", error);
    return []; // Return empty array on fail so app doesn't crash
  }
};

// --- Helper Functions ---

const calculateAge = (dob: string): number => {
  if (!dob) return 0;
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const mapPosition = (apiPos: string): "GK" | "DEF" | "MID" | "FWD" => {
  if (!apiPos) return "MID";
  const pos = apiPos.toLowerCase();
  if (pos.includes("goalkeeper")) return "GK";
  if (pos.includes("back") || pos.includes("defender")) return "DEF";
  if (pos.includes("midfield")) return "MID";
  if (pos.includes("forward") || pos.includes("winger") || pos.includes("striker")) return "FWD";
  return "MID";
};