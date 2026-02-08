import { Player } from '../types';

// Chelsea FC ID is 61 in football-data.org
const API_URL = 'https://api.football-data.org/v4/teams/61';
const API_KEY = 'e118746838474ad5b17190bd25491619';

export const fetchSquad = async (): Promise<Player[]> => {
  try {
    const response = await fetch(API_URL, {
      headers: { 'X-Auth-Token': API_KEY },
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    if (!data.squad) return [];

    return data.squad.map((p: any) => ({
      id: p.id,
      name: p.name,
      number: p.shirtNumber || 0,
      position: mapPosition(p.position),
      image: 'https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png',
      nationality: p.nationality,
      age: 0,
      height: 'N/A',
      foot: 'Right',
      joined: '2023',
      contractExpiry: '2028',
      marketValue: 'Unknown',
      stats: { appearances: 0, goals: 0, assists: 0, cleanSheets: 0, rating: 0 },
      status: 'Available'
    }));
  } catch (error) {
    console.error("Error fetching squad:", error);
    return [];
  }
};

const mapPosition = (pos: string): "GK" | "DEF" | "MID" | "FWD" => {
  if (!pos) return "MID";
  const p = pos.toLowerCase();
  if (p.includes("goalkeeper")) return "GK";
  if (p.includes("defence") || p.includes("back")) return "DEF";
  if (p.includes("midfield")) return "MID";
  return "FWD";
};